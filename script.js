// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// Definisco variabili utili
const griglia = document.getElementById("griglia");
let cella = document.getElementsByClassName("cella");
const diffSet = document.getElementById("select");
let bombeArr = [];
let bomba = 0;
const caselleFacile = 100;
const caselleMedio = 81;
const caselleDifficile = 49;

// Selezioni difficoltà
document.getElementById("facile").addEventListener("click", diffFacile);
document.getElementById("medio").addEventListener("click", diffMedio);
document.getElementById("difficile").addEventListener("click", diffDifficile);

// Funzioni

// Genera griglia a difficoltà facile
function diffFacile() {
  diffSet.classList.add("hidden");
  griglia.innerHTML = "";
  griglia.classList.remove("animazione", "medio", "difficile");
  griglia.classList.add("animazione", "facile");

  for (let i=1; i<caselleFacile+1; i++) {
    griglia.innerHTML += `<div class="cella">${i}</div>`;
  }
  
  // Genera bombe difficoltà facile
  bombeArr = [];
  while (bombeArr.length < 16) {
    bomba = Math.floor((Math.random() * caselleFacile) + 1);
    controlloDoppione()
  }
  console.log(bombeArr);

  // Evento al click
  clickCella();
}

// Genera griglia a difficoltà medio
function diffMedio() {
  diffSet.classList.add("hidden");
  griglia.innerHTML = "";
  griglia.classList.remove("animazione", "facile", "difficile");
  griglia.classList.add("animazione", "medio");
  for (let i=1; i<82; i++) {
    griglia.innerHTML += `<div class="cella">${i}</div>`;
  }

  // Genera bombe difficoltà media
  bombeArr = [];
  while (bombeArr.length < 16) {
    bomba = Math.floor((Math.random() * caselleMedio) + 1);
    controlloDoppione()
  }
  console.log(bombeArr);

  // Evento al click
  clickCella();
}

// Genera griglia a difficoltà difficile
function diffDifficile() {
  diffSet.classList.add("hidden");
  griglia.innerHTML = "";
  griglia.classList.remove("animazione", "facile", "medio");
  griglia.classList.add("animazione", "difficile");
  for (let i=1; i<50; i++) {
    griglia.innerHTML += `<div class="cella">${i}</div>`;
  }

  // Genera bombe difficoltà difficile
  bombeArr = [];
  while (bombeArr.length < 16) {
    bomba = Math.floor((Math.random() * caselleDifficile) + 1);
    controlloDoppione()
  }
  console.log(bombeArr);

  // Evento al click
  clickCella();
}

// Click sulla cella
function clickCella() {
  for (let i=0; i<cella.length; i++) {
    cella[i].addEventListener("click", function(){
      if (bombeArr.includes(parseInt(this.innerHTML))) {
        document.getElementById("gameover").classList.add("neon-gameover");
        for (let check=0; check<100; check++) {
          if (bombeArr.includes(parseInt(cella[check].innerHTML))) {
            cella[check].classList.add("rosso");
          }
        }
        console.log(this.innerHTML);
      }
      else {
        this.classList.add("azzurro");
        console.log(this.innerHTML);
      }
    });
  }
}

// Controlla doppione
function controlloDoppione() {
  let doppione = false;
  for (let i=0; i<bombeArr.length; i++) {
    if (bomba == bombeArr[i]) {
      doppione = true;
    }
  }
  if (doppione == false) {
    bombeArr.push(bomba);
  }
}