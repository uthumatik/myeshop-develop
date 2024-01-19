package com.projet.myeshop.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String prenom;
    private String mail;
    private String adresse;
    private String password;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Commande> commandes = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Produit> panier = new ArrayList<>();

    public Compte(String nom, String prenom, String mail, String adresse, String password){
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.adresse = adresse;
        this.password = password;
    }

    public void ajouterProduit(Produit p) {
        panier.add(p);
    }

    public void retirerProduit(Produit p) {
        panier.remove(p);
    }

    public void reinitialiserPanier(){
        panier.clear();
    }

    public void passerCommande(Commande c) {
        commandes.add(c);
    }
}