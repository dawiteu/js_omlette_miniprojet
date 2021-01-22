export class Lieu{
    constructor(nom, personnes, panier){
        this.nom = nom;
        this.personnes = personnes ? personnes : []; 
        panier ? this.panier= panier=[] :  null; 
    }

}