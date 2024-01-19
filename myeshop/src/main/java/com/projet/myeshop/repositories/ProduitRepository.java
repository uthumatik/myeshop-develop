package com.projet.myeshop.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.myeshop.entities.Categorie;
import com.projet.myeshop.entities.Produit;

public interface ProduitRepository extends JpaRepository<Produit , Long> {
    Optional<List<Produit>> findAllByCategorie(Categorie categorie);
    Optional<Produit> findByNom(String nom);
    
}