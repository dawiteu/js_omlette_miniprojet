export class Ingredient{
    static nb = 0;
    static etat = ['entier','coupé','moulu']; 

    //static allObjects = []; 

    constructor(nom, ietat, prix){
        this.nom = nom; 
        //this.etat = [];
        if(ietat != ""){
            if(Ingredient.etat.includes(ietat)){
                this.etat = ietat; 
            }
        }; 
        this.prix = prix;

        this.id = Ingredient.nb; 
        let id = Ingredient.nb;
        //Ingredient.allObjects.push({ nom, ietat, prix, id }); 
        Ingredient.nb++;
    }
    /*
    static findObject(id){
        if(id <= Ingredient.nb){
            Ingredient.allObjects.forEach( (e) => {
                if(e.id == id){
                    return Ingredient.allObjects;
                }
            });
        }else{
            return console.log(`error, object not found`);
        }
    }
    */
}