$(window).load(function(){
  $("textarea").data("oldValue", function() {
      return this.value;
  }).keyup(function() {
      var $this = $(this);
      if (this.value !== $this.data("oldValue")) {
          var temp = (this.value).split(" ");
          var testCasuale = ["do", "re", "mi", "fa", "la", "si"];
          var booleano = true;
          var pLeft = 0, comma = 0, pRight = 0;
          for (var i = 0; i < temp.length; i++) {
            if (i == temp.length-1 && temp[i] === "") {
              break;
            }
            if (
                  !(temp[i].toLowerCase() in dictionaryParser) &&
                  !((temp[i].slice(0, -1)).toLowerCase() + "_"
                  + temp[i].charAt(temp[i].length-1) in dictionaryParser)
                  &&
                  !(temp[i].toLowerCase() + "_4" in dictionaryParser)
                )
            {
              //dovrei prima assicurarmi che non sei un ciclo
              //ovvero controllare "ripeti" + "(" + serie di note + "," + numero + ")"

              //se non è nel dizionario può essere:
              // - ripeti(
              // - ripeti
              // - ripeti(* //con * che deve essere cosa buona
              // - ,
              // - numero
              // - )
              
            }
          }
          if (booleano) {
              $("#errore").html("");
              $("#ok").html("OK!");
              thereIsABug = false;
          }else{
              $("#errore").html("Errore!");
              $("#ok").html("");
              thereIsABug = true;
          }
          // // console.log("Changed! New value: " + this.value);
          // // console.log((this.value).indexOf("ciao") > -1);
          // if((this.value).indexOf("ciao") > -1){
          //     // console.log("entrato");
          //     $("#theId").val(this.value + "volevosoloaggiungeretesto");
          // };

          // $this.data("oldValue", this.value);
      }
  });
});
