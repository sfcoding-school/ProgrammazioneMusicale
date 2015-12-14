var stoSuonando = false;

function riproduci(data, n){
  try{
      data[n].play();
      data[n].onended = function() {
        riproduci(data, n-1);
      };
  }catch(err){
    stoSuonando = false;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function suona2(canzoneEsistente){
  if (window.glob || stoSuonando) {
    console.log("if in suona " + window.glob + " " + stoSuonando);
    return;
  }

  var text = document.getElementById("theId");
  var listaDaTextArea = (text.value).split(" ");
  if (typeof canzoneEsistente !== 'undefined') {
    listaDaTextArea = (canzoneEsistente).split(" ");
  }
  console.log("suona-> ", listaDaTextArea);
  var listaMusicaFinale = [];


}

function suona(canzoneEsistente){
  if (window.glob || stoSuonando) {
    console.log("if in suona " + window.glob + " " + stoSuonando);
    return;
  }

  var text = document.getElementById("theId");
  var listaDaTextArea = (text.value).split(" ");
  if (typeof canzoneEsistente !== 'undefined') {
    listaDaTextArea = (canzoneEsistente).split(" ");
  }
  console.log("suona-> ", listaDaTextArea);
  var listaMusicaFinale = [];
  var i=0;
  while(i<listaDaTextArea.length){

    if (listaDaTextArea[i].toLowerCase() in dictionaryParser /*caso pausa*/) {
      listaMusicaFinale.push(dictionaryParser[listaDaTextArea[i]]);
    } else if (
          (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
          + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1) in dictionaryParser
          ||
          listaDaTextArea[i].toLowerCase() + "_4" in dictionaryParser
        )
    {
      if (
          (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
          + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1) in dictionaryParser)
      {
        listaMusicaFinale.push(dictionaryParser[(listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
                                + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1)]);
      } else {
        listaMusicaFinale.push(dictionaryParser[listaDaTextArea[i].toLowerCase() + "_4"]);
      }

      console.log("trovato " + (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
            + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1))
    } else {
        if (listaDaTextArea[i].indexOf("ripeti") > -1) {
          var listaMusicaCiclo = [];
          var temp = listaDaTextArea[i].split("(");
          if (temp.length > 1) {
            if (temp[1].toLowerCase() in dictionaryParser /*caso pausa*/) {
              listaMusicaCiclo.push(dictionaryParser[temp[1]]);
            } else if (
                  (temp[1].slice(0, -1)).toLowerCase() + "_"
                  + temp[1].charAt(temp[1].length-1) in dictionaryParser
                  ||
                  temp[1].toLowerCase() + "_4" in dictionaryParser
                )
            {
              if (
                  (temp[1].slice(0, -1)).toLowerCase() + "_"
                  + temp[1].charAt(temp[1].length-1) in dictionaryParser)
              {
                listaMusicaCiclo.push(dictionaryParser[(temp[1].slice(0, -1)).toLowerCase() + "_"
                                        + temp[1].charAt(temp[1].length-1)]);
              } else {
                listaMusicaCiclo.push(dictionaryParser[temp[1].toLowerCase() + "_4"]);
              }
              // console.log("trovato2 " + temp[1])
            }
          }
          i++;
          while (listaDaTextArea[i].indexOf(",") <= -1) {
            if (listaDaTextArea[i].toLowerCase() in dictionaryParser /*caso pausa*/) {
              listaMusicaFinale.push(dictionaryParser[listaDaTextArea[i]]);
            } else if (
                  (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
                  + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1) in dictionaryParser
                  ||
                  listaDaTextArea[i].toLowerCase() + "_4" in dictionaryParser
                )
            {
              if (
                  (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
                  + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1) in dictionaryParser)
              {
                listaMusicaCiclo.push(dictionaryParser[(listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
                                        + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1)]);
              } else {
                listaMusicaCiclo.push(dictionaryParser[listaDaTextArea[i].toLowerCase() + "_4"]);
              }
              // console.log("trovato2 " + (listaDaTextArea[i].slice(0, -1)).toLowerCase() + "_"
              //       + listaDaTextArea[i].charAt(listaDaTextArea[i].length-1))
            }
            i++;
          }
          //devo poi beccare se c'è una nota attaccata alla virgola
          temp = listaDaTextArea[i].split(",");
          if (temp.length > 1) {
            if (temp[0].toLowerCase() in dictionaryParser /*caso pausa*/) {
              listaMusicaFinale.push(dictionaryParser[temp[0]]);
            } else if (
                  (temp[0].slice(0, -1)).toLowerCase() + "_"
                  + temp[0].charAt(temp[0].length-1) in dictionaryParser
                  ||
                  temp[0].toLowerCase() + "_4" in dictionaryParser
                )
            {
              if (
                  (temp[0].slice(0, -1)).toLowerCase() + "_"
                  + temp[0].charAt(temp[0].length-1) in dictionaryParser)
              {
                listaMusicaCiclo.push(dictionaryParser[(temp[0].slice(0, -1)).toLowerCase() + "_"
                                        + temp[0].charAt(temp[0].length-1)]);
              } else {
                listaMusicaCiclo.push(dictionaryParser[temp[0].toLowerCase() + "_4"]);
              }
              // console.log("trovato2 " + temp[0])
            }
          }
          i++;
          var quantiGiri;
          var notaDopo = "";
          while (true) {
            if (!isNaN(listaDaTextArea[i]) || listaDaTextArea[i].indexOf(")") > -1) {
              temp = listaDaTextArea[i].split(")");
              quantiGiri = temp[0];

              if ( temp.length > 1 &&
                    (temp[1].slice(0, -1)).toLowerCase() + "_"
                    + temp[1].charAt(temp[1].length-1) in dictionaryParser
                    ||
                    temp[1].toLowerCase() + "_4" in dictionaryParser
                  )
              {
                if (
                    (temp[1].slice(0, -1)).toLowerCase() + "_"
                    + temp[1].charAt(temp[1].length-1) in dictionaryParser)
                {
                  notaDopo = (dictionaryParser[(temp[1].slice(0, -1)).toLowerCase() + "_"
                                          + temp[1].charAt(temp[1].length-1)]);
                } else {
                  notaDopo = (dictionaryParser[temp[1].toLowerCase() + "_4"]);
                }
              }
              break;
            }
          }

          for (var j = 0; j < parseInt(quantiGiri); j++) {
            // console.log("sas " + listaMusicaCiclo.length + listaMusicaCiclo);
            listaMusicaFinale = listaMusicaFinale.concat(listaMusicaCiclo);
          }
          if (notaDopo !== "") listaMusicaFinale.push(notaDopo);

        }
    }
    i++;
  }
  stoSuonando = true;
  riproduci(listaMusicaFinale.reverse(), listaMusicaFinale.length-1);
  console.log(listaMusicaFinale.reverse());
}
