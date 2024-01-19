package com.projet.myeshop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.projet.myeshop.entities.Categorie;
import com.projet.myeshop.entities.Produit;
import com.projet.myeshop.repositories.ProduitRepository;

@SpringBootApplication
public class MyeshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyeshopApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProduitRepository produitRepository) {
		return args -> {
			Produit poulpe = new Produit(
				"poulpe",
				"1kg",
				20,
				"src/assets/img/poulpe.jpg",
				Categorie.POISSON);

			produitRepository.save(poulpe);

			Produit morue = new Produit(
				"morue",
				"1kg",
				15,
				"src/assets/img/morue.jpg",
				Categorie.POISSON);

			produitRepository.save(morue);

			Produit saumon = new Produit(
				"saumon",
				"1kg",
				17,
				"un saumon",
				Categorie.POISSON);
			produitRepository.save(saumon);

			Produit banane = new Produit(
				"banane",
				"10 pièces",
				5,
				"une banane",
				Categorie.FRUIT);
			produitRepository.save(banane);

			Produit pomme = new Produit(
				"pomme",
				"10 pièces",
				16,
				"une banane",
				Categorie.FRUIT);
			produitRepository.save(pomme);

			Produit fraise = new Produit(
				"fraise",
				"30 pièces",
				30,
				"des fraises",
				Categorie.FRUIT);
			produitRepository.save(fraise);
				
			Produit pommeDeTerre = new Produit(
				"Pomme de terre",
				"25kg",
				15,
				"ims",
				Categorie.LEGUME);
			produitRepository.save(pommeDeTerre);

			Produit carotte = new Produit(
				"carotte",
				"2kg",
				2,
				"une carotte",
				Categorie.LEGUME);

			produitRepository.save(carotte);

			Produit boeuf = new Produit(
				"boeuf",
				"1kg",
				25,
				"du boeuf",
				Categorie.VIANDE);

			produitRepository.save(boeuf);
			
		};
	}

}
