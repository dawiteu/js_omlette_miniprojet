//imports 

import {Lieu} from "./class/lieu.js";
import {Ingredient} from "./class/ingred.js"; 



// lieux 
let maison = new Lieu("maison");
let epicerie = new Lieu("epicerie", 0, 3, 0); 


// ingredients 
let oignon = new Ingredient("oignon","entier", 3); 
let oeuf = new Ingredient("oeuf", "entier", 2); 
let epice = new Ingredient("epice", "moulu", 5); 
let fromage = new Ingredient("fromage", "coupé", 4); 

// le personnage 
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
            // premier lieu. 
            this.lieu = nvlieu.nom; 
            nvlieu.personnes.push(this.nom);
            console.log(`${this.nom} est actuellement à la ${this.lieu}.`);
        }
    },
    payerArticle(article){
        this.argent-=article.prix; 
        console.log(` >> Payement pour (${article.nom}) Solde restant: ${this.argent} euro.`);
    },
    couper(ingredient, outil){
        console.log(`${this.nom} coupe ${ingredient} a l'aide de ${outil}`); 
    },
    prendPanier(quoi, ou){ // il prend QUOI (outi, objet, .. ? ) et le prend ou? dans sa main g,d?
        let panier = eval(quoi).pop();
        ou.push(panier);  
        console.log(`${this.nom} prend un panier au magasin.`);
    },
    prendArticle(article,ou){ // quel article et ou on le place ; 
        ou.push(article);
        personnage.payerArticle(article); 
    },
    etat(){
        console.log(`${this.nom} est ici: ${this.lieu}. \n etat de son porte-feuilles: ${this.argent} euro.`);
    }
}

// outil: couteau; 
let couteau = {
    nom: "couteau", 
    action: "coupe"
}

// recipiens: 

let poele = {
    ingred: [], 
    cuir: function(){

    }
}

let bol = {
    contenu: [], 
    melanger(nomMelange) {
        newMelange = {
            nom: nomMelange,
            etat: "pas cuit"
        }
        this.contenu.push(newMelange); 
    }
}
//pour le fun:  (ajouter automatiquement les ingred ds lepicerie); 

let temptab = [oignon, oeuf, fromage, epice];

epicerie.articles = temptab; 

/*
for(let i=0; i<Ingredient.nb; i++){
    for (const [key, value] of Object.entries(Ingredient)) {
        console.log(`${key}: ${value}`);
    }
}
*/

// le jeu. 
personnage.seDeplacer(maison);
personnage.seDeplacer(epicerie);

personnage.etat(); 

personnage.prendPanier(epicerie.panier, personnage.mains.droite); 
//console.log(personnage);
//console.log(epicerie);

for(let i=0; i<epicerie.articles.length; i++){
    console.log(`${personnage.nom} prend l'article .${epicerie.articles[i].nom}. ds son panier.`);
    personnage.prendArticle( epicerie.articles[i], personnage.mains.droite[0]);
}
personnage.etat(); 

console.log('------------');

personnage.seDeplacer(maison);


bol.contenu.push("oeuf"); 

console.log(bol); 




console.log(personnage);
console.log(epicerie);


//console.log(maison);  







/*

console.log(maison);  
console.log(epicerie);

*/