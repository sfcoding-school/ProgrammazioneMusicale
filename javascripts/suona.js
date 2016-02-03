var stoSuonando = false;


function riproduciRunTime(data){
  try{
    stoSuonando = true;
    data.play();
    data.onended = function() {
      stoSuonando = false;
    };
  }catch(err){
    stoSuonando = false;
    console.log("Errore in rirpodiciRunTime");
  }
}


function riproduci(data){
  try{
    data[0].play();
    data[0].onended = function() {
      data.shift();
      riproduci(data);
    };
  }catch(err){
    stoSuonando = false;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function checkNota(probabileNota){ // torna true se NON è una nota
  if (
    !(probabileNota.toLowerCase() in dictionaryParser) &&
    !((probabileNota.slice(0, -1)).toLowerCase() + "_" +
    probabileNota.charAt(probabileNota.length-1) in dictionaryParser) &&
    !(probabileNota.toLowerCase() + "_5" in dictionaryParser))
  {
    return true;
  }
  return false;
}

function suona(){
  if (window.glob || stoSuonando) {
    console.log("if in suona " + window.glob + " " + stoSuonando);
    return;
  }

  var arrayNote = window.glob2;
  var listaMusicaFinale = [];

  for (var i = 0; i < arrayNote.length; i++) {

    listaMusicaFinale.push(dictionaryParser[arrayNote[i]]);
  }

  stoSuonando = true;
  riproduci(listaMusicaFinale);

}

function suonaRunTime(){
  if (window.glob || stoSuonando) {
    console.log("if in suona " + window.glob + " " + stoSuonando);
    return;
  }

  var arrayNote = window.parent.glob3;
  console.log("suonaRunTime", arrayNote);
  riproduciRunTime(simHertzRunTime(arrayNote));

}
