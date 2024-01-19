package com.projet.myeshop.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.myeshop.entities.Compte;

public interface CompteRepository extends JpaRepository<Compte, Long> {
    Optional<Compte> findById(Long Id);
    Optional<Compte> findByMail(String mail);
}
 