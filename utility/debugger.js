// !!! al momento mancano alcuni casi da gestire e si riesce a mettere un ciclo dopo la virgola di un ciclo
//  ciò è ovviamente sbagliato e va gestito sennò la funziona suona si incazza

function checkNota(probabileNota){ // torna true se NON è una nota
  if (
    !(probabileNota.toLowerCase() in dictionaryParser) &&
    !((probabileNota.slice(0, -1)).toLowerCase() + "_"
    + probabileNota.charAt(probabileNota.length-1) in dictionaryParser)
    &&
    !(probabileNota.toLowerCase() + "_5" in dictionaryParser))
  {
    return true;
  }
  return false;
}

$(window).load(function(){
  $("textarea").data("oldValue", function() {
      return this.value;
  }).keyup(function() {
      var $this = $(this);
      if (this.value !== $this.data("oldValue")) {
          var temp = (this.value).split(" ");
          var testCasuale = {"do", "re", "mi", "fa", "la", "si","pausa"};
          var booleano = true;
          var pLeft = 0, comma = 0, pRight = 0, num = 0;
          for (var i = 0; i < temp.length; i++) {
            if (i == temp.length-1 && temp[i] === "") {
              break;
            }
            if (temp[i] === "") {
              //non mi interessa
            } else if (checkNota(temp[i]))
            {
              //dovrei prima assicurarmi che non sei un ciclo
              //ovvero controllare "ripeti" + "(" + serie di note + "," + numero + ")"
              //se non è nel dizionario può essere solo una di queste cose:
              // - ripeti(
              // - ripeti
              // - ripeti(* //con * che deve essere cosa buona
              // - numero
              // - ,
              // - *, //con * nota
              // - ,* //con * numero
              // - *) //con * numero
              // - )
              if (temp[i].indexOf("ripeti") > -1) {
                pLeft++;  comma++;  pRight++; num++;
                if (!temp[i].localeCompare("ripeti")) {
                  // tutto ok
                } else if (!temp[i].localeCompare("ripeti(")) {
                  pLeft--;
                } else {
                  pLeft--;
                  // caso: "ripeti(*" //con * che deve essere cosa buona
                  var appoggio = temp[i].split("ripeti(");
                  if (appoggio[0] === "" && !checkNota(appoggio[1]))
                  {
                    //tutto ok
                  } else {
                    //unica nota
                    if (appoggio[1].indexOf(",") > -1) { //caso in cui "ripeti(*,*)*" e "ripeti(*,"
                      comma--;

                      appoggio = appoggio[1].split(",");
                      if (!checkNota(appoggio[0]))
                      {
                        if ( appoggio[1] === "") {
                          //tutto ok
                        } else {
                          // => ripeti(*,* || ripeti(*,*) || ripeti(*,*)*
                          appoggio = appoggio[1].split(")");
                          if (appoggio.length >= 2) { //se non fosse così significa che non avrei la parentesi tonda quindi devo dare errore
                            //o ho numero + nota || numero + vuoto
                            pRight--;
                            if ( !isNaN(appoggio[0]) && (!checkNota(appoggio[1]) || appoggio[1] === "") )
                            {
                                num--;
                                //tutto ok
                            } else {
                              booleano = false;
                              break;
                            }
                          } else if(!isNaN(appoggio[0])){
                            num--;
                          } else {
                            booleano = false;
                            break;
                          }
                        }
                      }
                    } else {
                      booleano = false;
                      break;
                    }
                  }
                }
              } else if (temp[i].indexOf("(") > -1) {
                pLeft--;
                var appoggio4 = temp[i].split("(");
                console.log(appoggio4);
                if (appoggio4.length >= 1) {
                  if (appoggio4[0] === "" && !checkNota(appoggio4[1])) {
                    //tutto ok
                  } else {
                    booleano = false;
                    break;
                  }
                } else {
                  booleano = false;
                  break;
                }
              } else if(comma === 0 && !isNaN(temp[i])){ //solo se il numero è da solo
                num--;
              } else if(temp[i].indexOf(",") > -1){
                comma--;
                if (!temp[i].localeCompare(",")) {
                  // non mi ricordo a che serve questo caso
                }  else {
                  var appoggio2 = temp[i].split(",");
                  if (appoggio2[0] === ""  && !isNaN(appoggio2[1])) { // ,*
                        // tutto ok
                        num--;
                  } else if(appoggio2[1] === ""  && !checkNota(appoggio2[0])){ // *,
                        //tutto ok
                  } else if (!isNaN(appoggio2[1]) && !checkNota(appoggio2[0])){ // *,*
                    // tutto ok
                    num--;
                  } else {
                    // caso in cui  || "*,*)" || "*,*)*"

                    appoggio2 = appoggio2[1].split(")");
                    if (appoggio2.length >= 2) {
                      pRight--;
                      if (appoggio2[1] === "" && !isNaN(appoggio2[0])) { // " ,*)"
                        //tutto ok
                        num--;
                      } else if (!isNaN(appoggio2[0]) && !checkNota(appoggio2[1])) { // " ,*)*"
                        //tutto ok
                        num--;
                      } else {
                        booleano = false;
                        break;
                      }
                    } else {
                      booleano = false;
                      break;
                    }
                  }
                }
              } else if(temp[i].indexOf(")") > -1){
                pRight--;
                if (!temp[i].localeCompare(")")) {
                  //tutto ok
                } else {
                  var appoggio3 = temp[i].split(")");
                  if (!isNaN(appoggio3[0]) && appoggio3[1]==="") {
                    //tutto ok
                    num--;
                  } else if(
                      appoggio3[0]=== "" && !checkNota(appoggio3[1])){
                    //tutto ok
                  } else if(!isNaN(appoggio3[0]) && !checkNota(appoggio3[1])){
                      num--;
                      //tutto ok
                  } else {
                    booleano = false;
                    break;
                  }
                }
              } else {
                booleano = false;
                break;
              }
            }
          } //chiusura for
          if (pLeft !== 0 || comma !== 0 || pRight !== 0 || num !== 0 ) {
            console.log("pLeft comma pRight num");
            console.log(pLeft + " " + comma + " " + pRight + " " + num)
            booleano = false;
          }
          if (booleano) {
              $("#errore").html("");
              $("#ok").html("OK!");
              window.glob = false;
          }else{
              $("#errore").html("Errore!");
              $("#ok").html("");
              window.glob = true;
          }
      }
  });
});
