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
        ingredient.etat = outil.action; 
        console.log(`${this.nom} coupe ${ingredient.nom} a l'aide de ${outil.nom}`); 
    },
    prendPanier(quoi, ou){ // il prend QUOI (outi, objet, .. ? ) et le prend ou? dans sa main g,d?
        let panier = eval(quoi).pop();
        ou.push(panier);  
        let lieupanier = quoi==epicerie.panier ? "prend un" : "rend le"; 
        console.log(`${this.nom} ${lieupanier} panier. `);
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
    action: "coupé"
}

// recipiens: 

let poele = {
    contenu: [], 

    cuire: function(content){
        console.log(`On va commancez a cuire... ${content.nom} / etat actuel: ${content.etat}.`); 
        let x = setTimeout( () => {
            content.etat="cuit";
            console.log(`Le plat: ${content.nom} == est ==>  ${content.etat}`); 
            clearTimeout(x);
        }, 4000)
    }
}

let bol = {
    contenu: [], 
    newMelange: {},
    melanger(nomMelange) {
        if(this.contenu.length >= 2){

            this.newMelange = {
                nom: nomMelange,
                etat: "pas cuit"
            }

            console.log(`il y a ${this.contenu.length} a melanger`);

            for(let i=0; i<this.contenu.length; i++){
                this.contenu.splice(i ,1);
                i--;
            }
            console.log(`Resultat de ton melange: ${this.newMelange.nom} etat: ${this.newMelange.etat}`);
            this.contenu.push(this.newMelange);
        }
    },

    verser(nomMelange, endroit){ // que verse t'on et ou ? 
        endroit.contenu.push( nomMelange ); 
        this.contenu.splice( this.contenu.indexOf(nomMelange.nom), 1);
        console.log(`Tout a ete versez dans la poele!`);
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

console.log('------------');

for(let i=0; i < personnage.mains.droite[0].length; i++){
    bol.contenu.push( personnage.mains.droite[0][i] ); 
    console.log(`${personnage.mains.droite[0][i].nom} est dans le bol`);
    personnage.mains.droite[0].splice(i, 1);
    i--;
}

if(personnage.mains.droite[0].length == 0){
    console.log(`oups le panier x)!! je vais vite le remettre au magasin.`); 
    personnage.seDeplacer(epicerie);
    personnage.prendPanier(personnage.mains.droite, epicerie.panier); 
    personnage.seDeplacer(maison);
}

for(let i=0; i < bol.contenu.length; i++){
    if(bol.contenu[i].etat == "entier"){
        personnage.couper(bol.contenu[i], couteau); 
    }
}

console.log(bol);

bol.melanger("omlette"); 

bol.verser(bol.contenu[0], poele);

poele.cuire(poele.contenu[0]); 
