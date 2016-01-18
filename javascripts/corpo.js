var stoSuonando = false;

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