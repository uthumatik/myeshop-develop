package com.projet.myeshop.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int total;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<Produit> panier = new ArrayList<>();

    public Commande(List<Produit> panier){
        this.panier = panier;
        for(Produit p : this.panier){
            total += p.getPrix();
        }
    }

    public void ajouterProduit(Produit produit) {
        panier.add(produit);
    }

    public void ajouterPanier(List<Produit> panier) {
        this.panier = panier;
    }

}
