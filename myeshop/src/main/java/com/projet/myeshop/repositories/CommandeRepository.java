package com.projet.myeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.myeshop.entities.Commande;

public interface CommandeRepository extends JpaRepository<Commande, Long>{
    
}
