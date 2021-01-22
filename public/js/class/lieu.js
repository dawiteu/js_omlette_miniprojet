export class Lieu{
    constructor(nom, personnes, nombreP, articles){
        this.nom = nom;
        this.personnes = personnes ? personnes : [];
        if(nombreP != "" && nombreP != undefined){
            let paniers = []; 
            let panier  = [];
            nombreP = parseInt(nombreP)-1;
            for(let i=0; i<=nombreP; i++){
                paniers[i] = panier; 
            } 
            this.panier = paniers; 
        } 
        articles ? this.articles = {} : null; 
    }
}