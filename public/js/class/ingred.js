export class Ingredient{
    static nb = 0;
    static etat = ['entier','coupé','moulu']; 

    constructor(nom, ietat, prix){
        this.nom = nom; 
        //this.etat = [];
        if(ietat != ""){
            if(Ingredient.etat.includes(ietat)){
                this.etat = ietat; 
            }
        }; 
        this.prix = prix;
        Ingredient.nb++;
    }
}