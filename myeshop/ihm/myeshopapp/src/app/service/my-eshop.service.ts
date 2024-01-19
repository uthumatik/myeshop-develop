import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../model/produit';
import { Compte } from '../model/compte';

@Injectable({
  providedIn: 'root'
})
export class MyEshopService {
  private apiUrl = "http://localhost:8080";

  constructor(private http : HttpClient) { }

  creerCompte(name : string, prenom : string, mail : string, adresse : string, password : string): Observable<any>{
    const url = `${this.apiUrl}/create`;
    const body = {name, prenom, mail, adresse, password};    
    return this.http.post(url, body);
  }

  login(mail : string, password : string): Observable<any>{
    const url = `${this.apiUrl}/login`;
    const body = {mail, password};    
    return this.http.post(url, body);
  }

  afficherCatalogue(): Observable<any>{
    const url = `${this.apiUrl}/catalogue`;
    return this.http.get(url);
  }

  filtrerCategorie(categorie : string): Observable<any>{
    const url = `${this.apiUrl}/categorie/${categorie}`;
    return this.http.get(url);
  }

  ajouterProduit(idCompte: number, id: number): Observable<any>{
    const url = `${this.apiUrl}/ajouterProduit/${idCompte}`;
    const produitBody = { id: id };
    return this.http.post(url, produitBody);
  }

  retirerProduit(idCompte: number, id: number): Observable<any>{
    const url = `${this.apiUrl}/retirerProduit/${idCompte}`;
    const produitBody = { id: id };
    return this.http.post(url, produitBody);
  }

  reinitialiserPanier(idCompte: number): Observable<any>{
    const url = `${this.apiUrl}/reinitialiser/${idCompte}`;
    return this.http.get(url);
  }

  afficherHistorique(idCompte: number): Observable<any>{
    const url = `${this.apiUrl}/historique/${idCompte}`;
    return this.http.get(url);
  }

  afficherPanier(idCompte: number): Observable<Produit[]>{
    const url = `${this.apiUrl}/panier/${idCompte}`;
    return this.http.get<Produit[]>(url);
  }

  passerCommande(idCompte: number): Observable<any>{
    const url = `${this.apiUrl}/commander/${idCompte}`;
    return this.http.get(url);
  }

  getComptes(): Observable<Compte[]>{
    const url = `${this.apiUrl}/comptes`;
    return this.http.get<Compte[]>(url);
  }

}
