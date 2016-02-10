var note = {
  "261.63": -10,
  "293.66": 0,
  "329.63": 10,
  "349.23": 20,
  "392": 30,
  "440": 40,
  "493.88": 50,
  "523.25": 60
};

var periodo = {
  "1": "Semibreve",
  "0.5": "Minima",
  "0.25": "Semiminima",
  "0.125": "Croma",
  "0.0625" : "Semicroma",
  "0.03125": "Biscroma",
  "0.015625": "Semibiscroma"
};

function scriviPentagramma(arraySuona, troppeNote){
  window.parent.context.clearRect(0, 0, window.parent.canvas.width, window.parent.canvas.height); // pulisce la canvas
  for(var i=20; i<120; i=i+20){
    window.parent.context.moveTo(0, i);
    window.parent.context.lineTo(window.parent.canvas.width, i);
  }
  window.parent.context.stroke(); // disegna effettivamente le righe

  for (i = 0 + troppeNote; i < arraySuona.length; i++) {
    var img = document.getElementById(periodo[arraySuona[i][1].toString()]);
    var k = note[arraySuona[i][0].toString()];
    if (arraySuona[i][1] == 1) {
      k = note[arraySuona[i][0].toString()] - 36;
    }
    window.parent.context.drawImage(img, 30*(i-troppeNote), 76-k, img.width, img.height);
  }

  if (arraySuona.length - troppeNote > 17) {
    scriviPentagramma(arraySuona, troppeNote + 1);
  }
}

var fraMartino = [[349.23, 0.25], [392.0, 0.25], [440.0, 0.25], [349.23, 0.25], [349.23, 0.25], [392.0, 0.25], [440.0, 0.25], [349.23, 0.25], [440.0, 0.25], [493.88, 0.25], [523.25, 0.5], [440.0, 0.25], [493.88, 0.25], [523.25, 0.5] ];

function tutorial(arraySuona, tutTRE){

    if (arraySuona.length > fraMartino.length) {
      $("#divError").text("Stai scrivendo note che non sono sul pentagramma");
    } else {

      window.parent.context.clearRect(0, 0, window.parent.canvas.width, window.parent.canvas.height); // pulisce la canvas
      $("#divError").text("");
      // Creazione delle righe del pentagramma
      for(var i=30; i<120; i=i+20){
        window.parent.context.moveTo(0, i);
        window.parent.context.lineTo(window.parent.canvas.width, i);
      }
      window.parent.context.stroke(); // disegna effettivamente le righe
      var img = document.getElementById("ChiaveViolino");
      window.parent.context.drawImage(img, 0, 3, img.width, img.height);

      for (i = 0; i < fraMartino.length; i++) {
        // Carica e mette l'immagine della nota
        var qualeDurata = fraMartino[i][1].toString();
        var qualeNota = fraMartino[i][0].toString();
        var qualeImmagine = periodo[qualeDurata];
        if (i < arraySuona.length) {
          if (qualeDurata == arraySuona[i][1] && qualeNota == arraySuona[i][0]) {
            qualeImmagine = periodo[qualeDurata] + "T";
          } else {
            qualeImmagine = periodo[qualeDurata] + "F";
            if (!tutTRE && arraySuona[i][0] != fraMartino[i][0]) {
              $("#divError").text("Attento hai sbagliato frequenza, prova a scrivere " + fraMartino[i][0]);
            } else if (!tutTRE && arraySuona[i][1] != qualeDurata) {
              $("#divError").text("Hai sbagliato la durata, prova a scrivere 1/" + ((qualeDurata==0.25) ? 4 : 2));
            }
          }
        }
        var img = document.getElementById(qualeImmagine);
        var k = note[fraMartino[i][0].toString()];
        if (fraMartino[i][1] == 1) {
          k = note[fraMartino[i][0].toString()] - 36;
        }
        window.parent.context.drawImage(img, 45+30*i, 76-k, img.width, img.height);

        if (!tutTRE) {
          // Scrive il nome della nota in fondo
          window.parent.context.font = "10px Arial";
          window.parent.context.fillText(window.parent.frequencyToNote(fraMartino[i][0]), 45 + 30*i, 120);
        }
      }
    }
}


function matchExact(r, str) {
   var match = str.match(r);
   return match !== null && str == match[0];
}

function Debugger(){
  window.parent.glob3 = [];

  var booleano = true;
  var head = "";
  var tail = document.getElementById("textareaDUE").value;
  var suona = [];

 tail = tail.toLowerCase();
  tail = tail.replace(/ripeti/g,"@");

  while (tail.indexOf("@")!= -1){
    var startRipeti = tail.lastIndexOf("@");
    var endRipeti;
    var toAdd = "";
    for (var i = startRipeti; i < tail.length; i++) {
      if (tail[i]=="]"){
        endRipeti = i;
        break;
      }
    }
    var ripeti = tail.substring(startRipeti+1,endRipeti);
    var temp = ripeti.split("-");
    var iterator;

    if (temp.length != 2){
      booleano = false;
      break;
    } else {
      temp[1] = temp[1].replace( /[^\d.]/g, '' );
      iterator = parseInt(temp[1]);
      if (isNaN(iterator)){
        booleano = false;
        break;
      }


      if (temp[0].indexOf("[")!= -1){
        temp[0] = temp[0].replace("("," ");
        temp[0] = temp[0] + " ";
      } else {
        booleano = false;
        break;
      }
    }

    for (i = 0; i < iterator; i++){
      toAdd += temp[0];
    }
    tail = tail.substring(0,startRipeti -1) + toAdd + tail.substring(endRipeti+1,tail.length);
  }

  tail = tail.replace(/suona/g,"#");

  while (tail.indexOf("#")!= -1){
    var startRipeti = tail.indexOf("#");
    var endRipeti;
    var toAdd = "";
    for (var i = startRipeti; i < tail.length; i++) {
      if (tail[i]==")"){
        endRipeti = i;
        break;
      }
    }

    if (tail[startRipeti+1] != "(" || tail[endRipeti] != ")"){
      booleano = false;
      break;
    }

    var ripeti = tail.substring(startRipeti+2, endRipeti);
    var temp = ripeti.split(",");
    var frequenza;
    var durata;

    if (temp.length != 2){
      booleano = false;
      break;
    } else {

      temp[0] = temp[0].replace( /[^\d.]/g, '' );
      frequenza = parseFloat(temp[0]);
      if (isNaN(frequenza)){
        booleano = false;
        break;
      }

      var secondoSplit = temp[1].split("/");
      var numeratore = parseInt(secondoSplit[0]);
      if (secondoSplit.length < 2){
        booleano = false;
        break;
      }
      secondoSplit[1] = secondoSplit[1].replace( /[\s]/, '@' );
      secondoSplit[1] = secondoSplit[1].replace(/[\s]/g, '' );
      terzoSplit = secondoSplit[1].split("@");
      var denominatore = parseInt(terzoSplit[0]);
      if (terzoSplit.length > 1 && terzoSplit[1] !== "t" && terzoSplit[1] !== ""){
        booleano = false;
        break;
      }

      if (isNaN(numeratore) || isNaN(denominatore) || denominatore === 0){
        booleano = false;
        break;
      } else {
        durata = numeratore/denominatore;
      }
    }

    tail = tail.substring(0,startRipeti -1) + tail.substring(endRipeti+1,tail.length);
    suona.push([frequenza,durata]);

    if (tail.indexOf("#") == -1){
      tail = tail.replace(/[\s]/g, '' );
      if (tail.length > 0){
        booleano = false;
        break;
      }
    }
  }

  if (suona.length === 0) booleano = false;
  else  {
    console.log("LunghezzaArraySuona: ", suona.length);
    window.parent.glob3 = suona;
    console.log("IDFRAME: ", window.parent.where);


  }


  if (booleano) {
      window.parent.glob = false;
      if (window.parent.where == 2) {
        tutorial(suona, false);
      } else if (window.parent.where == 3) {
        tutorial(suona, true);
      } else if (window.parent.where == 4) {
        //funzione che scrive pentagramma
        scriviPentagramma(suona, 0);
    }
  }else{
      console.log(suona.length)
      $("#divError").text("Hai scritto qualcosa che non è una nota!");
      window.parent.glob = true;
      //tutorial([], false);
  }
}

$(window).load(function(){
  $("#textareaDUE").keyup(function() {
    // var $this = $(this);
    Debugger();
  });
});
