package com.projet.myeshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.projet.myeshop.entities.Commande;
import com.projet.myeshop.entities.Compte;
import com.projet.myeshop.entities.Produit;
import com.projet.myeshop.repositories.CommandeRepository;
import com.projet.myeshop.repositories.CompteRepository;
import com.projet.myeshop.repositories.ProduitRepository;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompteController {
    @Autowired
    CompteRepository repository;

    @Autowired
    ProduitRepository produitRepository;

    @Autowired
    CommandeRepository commandeRepository;

    @GetMapping("/commander/{idCompte}")
    public List<Commande> passerCommande(@PathVariable Long idCompte) {
        Compte c = repository.findById(idCompte).get();
        Commande commande = new Commande();
        c.getPanier().stream().forEach(produit -> {
            commande.setTotal(commande.getTotal()+ produit.getPrix());
            commande.ajouterProduit(produit);
        }
        );
        commandeRepository.save(commande);
        c.passerCommande(commande);
        c.reinitialiserPanier();
        repository.save(c);

        return c.getCommandes();
    }

    @GetMapping("/panier/{idCompte}")
    public List<Produit> afficherPanier(@PathVariable Long idCompte) {
        Compte c = repository.findById(idCompte).get();
        return c.getPanier();
    }

    @PostMapping("/ajouterProduit/{idCompte}")
    public List<Produit> ajouterProduit(@PathVariable Long idCompte, @RequestBody ProduitBody produitBody) {
        Compte c = repository.findById(idCompte).get();
        Produit produit = produitRepository.findById(produitBody.id).get();
        c.ajouterProduit(produit);
        repository.save(c);
        return c.getPanier();
    }

    @PostMapping("/retirerProduit/{idCompte}")
    public List<Produit> retirerProduit(@PathVariable Long idCompte, @RequestBody ProduitBody produitBody) {
        Compte c = repository.findById(idCompte).get();
        Produit produit = produitRepository.findById(produitBody.id).get();
        c.retirerProduit(produit);
        repository.save(c);
        return c.getPanier();
    }

    @GetMapping("/reinitialiser/{idCompte}")
    public List<Produit> reinitialiserPanier(@PathVariable Long idCompte) {
        Compte c = repository.findById(idCompte).get();
        c.reinitialiserPanier();
        repository.save(c);
        return c.getPanier();
    }

    @GetMapping("/historique/{idCompte}")
    public List<Commande> afficherHistorique(@PathVariable Long idCompte) {
        Compte c = repository.findById(idCompte).get();
        return c.getCommandes();
    }
    
    public record ProduitBody(Long id){}
    
}