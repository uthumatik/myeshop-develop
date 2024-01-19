import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MyEshopService } from '../service/my-eshop.service';
import { Produit } from '../model/produit';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Commande } from '../model/commande';
import { BusService } from '../service/bus.service';
import { FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {
  @ViewChild('panierTemplate') panierTemplate!: TemplateRef<any>;
  @ViewChild('commandesTemplate') commandesTemplate!: TemplateRef<any>;
  @ViewChild('commandeDetails') commandeDetails!: TemplateRef<any>;

  products: Produit[] = [];

  fruits: Produit[] = [];
  legumes: Produit[] = [];
  viandes: Produit[] = [];
  poissons: Produit[] = [];
  panier: { produit: Produit, quantite: number }[] = [];
  commandes: Commande[] = [];

  selectedCategory: string = 'all';
  loading: boolean = true;

  idCompte = Number(localStorage.getItem('user'));

  constructor(
    private myEshopService: MyEshopService,
    private dialog: MatDialog,
    private router: Router,
    private busService: BusService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.busService.refreshPanier$.subscribe(() => this.afficherPanier());
    this.busService.refreshCommandes$.subscribe(() => this.afficherHistorique());

    this.afficherCatalogue();
    this.afficherPanier();
    this.afficherHistorique();

    this.loadCategories();
  }

  private loadCategories(): void {
    this.loading = true;
    this.filterCategorie('FRUIT').subscribe(products => {
      this.fruits = products;
      this.filterCategorie('LEGUME').subscribe(products => {
        this.legumes = products;
        this.filterCategorie('VIANDE').subscribe(products => {
          this.viandes = products;
          this.filterCategorie('POISSON').subscribe(products => {
            this.poissons = products;
            this.loading = false;
          });
        });
      });
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  filterProductsByCategory(): Produit[] {
    switch (this.selectedCategory) {
      case 'FRUIT':
        return this.fruits;
      case 'LEGUME':
        return this.legumes;
      case 'VIANDE':
        return this.viandes;
      case 'POISSON':
        return this.poissons;
      default:
        return this.products;
    }
  }

  private filterCategorie(categorie: string): Observable<Produit[]> {
    return this.myEshopService.filtrerCategorie(categorie);
  }

  private afficherCatalogue(): void {
    this.myEshopService.afficherCatalogue().subscribe(produits => {
      this.products = produits;
    });
  }

  private afficherPanier(): void {
    if (this.idCompte != 0) {
      this.myEshopService.afficherPanier(this.idCompte).subscribe(panier => {
        // Ajouter la propriété 'quantite' à chaque élément du panier
        this.panier = panier.map(item => ({ produit: item, quantite: 1 }));
      });
    }
  }
  
  

  private afficherHistorique(): void {
    if(this.connecté()){
      this.myEshopService.afficherHistorique(this.idCompte).subscribe(
        commandes => {
        this.commandes = commandes;
      });
    }
  }

  ajouterProduit(id: number): void {
    if (this.connecté()) {
      const produitDansPanier = this.panier.find(item => item.produit.id === id);
  
      if (!produitDansPanier) {
        const produit = this.products.find(p => p.id === id)!;
        this.panier.push({ produit, quantite: 1 });
        this.snackBar.open('Le produit a été ajouté à votre panier.', 'Close', { duration: 2000 });
      } else {
        produitDansPanier.quantite++;
        this.snackBar.open('Le produit est déjà dans votre panier.', 'Close', { duration: 2000 });
      }
  
      this.busService.refreshPanier();
    } else {
      this.snackBar.open('Vous devez vous connecter ou créer un compte pour ajouter un produit à votre panier.', 'Close', { duration: 2000 });
      this.router.navigate(['/']);
    }
  }

  retirerProduit(id: number): void {
    this.myEshopService.retirerProduit(this.idCompte, id).subscribe(
      produits => {
        this.busService.refreshPanier();
        this.snackBar.open('Le produit a été retiré de votre panier.', 'Close', {duration: 2000,});
    });
  }

  passerCommande(): void {
    if(this.connecté()){
      this.myEshopService.passerCommande(this.idCompte).subscribe(
        produits => {
        this.busService.refreshCommandes();
        this.dialog.closeAll();
        this.snackBar.open('Votre commande a été confirmée. Retrouver le dans votre historique.', 'Close', {duration: 2000,});
      });
    }
  }

  connecté(): boolean {
    if(this.idCompte != 0){
      return true;
    } 
    return false;
  }

  inPanier(id: number): boolean {
    return this.panier.some(item => item.produit.id === id);
    
  }

  selectedCommande: Commande | null = null;

  openCommandeDetailsDialog(commande: Commande): void {
    this.selectedCommande = commande;
    const dialogRef = this.dialog.open(this.commandeDetails, { data: { produits: commande.panier } });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedCommande = null;
    });
  }

  openDialog(): void {
    this.dialog.open(this.panierTemplate);
  }

  openCommandesDialog(): void {
    this.dialog.open(this.commandesTemplate);
  }

  logout() : void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  
  getName(product : Produit) : string {
    if(product.nom == "Pomme de terre") return "patate";
    if(product.nom == "mourue") return "morue";
    return product.nom;
  }
}
