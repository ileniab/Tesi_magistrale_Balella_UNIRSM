// -
// Generatore di racconti a tema ambientalistico by @ileniab [tales, listen]
// Tesi magistrale 2020, relatore: Daniele @Fupete DESIGN.unirsm
//  github.com/fupete
// Educational purposes, MIT License, 2020, San Marino
// —
// Credits/Thanks to:
// @ml5js (github.com/ml5js) for https://github.com/ml5js/ml5-library/tree/development/examples/p5js/CharRNN/CharRNN_Text
// original license: MIT License
//
//  @ml5js (https://github.com/ml5js/ml5-library) for https://learn.ml5js.org/docs/#/reference/sentiment
// original license: MIT License
//
// @IDMNYU (github.com/IDMNYU) for https://github.com/IDMNYU/p5.js-speech
// original license: MIT License
//
// @shiffman(https://github.com/shiffman) for https://github.com/shiffman/p5.js-speech
// original license: MIT License
//
// @peterbaru (github.com/peterbaru) for https://github.com/dsii-2020-unirsm/archive/blob/master/peterbaru/MakingVisible/Prototipo
// original license: MIT License
//

//-
// [mouse] selezionando dai selettori il sentimento e l'argomento si imposta l'incipit del racconto, e premendo sul button Generate, si avvia la sua generazione 
//-


/* ===
Interactive LSTM Text Generation Climate change using p5.js
This uses a pre-trained model on a corpus of reports from
IPCC (https://www.ipcc.ch/reports/) and GreenPeace (https://www.greenpeace.org/usa/reports/)
=== */

//SENTIMENT ANALYIS ML5-------

//let sentimentoColore;
//let sentimento;
//let valoreSenti;
//let statusEl;
//let sentimentResult;

//bottoni
let buttonG; //bottone per generare il racconto
let buttonL; //bottone per generare l'ascolto
let buttonStop;
let xbottoni = 400; //variabile x della posizione bottoni

//selettori mood e argomento
let sel1;
let sel2;
let argomento="";
let mood;

//CHARRNN----------------
let charRNN;
let textInput;
let tempSlider;    //slider lunghezza testo
let lengthSlider; //slider lunghezza testo
let runningInference = false;
let testoCompleto;

//P5 SPEECH----
let lingua;

function setup() {

createCanvas(300,200);
noStroke();
fill(245,245,245);
rect(0,0, width, height);
    //-----------------------------------------------------------
  // initialize sentiment -------------------------
//  sentiment = ml5.sentiment('movieReviews', ModelReady);
//  // setup the html environment-------------------------------------
//  statusEl = createP('Caricamento modello:');
//  sentimentResult = createP('Percentuale sentimento:');
  //-----------------------------------------------------------

//selettore argomento
  sel1 = createSelect();  
  sel1.position(xbottoni*1.5, 180);
  sel1.option('Seleziona un argomento..');
  sel1.option('climate change');
  sel1.option('ocean pollution');
  sel1.option('fossil fuel');
  sel1.option('Amazon deforestation');
  sel1.option('CO2');
  sel1.changed(mySelectEvent);
    
//selettore mood
  sel2 = createSelect();  
  sel2.position(xbottoni, 180);
  sel2.option('Seleziona sentimento..');
  sel2.option('mad');
  sel2.option('sad');
  sel2.option('fine');
  sel2.option('good');
  sel2.option('happy');
  sel2.changed(mySelectEvent2);
    
//bottone genera racconto    
   buttonG = createButton('Generate Tale'); 
   buttonG.position(xbottoni, height*2);

    
// Create the LSTM Generator passing it the model directory
  charRNN = ml5.charRNN('models/report/', modelReady);
    
//-------------P5 SPEECH-------------------------------
  lingua = navigator.language || 'en-US'; //var lingua che imposta il     
  speech = new p5.Speech();

// Grab the DOM elements
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

// richiama funzione per far generare il racconto dopo aver scelto gli input
    eventoInput();
}

// seleziona l'argomento
function mySelectEvent() {
  let item = sel1.value();
    
  if (item === 'climate change') {
      argomento=' climate change '
   // console.log('hai selezionato climate change');
  } else if (item === 'ocean pollution') {  
      argomento=' ocean pollution '
   // console.log('hai selezionato ocean pollution');
  } else if (item === 'fossil fuel') {
      argomento=' fossil fuel '
   // console.log('hai selezionato fossil fuel');
  } else if (item === 'Amazon deforestation') {  
      argomento=' Amazon deforestation '
    //console.log('hai selezionato Amazon deforestation');
  } else if (item === 'CO2') { 
      argomento=' CO2 '
    //console.log('hai selezionato CO2');
  } 
}

// seleziona il mood
function mySelectEvent2() {
  let item2 = sel2.value();

  if (item2 === 'mad') {
      mood=' mad ';
    //console.log('hai selezionato '+mood);
  } else if (item2 === 'sad') {  
      mood=' sad '
    //console.log('hai selezionato sad');
  } else if (item2 === 'fine') {
      mood=' fine '
    //console.log('hai selezionato fine');
  } else if (item2 === 'good') {  
      mood=' good '
   // console.log('hai selezionato good');
  } else if (item2 === 'happy') { 
      mood=' happy '
    //console.log('hai selezionato happy');
  } 
//richiama genarate per mantenere gli elementi selezionati e generare un nuovo racconto
    eventoInput();
}

//avvia la generazione
function eventoInput() {
  //seleziona= argomento;
  
    let A= 'Hi, today I feel ';
    let B= '. Do you know that ';
  textInput = A + mood + B;
  //  console.log(textInput);

  buttonG.mousePressed(generate);
}

//avvia listen
//----------------------------------- buttonL.mousePressed(funzione della lettura di p5)

function modelReady() {
  select('#status').html('Model Loaded');
}



//genera
function generate() {
  // prevent starting inference if we've already started another instance
  // TODO: is there better JS way of doing this?
  if(!runningInference) {
    runningInference = true;

    // Update the status log
    select('#status').html('Generating...');

    // Update the length and temperature span elements
    select('#length').html(lengthSlider.value());
    select('#temperature').html(tempSlider.value());
      

    // Grab the original text
    const original = textInput + argomento;
    // Make it to lower case
    const txt = original.toLowerCase();

      
    // Check if there's something
    if (txt.length > 0) {
      // Here is the data for the LSTM generator
      const data = {
        seed: txt,
        temperature: tempSlider.value(),
        length: lengthSlider.value()
      };

      // Generate text with the charRNN
      charRNN.generate(data, gotData);

      // Update the DOM elements with typed and generated text
      function gotData(err, result) {
        select('#status').html('Ready!');
        select('#original').html(original);
        select('#prediction').html(result.sample);
          //------------------
          //------------------------
        testoCompleto = original +result.sample;
     //   console.log('testo completo=' + testoCompleto);
          
        //bottone per l'ascolto -listen   
   buttonL = createButton('Listen'); 
   buttonL.position(xbottoni, height*2.2);
   buttonL.mousePressed(listen);
          
        runningInference = false;
      }
    } else {
      // Clear everything
      select('#original').html('');
      select('#prediction').html('');
    }
  }
}

function listen() {
  //  console.log('LISTEN');
    speech.utterance.lang = lingua;
    speech.setVoice('Moira');
    speech.setRate(0.9);
    speech.setPitch(1);
    speech.speak(testoCompleto);
    
    buttonStop= createButton('Stop');
    buttonStop.position(xbottoni, height*2.3);
    buttonStop.mousePressed(stop);
    
}

function stop() {
  //  console.log('STOP');
    speech.synth.cancel();
}