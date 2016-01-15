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

function suona(canzoneEsistente){
  if (window.glob || stoSuonando) {
    console.log("if in suona " + window.glob + " " + stoSuonando);
    return;
  }

  var text = document.getElementById("theId");
  var temp = (text.value).split(" ");
  if (typeof canzoneEsistente !== 'undefined') {
    temp = (canzoneEsistente).split(" ");
  }
  console.log("suona-> ", temp);
  var listaMusicaFinale = [];
  var listaMusicaCiclo = [];
  var quantiGiri = -1;
  var quellaDopo = -1;

  var sonoInUnCiclo = false;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i] === "") {
      //non mi interessa
    } else if (checkNota(temp[i]))
    {
      if (temp[i].indexOf("ripeti") > -1) {
        sonoInUnCiclo = true;
        if (!temp[i].localeCompare("ripeti")) {
          // tutto ok
        } else if (!temp[i].localeCompare("ripeti(")) {

        } else {

          // caso: "ripeti(*" //con * che deve essere cosa buona
          var appoggio = temp[i].split("ripeti(");
          if (appoggio[0] === "" && !checkNota(appoggio[1]))
          {
            if (
                (appoggio[1].slice(0, -1)).toLowerCase() + "_" + appoggio[1].charAt(appoggio[1].length-1) in dictionaryParser)
            {
              listaMusicaCiclo.push(dictionaryParser[(appoggio[1].slice(0, -1)).toLowerCase() + "_" + appoggio[1].charAt(appoggio[1].length-1)]);
            } else {
              listaMusicaCiclo.push(dictionaryParser[appoggio[1].toLowerCase() + "_5"]);
            }

          } else {
            //unica nota
            if (appoggio[1].indexOf(",") > -1) { //caso in cui "ripeti(*,*)*" e "ripeti(*,"

              appoggio = appoggio[1].split(",");
              if (!checkNota(appoggio[0]))
              {
                if (
                    (appoggio[0].slice(0, -1)).toLowerCase() + "_" + appoggio[0].charAt(appoggio[0].length-1) in dictionaryParser)
                {
                  listaMusicaCiclo.push(dictionaryParser[(appoggio[0].slice(0, -1)).toLowerCase() + "_" + appoggio[0].charAt(appoggio[0].length-1)]);
                } else {
                  listaMusicaCiclo.push(dictionaryParser[appoggio[0].toLowerCase() + "_5"]);
                }

                if ( appoggio[1] === "") {
                  //tutto ok
                } else {
                  // => ripeti(*,* || ripeti(*,*) || ripeti(*,*)*
                  appoggio = appoggio[1].split(")");
                  if (appoggio.length >= 2) { //se non fosse così significa che non avrei la parentesi tonda quindi devo dare errore
                    //o ho numero + nota || numero + vuoto

                    if ( !isNaN(appoggio[0]) && (!checkNota(appoggio[1]) || appoggio[1] === "") )
                    {
                        quantiGiri = appoggio[0];
                        //tutto ok
                        if (!checkNota(appoggio[1])) {
                          if (
                              (appoggio[1].slice(0, -1)).toLowerCase() + "_" + appoggio[1].charAt(appoggio[1].length-1) in dictionaryParser)
                          {
                            quellaDopo = dictionaryParser[(appoggio[1].slice(0, -1)).toLowerCase() + "_" + appoggio[1].charAt(appoggio[1].length-1)];
                          } else {
                            quellaDopo = dictionaryParser[appoggio[1].toLowerCase() + "_5"];
                          }
                        }
                    }
                  } else if(!isNaN(appoggio[0])){
                    quantiGiri = appoggio[0];
                  }
                }
              }
            }
          }
        }
      } else if (temp[i].indexOf("(") > -1)
      {
        var appoggio4 = temp[i].split("(");
        if (appoggio4.length >= 1) {
          if (appoggio4[0] === "" && !checkNota(appoggio4[1])) {
            //tutto ok
            if (
                (appoggio4[1].slice(0, -1)).toLowerCase() + "_" + appoggio4[1].charAt(appoggio4[1].length-1) in dictionaryParser)
            {
              listaMusicaCiclo.push(dictionaryParser[(appoggio4[1].slice(0, -1)).toLowerCase() + "_" + appoggio4[1].charAt(appoggio4[1].length-1)]);
            } else {
              listaMusicaCiclo.push(dictionaryParser[appoggio4[1].toLowerCase() + "_5"]);
            }
          }
        }
      } else if(!isNaN(temp[i])){ //solo se il numero è da solo
            quantiGiri = temp[i];
      } else if(temp[i].indexOf(",") > -1)
      {
        if (!temp[i].localeCompare(",")) {
          // non mi ricordo a che serve questo caso
        }  else {
          var appoggio2 = temp[i].split(",");
          if (appoggio2[0] === ""  && !isNaN(appoggio2[1])) { // ,*
                // tutto ok
                quantiGiri = appoggio2[1];
          } else if(appoggio2[1] === ""  && !checkNota(appoggio2[0])){ // *,
                //tutto ok
                if (
                    (appoggio2[0].slice(0, -1)).toLowerCase() + "_" + appoggio2[0].charAt(appoggio2[0].length-1) in dictionaryParser)
                {
                  listaMusicaCiclo.push(dictionaryParser[(appoggio2[0].slice(0, -1)).toLowerCase() + "_" + appoggio2[0].charAt(appoggio2[0].length-1)]);
                } else {
                  listaMusicaCiclo.push(dictionaryParser[appoggio2[0].toLowerCase() + "_5"]);
                }
          } else if (!isNaN(appoggio2[1]) && !checkNota(appoggio2[0])){ // *,*
            // tutto ok
            quantiGiri = appoggio2[1];
            if (
                (appoggio2[0].slice(0, -1)).toLowerCase() + "_" + appoggio2[0].charAt(appoggio2[0].length-1) in dictionaryParser)
            {
              listaMusicaCiclo.push(dictionaryParser[(appoggio2[0].slice(0, -1)).toLowerCase() + "_" + appoggio2[0].charAt(appoggio2[0].length-1)]);
            } else {
              listaMusicaCiclo.push(dictionaryParser[appoggio2[0].toLowerCase() + "_5"]);
            }
          } else {
            // caso in cui  || "*,*)" || "*,*)*"

            appoggio2 = appoggio2[1].split(")");
            if (appoggio2.length >= 2) {

              if (appoggio2[1] === "" && !isNaN(appoggio2[0])) { // " ,*)"
                //tutto ok
                quantiGiri = appoggio2[0];
              } else if (!isNaN(appoggio2[0]) && !checkNota(appoggio2[1])) { // " ,*)*"
                //tutto ok
                quantiGiri = appoggio2[0];
                if (
                    (appoggio2[1].slice(0, -1)).toLowerCase() + "_" + appoggio2[1].charAt(appoggio2[1].length-1) in dictionaryParser)
                {
                  quellaDopo = dictionaryParser[(appoggio2[1].slice(0, -1)).toLowerCase() + "_" + appoggio2[1].charAt(appoggio2[1].length-1)];
                } else {
                  quellaDopo = dictionaryParser[appoggio2[1].toLowerCase() + "_5"];
                }
              }
            }
          }
        }
      } else if(temp[i].indexOf(")") > -1)
      {
        sonoInUnCiclo = false;
        if (!temp[i].localeCompare(")")) {
          //tutto ok
        } else {
          var appoggio3 = temp[i].split(")");
          if (!isNaN(appoggio3[0]) && appoggio3[1]==="") {
            //tutto ok
            quantiGiri = appoggio3[0];
          } else if(appoggio3[0]=== "" && !checkNota(appoggio3[1])){
            //tutto ok
            quantiGiri = appoggio3[0];
            if (
                (appoggio3[1].slice(0, -1)).toLowerCase() + "_" + appoggio3[1].charAt(appoggio3[1].length-1) in dictionaryParser)
            {
              listaMusicaFinale.push(dictionaryParser[(appoggio3[1].slice(0, -1)).toLowerCase() + "_" + appoggio3[1].charAt(appoggio3[1].length-1)]);
            } else {
              listaMusicaFinale.push(dictionaryParser[appoggio3[1].toLowerCase() + "_5"]);
            }
          } else if(!isNaN(appoggio3[0]) && !checkNota(appoggio3[1])){
              num--;
              //tutto ok
              if (
                  (appoggio3[1].slice(0, -1)).toLowerCase() + "_" + appoggio3[1].charAt(appoggio3[1].length-1) in dictionaryParser)
              {
                listaMusicaFinale.push(dictionaryParser[(appoggio3[1].slice(0, -1)).toLowerCase() + "_" + appoggio3[1].charAt(appoggio3[1].length-1)]);
              } else {
                listaMusicaFinale.push(dictionaryParser[appoggio3[1].toLowerCase() + "_5"]);
              }
          }
        }
      }
    } else {

      // qui dovrebbe essere una nota quindi la push nella lista
      if (sonoInUnCiclo) {
        if (
            (temp[i].slice(0, -1)).toLowerCase() + "_" + temp[i].charAt(temp[i].length-1) in dictionaryParser)
        {
          listaMusicaCiclo.push(dictionaryParser[(temp[i].slice(0, -1)).toLowerCase() + "_" + temp[i].charAt(temp[i].length-1)]);
        } else {
          listaMusicaCiclo.push(dictionaryParser[temp[i].toLowerCase() + "_5"]);
        }
      } else {
          if (
              (temp[i].slice(0, -1)).toLowerCase() + "_" + temp[i].charAt(temp[i].length-1) in dictionaryParser)
          {
            listaMusicaFinale.push(dictionaryParser[(temp[i].slice(0, -1)).toLowerCase() + "_" + temp[i].charAt(temp[i].length-1)]);
          } else {
            listaMusicaFinale.push(dictionaryParser[temp[i].toLowerCase() + "_5"]);
          }
      }
    }

    if (!sonoInUnCiclo && listaMusicaCiclo.length !== 0 && quantiGiri != -1) {
      //devo pushare la listaCiclo nella listaNormale
      for (var j = 0; j < parseInt(quantiGiri); j++) {
        listaMusicaFinale = listaMusicaFinale.concat(listaMusicaCiclo);
      }
      if (quellaDopo != -1) {
        listaMusicaFinale.push(quellaDopo);
      }
      listaMusicaCiclo = [];
      quantiGiri = -1;
      quellaDopo = -1;
    }
  } //chiusura for

  stoSuonando = true;
  riproduci(listaMusicaFinale);

}
