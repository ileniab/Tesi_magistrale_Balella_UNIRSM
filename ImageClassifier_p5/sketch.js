// -
// TEACHABLE MACHINE-Training plant img model by Ilenia Balella [Training, machine learning]
// 2020 © Ilenia Balella @ileniab, Daniele @Fupete Tesi magistrale at DESIGN.unirsm 
// github.com/ileniab
// Educational purposes, MIT License, 2020, San Marino
// —
// Credits/Thanks to: 
// @Google Creative Lab for https://github.com/googlecreativelab/teachable-machine-v1
// original license:Apache License Version 2.0, January 2004 http://www.apache.org/licenses/
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Three type of plant Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
  let classifier;

// A variable to hold the image we want to classify
let img;

// Model URL
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/KNLlt1I1T/';
// or use the Model downloaded from Teachable machine
  let imageModelURL = 'model/';
  

// To store the classification
  let label = "Sto cercando...";

  let racconto="";


// 1 STEP: LOAD the model and the img test
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    img = loadImage('imagesTest/2.jpg');
    fontRobotoB = loadFont('font/RobotoSlab-Bold.ttf');
    fontRobotoM = loadFont('font/RobotoSlab-Medium.ttf');
    fontKarla = loadFont('font/Karla-Light.ttf');
  }


  function setup() {
    createCanvas(400, 410);
    
// 2 STEP start classifying the img
    classifyImg();    
  }
    

// 3 STEP classify the img
  function classifyImg (){
    classifier.classify(img, gotResult);   
    }

  function draw() {
   background(0);
    // Draw the video
   // image(flippedVideo, 0, 0);
    
    image(img, 0, 0, width, height);
    noStroke();
    fill(255);
    rect(width-width, height - (height / 20), width, height);

// 5 STEP Draw the label
    fill(0);
    textFont(fontKarla);
    textSize(18);
    textAlign(CENTER);
    text(label, width / 2, height-5);
  }

// 4 STEP get the classification
//   A function to run when we get any errors and the results

function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results);

    
    // mostra solo il primo
    label = results[0].label;

  
  //createDiv('Label: ' + results[0].label);
//  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
  
  scriviRacconto(label);
  
}

function scriviRacconto(label){
  
  if (label=='Persea-americana'){
    racconto ='Ciao, <br>la foglia che vedi mostra le caratteristiche più intime nella mia natura, e da essa traggo parte del mio nutrimento. <br>Sono una <b>Persea americana</b>, ma mi dovresti conoscere per il nome del mio frutto: Avocado. <br>Ho bisogno di molta luce, ma che non sia troppo diretta, sono una pianta un po&#39 sensibile. Il terreno dove mi piace attecchire deve essere umido ma non troppo bagnato. La temperatura ideale per il mio habitat non deve scendere al di sotto dei 15° C. <br>Oggi se potessi parlare direi..';
    
  }
  else if (label=='Monstera deliciosa'){
   racconto ='Ciao, <br>la foglia che vedi mi appartiene, e da essa traggo luce e nutrimento. <br>Sono una <b>Monstera deliciosa</b>, i miei avi provengono dalle giungle messicane, per questo ho bisogno di molto spazio. La forma bizzarra delle mie foglie è data da una specifica causa. Infatti, nel mio habitat, c’è molta vegetazione e spesso la luce fatica a passare. Per questo motivo i miei buchi ne permettono il passaggio, in modo da farle raggiungere anche le foglie più piccole e nascoste.<br> Amo la luce, e per prosperare ho quindi bisogno di uno spazio ampio ed illuminato, senza che però i raggi del sole insistano troppo direttamente sulle mie foglie. Il terreno che prediligo deve essere umido, ma non pieno d&#39acqua e la temperatura che preferisco va dai 10°C ai 24°C.<br>Oggi nei confronti del climate change potrei raccontare..';
    
  }
  else if (label=='Nephrolepis exaltata'){
    racconto='Ciao, <br>sono una <b>Nephrolepis exaltata</b>, ma tutti mi chiamano felce e sono originaria dell&#39Asia orientale e Oceania. Queste sono le mie foglie, sicuramente le avrai già viste, sono una pianta abbastanza famosa. Inoltre, sono molto antica, infatti ero già presente 360 milioni di anni fa, e da allora la mia forma non è più cambiata. Siamo una famiglia numerosa, infatti ci suddividiamo in più di 10 mila specie.<br>Mi piacciono i luoghi luminosi, ma preferisco stare nel sottobosco delle foreste, dove i raggi più caldo non possono colpirmi direttamente. Il terreno che più mi si addice deve essere umido, ma non eccessivamente. La temperatura migliore per permettermi di crescere al meglio va dai 12°C ai 24°C.<br>Se potessi discutere con te dei pericoli dovuti dai livelli di CO2 direi..';
  }
 
  createP(racconto);
}

