package com.projet.myeshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import com.projet.myeshop.entities.Produit;
import com.projet.myeshop.repositories.ProduitRepository;

public class ProduitController {
    @Autowired
    ProduitRepository repository;

    @GetMapping("/produits")
    public List<Produit> getProduit() {
        return repository.findAll();
    }
}