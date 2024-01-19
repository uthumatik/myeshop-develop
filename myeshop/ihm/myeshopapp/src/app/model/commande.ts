import { Produit } from "./produit";

export interface Commande {
    id : number;
    total : number;
    panier : Produit[];
}
