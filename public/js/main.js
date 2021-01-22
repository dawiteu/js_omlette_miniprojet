import {Lieu} from "./class/lieu.js";

let maison = new Lieu("maison");
let epicerie = new Lieu("epicerie", "", "panier"); 

let personnage = {
    nom: "Dawid",
    lieu: "",
    argent: 45, 
    mains: {
        droite: [], 
        gauche: []
    },
    seDeplacer(nvlieu){
        let lieuAct = this.lieu; 

        if(lieuAct != ""){
            if(lieuAct != nvlieu.nom){
                this.lieu = nvlieu.nom;
                let persindex = eval(lieuAct).personnes.indexOf(this.nom);
                eval(lieuAct).personnes.splice(eval(lieuAct).personnes[persindex], 1); 
                nvlieu.personnes.push(this.nom);
                console.log(`${this.nom} se deplace vers ${this.lieu}`);   
            }else{
                console.log(`Vous etes deja a cet endroit!`);
            }            
        }else{
            this.lieu = nvlieu.nom; 
            nvlieu.personnes.push(this.nom);
        }


    },
    payerArticle(article){
        console.log(`Le payement du article`);
    },
    couper(ingredient, outil){
        console.log(`${this.nom} coupe ${ingredient} a l'aide de ${outil}`); 
    }
}

personnage.seDeplacer(maison);
console.log(epicerie);
console.log(maison);  


personnage.seDeplacer(epicerie);


console.log(maison);  
console.log(epicerie);


