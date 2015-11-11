var stoSuonando = false;
var thereIsABug = false;

// function play(audio) {
//   if (!audio.paused) { // if playing stop and rewind
//     audio.pause();
//     audio.currentTime = 0;
//   }
//   audio.play();
// }

function test(data){
  try{
    data.last().play();
    data.last().onended = function() {
      data.pop();
      test(data);
    };
  }catch(err){
    stoSuonando = false;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function showtext(){
  if (thereIsABug || stoSuonando) {
    console.log("if in showtext" + thereIsABug + stoSuonando);
    return;};
 var text = document.getElementById("theId");
 console.log(text.value);
 var listaDaTextArea = (text.value).split(" ");
 console.log(listaDaTextArea);
 
 var listaMusicaFinale = [];
 for (var i = 0; i < listaDaTextArea.length; i++) {
   if (listaDaTextArea[i].length > 2 && listaDaTextArea[i].toLowerCase() != "sol") {
    //se ho scelto anche l'ottava o è il sol
    listaMusicaFinale.push(dictionaryParser[(listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_" + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1)])
  } else {
    //uso "ottava base" => 4
    listaMusicaFinale.push(dictionaryParser[listaDaTextArea[i].toLowerCase() + "_4"])
   };
 };
 // console.log(listaMusicaFinale)
 stoSuonando = true;
 test(listaMusicaFinale.reverse())
}