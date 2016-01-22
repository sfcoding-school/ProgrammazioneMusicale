// !!! al momento mancano alcuni casi da gestire e si riesce a mettere un ciclo dopo la virgola di un ciclo
//  ciò è ovviamente sbagliato e va gestito sennò la funziona suona si incazza

function matchExact(r, str) {
   var match = str.match(r);
   return match !== null && str == match[0];
}

$(window).load(function(){
  $("#theId2").keyup(function() { 
      var $this = $(this);
      //if (this.value !== $this.data("oldValue")) {
          var booleano = true
          var head = ""
          var tail = (this.value)
          var suona = []

          tail.toLowerCase()
          tail = tail.replace(/ripeti/g,"@")

          //console.log("tailFOR ", tail)

          while (tail.indexOf("@")!= -1){
            var startRipeti = tail.lastIndexOf("@")
            var endRipeti
            var toAdd = ""
            for (var i = startRipeti; i < tail.length; i++) {
              if (tail[i]==")"){
                endRipeti = i;
                break
              }
            }
            var ripeti = tail.substring(startRipeti+1,endRipeti)
            var temp = ripeti.split(",")
            var iterator

            //console.log("tailFOR ", ripeti)
            if (temp.length != 2){
              booleano = false
              break
            } else {
              temp[1] = temp[1].replace( /[^\d.]/g, '' )
              iterator = parseInt(temp[1])
              //console.log("tailFOR ", iterator)
              if (isNaN(iterator)){
                booleano = false
                break
              }


              if (temp[0].indexOf("(")!= -1){
                temp[0] = temp[0].replace("("," ")
                temp[0] = temp[0] + " "
              } else {
                booleano = false
                break
              }
            }

            for (var i = 0; i < iterator; i++){
              toAdd += temp[0]
            }

            tail = tail.substring(0,startRipeti -1) + toAdd + tail.substring(endRipeti+1,tail.length)
            //console.log("tailFOR ", tail)

           console.log("sopra ", tail)
          }

          tail = tail.replace(/suona/g,"#")

          console.log("suona ", tail)

          while (tail.indexOf("#")!= -1){
            console.log("a")
            var startRipeti = tail.indexOf("#")
            var endRipeti
            var toAdd = ""
            for (var i = startRipeti; i < tail.length; i++) {
              if (tail[i]==")"){
                endRipeti = i;
                break
              }
            }
            var ripeti = tail.substring(startRipeti+1,endRipeti)
            var temp = ripeti.split(",")
            var frequenza
            var durata

            //console.log("tailFOR ", ripeti)
            if (temp.length != 2){
              booleano = false
              break
            } else {

              temp[0] = temp[0].replace( /[^\d.]/g, '' )
              frequenza = parseFloat(temp[0])
              //console.log("tailFOR ", iterator)
              if (isNaN(frequenza)){
                booleano = false
                break
              }

              temp[1] = temp[1].replace( /[^\d.]/g, '' )
              durata = parseFloat(temp[1])
              //console.log("tailFOR ", iterator)
              if (isNaN(durata)){
                booleano = false
                break
              }



            }   

            tail = tail.substring(endRipeti+1,tail.length)
            suona.push([frequenza,durata])


          }
          console.log("SUONA ", suona)
          window.glob3 = suona;

            
          if (booleano) {
              $("#errore").html("");
              $("#ok").html("OK!");
              window.glob = false;
          }else{
              $("#errore").html("Errore!");
              $("#ok").html("");
              window.glob = true;
          }
        


  });
});
