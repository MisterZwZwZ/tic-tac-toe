// on charge les informations utiles
const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = 'X';
let etatJeu = ["", "", "", "", "", "", "", "", ""];

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// messages de statut
const gagne = () => `Player ${joueurActif} won`;
const egalite = () => "Draw";
const tourJoueur = () => `Player ${joueurActif}'s turn`;

statut.innerHTML = tourJoueur();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
document.querySelector("#new-game").addEventListener("click", recommencer);

function gestionClicCase() {
    // on recupère l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index);
    // on vérifie que la case cliquée est vide et que la partie n'est pas terminée
    if(etatJeu[indexCase] != "" || !jeuActif){
        return;
    }
    // on prend en compte la case jouée
    etatJeu[indexCase] = joueurActif;
    this.innerHTML = joueurActif;
    // on verifie si la case cliquée entraine la victoire du joueur actif
    verifGagne();
}

function verifGagne(){
    let tourGagnant = false;
    // on vérifie les conditions de victoire
    for(let conditionVictoire of conditionsVictoire){
        let val1 = etatJeu[conditionVictoire[0]];
        let val2 = etatJeu[conditionVictoire[1]];
        let val3 = etatJeu[conditionVictoire[2]];
        if (val1 === "" || val2 === "" || val3 === ""){
            continue;
        };
        if(val1 === val2 && val2 === val3){
            tourGagnant = true;
            break;
        };
    };
    // on gère le coup gagnant
    if(tourGagnant){
        statut.innerHTML = gagne();
        jeuActif = false;
        return;
    };
    // on gère l'égalité
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite();
        jeuActif = false;
        return;
    };
    // on change de joueur
    joueurActif = joueurActif === "X" ? "O" : "X";
    statut.innerHTML = tourJoueur();
};

function recommencer(){
    joueurActif = "X";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
};