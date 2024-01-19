package com.projet.myeshop.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.projet.myeshop.entities.Categorie;
import com.projet.myeshop.entities.Compte;
import com.projet.myeshop.entities.Produit;
import com.projet.myeshop.repositories.CompteRepository;
import com.projet.myeshop.repositories.ProduitRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EShopController {
    @Autowired
    CompteRepository compteRepository;

    @Autowired
    ProduitRepository produitRepository;

    @PostMapping("/create")
    public Long creerCompte(@RequestBody CompteBody param) {
        Compte c = new Compte(param.nom, param.prenom, param.mail, param.adresse, param.password);
        compteRepository.save(c);
        return c.getId();
    }

    @PostMapping("/login")
    public Long login(@RequestBody LoginBody login) {
        Compte c = compteRepository.findByMail(login.mail).get();
        if(login.password.equals(c.getPassword())) return c.getId();
        return null;
    }

    @GetMapping("/catalogue")
    public List<Produit> afficherCatalogue() {
        return produitRepository.findAll();
    }

    @GetMapping("/categorie/{nom}")
    public List<Produit> filtrerCategorie(@PathVariable String nom) {
        Categorie c = Categorie.NONE;
        if("FRUIT".equals(nom)) c = Categorie.FRUIT;
        if("LEGUME".equals(nom)) c = Categorie.LEGUME;
        if("POISSON".equals(nom)) c = Categorie.POISSON;
        if("VIANDE".equals(nom)) c = Categorie.VIANDE;    
        return produitRepository.findAllByCategorie(c).get();
    }

    @GetMapping("/comptes")
    public List<Compte> getComptes() {
        return compteRepository.findAll();
    }

    public record CompteBody(String nom, String prenom, String mail, String adresse, String password){}

    public record LoginBody(String mail, String password){}
    
}
