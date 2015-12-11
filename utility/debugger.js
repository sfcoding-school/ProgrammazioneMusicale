// !!! al momento mancano alcuni casi da gestire e si riesce a mettere un ciclo dopo la virgola di un ciclo
//  ciò è ovviamente sbagliato e va gestito sennò la funziona suona si incazza

$(window).load(function(){
  $("textarea").data("oldValue", function() {
      return this.value;
  }).keyup(function() {
      var $this = $(this);
      if (this.value !== $this.data("oldValue")) {
          var temp = (this.value).split(" ");
          var testCasuale = ["do", "re", "mi", "fa", "la", "si"];
          var booleano = true;
          var pLeft = 0, comma = 0, pRight = 0, num = 0;
          for (var i = 0; i < temp.length; i++) {
            if (i == temp.length-1 && temp[i] === "") {
              break;
            }
            if (temp[i] === "") {
              //non mi interessa
            } else if (
                  !(temp[i].toLowerCase() in dictionaryParser) &&
                  !((temp[i].slice(0, -1)).toLowerCase() + "_"
                  + temp[i].charAt(temp[i].length-1) in dictionaryParser)
                  &&
                  !(temp[i].toLowerCase() + "_4" in dictionaryParser)
                )
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
                  if (appoggio[0] === "" &&
                      (
                        (appoggio[1].toLowerCase() in dictionaryParser) ||
                        ((appoggio[1].slice(0, -1)).toLowerCase() + "_"
                        + appoggio[1].charAt(appoggio[1].length-1) in dictionaryParser)
                        ||
                        (appoggio[1].toLowerCase() + "_4" in dictionaryParser)
                      )
                    )
                  {
                    //tutto ok
                  } else { //manca il caso in cui "ripeti(*,*)*" e "ripeti(*," //unica nota
                    booleano = false;
                    break;
                  }
                }
              } else if(comma === 0 && !isNaN(temp[i])){ //solo se il numero è da solo
                num--; console.log("asd1 " +  temp[i] + " " + !isNaN(temp[i]) + " " + !isNaN("") );
              } else if(temp[i].indexOf(",") > -1){
                //manca il caso in cui "*,*)" && "*,*)*"
                comma--;
                if (!temp[i].localeCompare(",")) {
                }  else {
                  var appoggio2 = temp[i].split(",");
                  if (appoggio2[0] === ""  && !isNaN(appoggio2[1])) {
                        // tutto ok
                        num--; console.log("asd2")
                  } else if(appoggio2[1] === ""  &&
                      (
                        (appoggio2[0].toLowerCase() in dictionaryParser) ||
                        ((appoggio2[0].slice(0, -1)).toLowerCase() + "_"
                        + appoggio2[0].charAt(appoggio2[0].length-1) in dictionaryParser)
                        ||
                        (appoggio2[0].toLowerCase() + "_4" in dictionaryParser)
                      )){
                        //tutto ok
                      } else if (!isNaN(appoggio2[1])  &&
                          (
                            (appoggio2[0].toLowerCase() in dictionaryParser) ||
                            ((appoggio2[0].slice(0, -1)).toLowerCase() + "_"
                            + appoggio2[0].charAt(appoggio2[0].length-1) in dictionaryParser)
                            ||
                            (appoggio2[0].toLowerCase() + "_4" in dictionaryParser)
                          )){
                            // tutto ok
                            num--; console.log("asd3")
                          } else {
                            booleano = false;
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
                      appoggio3[0]==="" &&
                      (
                        (appoggio3[1].toLowerCase() in dictionaryParser) ||
                        ((appoggio3[1].slice(0, -1)).toLowerCase() + "_"
                        + appoggio3[1].charAt(appoggio3[1].length-1) in dictionaryParser)
                        ||
                        (appoggio3[1].toLowerCase() + "_4" in dictionaryParser)
                      )
                  ){
                    //tutto ok
                  } else if(!isNaN(appoggio3[0]) &&
                    (
                      (appoggio3[1].toLowerCase() in dictionaryParser) ||
                      ((appoggio3[1].slice(0, -1)).toLowerCase() + "_"
                      + appoggio3[1].charAt(appoggio3[1].length-1) in dictionaryParser)
                      ||
                      (appoggio3[1].toLowerCase() + "_4" in dictionaryParser)
                    )){
                      num--; console.log("asd4")
                      //tutto ok
                  } else {
                    booleano = false;
                  }
                }
              } else {
                booleano = false;
              }
            }
          } //chiusura for
          if (pLeft !== 0 || comma !== 0 || pRight !== 0 || num !== 0 ) {
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
