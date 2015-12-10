$(window).load(function(){
  $("textarea").data("oldValue", function() {
      return this.value;
  }).keyup(function() {
      var $this = $(this);
      if (this.value !== $this.data("oldValue")) {
          var temp = (this.value).split(" ")
          var testCasuale = ["do", "re", "mi", "fa", "la", "si"]
          var booleano = true;
          for (var i = 0; i < temp.length; i++) {
            if (temp[i] != "") {
              lunghezzaAttuale = temp[i].length;
              if (lunghezzaAttuale > 4 || lunghezzaAttuale ==1) {
                booleano = false;

                break;
              };
              if (lunghezzaAttuale == 4) {
                  //devi essere sol + numero
                  if(!isNaN(temp[i].charAt(lunghezzaAttuale-1)) && temp[i].slice(0, -1) == "sol"){
                    //OK!
                    } else{
                    booleano = false;
                    break;
                  }
              };
              if (lunghezzaAttuale == 3) {
                //o sei sol o sei uno degli altri + numero
                if (temp[i] == "sol") {
                  //OK
               } else {
                  if(!isNaN(temp[i].charAt(lunghezzaAttuale-1)) && testCasuale.indexOf(temp[i].slice(0, -1)) > -1){
                    //OK!
                  } else{
                    booleano = false;
                    break;
                  }
                };
              };
              if (lunghezzaAttuale == 2) {
                //devi essere una delle note
                if (testCasuale.indexOf(temp[i]) > -1) {
                  //OK

               }else{
                  booleano = false;

                  break;
                };
              };
            };
          };
          if (booleano) {
              $("#errore").html("");
              $("#ok").html("OK!");
              thereIsABug = false;
          }else{
              $("#errore").html("Errore!");
              $("#ok").html("");
              thereIsABug = true;
          };
          // // console.log("Changed! New value: " + this.value);
          // // console.log((this.value).indexOf("ciao") > -1);
          // if((this.value).indexOf("ciao") > -1){
          //     // console.log("entrato");
          //     $("#theId").val(this.value + "volevosoloaggiungeretesto");
          // };

          // $this.data("oldValue", this.value);
      }
  });
});//]]>
