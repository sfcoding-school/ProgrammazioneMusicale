var note = {
  "261.63": 0,
  "293.66": 10,
  "329.63": 20,
  "349.23": 30,
  "392": 40,
  "440": 50,
  "493.88": 60,
  "523.25": 70
};

var periodo = {
  "1": "Semibreve",
  "2": "Minima",
  "4": "Semiminima"
};

var fraMartinoNote = ["fa", "sol", "la", "fa", "fa", "sol", "la", "fa", "la", "si", "do5", "la", "si", "do5"]

function tutorial(arraySuona){
    var fraMartino = [[349.23, 4], [392.0, 4], [440.0, 4], [349.23, 4], [349.23, 4], [392.0, 4], [440.0, 4], [349.23, 4], [440.0, 4], [493.88, 4], [523.25, 2], [440.0, 4], [493.88, 4], [523.25, 2] ];
    window.parent.context.clearRect(0, 0, window.parent.canvas.width, window.parent.canvas.height); // pulisce la canvas

    for(var i=20; i<120; i=i+20){
      window.parent.context.moveTo(0, i);
      window.parent.context.lineTo(window.parent.canvas.width, i);
    }

    for (i = 0; i < fraMartino.length; i++) {
      var img = document.getElementById(periodo[fraMartino[i][1].toString()]);
      var k = note[fraMartino[i][0].toString()];
      if (fraMartino[i][1] == 1) {
        k = note[fraMartino[i][0].toString()] - 36;
      }
      window.parent.context.drawImage(img, 30*i, 76-k, img.width, img.height);

      window.parent.context.font = "10px Arial";
      window.parent.context.fillText(fraMartinoNote[i], 30*i, 120);
    }

    // for (i = 0; i < fraMartino.length; i++) {
    //   var k = note[fraMartino[i][0].toString()];
    //   window.parent.context.rect(30*i, 110-k, 15, 15);
    //   window.parent.context.fillStyle = 'black';
    //   window.parent.context.fill();
    // }

    window.parent.context.stroke();
}


function matchExact(r, str) {
   var match = str.match(r);
   return match !== null && str == match[0];
}

$(window).load(function(){
  $("#textareaDUE").keyup(function() {
    window.parent.glob3 = []
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
              if (tail[i]=="]"){
                endRipeti = i;
                break
              }
            }
            var ripeti = tail.substring(startRipeti+1,endRipeti)
            var temp = ripeti.split("-")
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


              if (temp[0].indexOf("[")!= -1){
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

            if (tail[startRipeti+1] != "(" || tail[endRipeti] != ")"){
              booleano = false
              break
            }

            var ripeti = tail.substring(startRipeti+2,endRipeti)
            var temp = ripeti.split(",")
            var frequenza
            var durata

            console.log("tailFOR ", ripeti)
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

              var secondoSplit = temp[1].split("/")
              var numeratore = parseInt(secondoSplit[0])
              if (secondoSplit.length < 2){
                booleano = false
                break
              }
              secondoSplit[1] = secondoSplit[1].replace( /[\s]/, '@' )
              //console.log("controllo denominatore ", secondoSplit[1])
              secondoSplit[1] = secondoSplit[1].replace(/[\s]/g, '' )
              //console.log("controllo denominatore ", secondoSplit[1])
              terzoSplit = secondoSplit[1].split("@")
              console.log("controllo denominatore ", terzoSplit)
              var denominatore = parseInt(terzoSplit[0])
              if (terzoSplit.length > 1 && terzoSplit[1] !== "t" && terzoSplit[1] !== ""){
                booleano = false
                break
              }

              if (isNaN(numeratore) || isNaN(denominatore) || denominatore==0){
                booleano = false
                break
              } else {
                durata = numeratore/denominatore
              }

            }

            tail = tail.substring(0,startRipeti -1) + tail.substring(endRipeti+1,tail.length)
            suona.push([frequenza,durata])

            if (tail.indexOf("#") == -1){
              tail = tail.replace(/[\s]/g, '' )
              console.log("tail uscita ", tail)
              if (tail.length > 0){
                console.log("tail uscita ", tail.length)
                booleano = false
                break
              }
            }

          }

          if (suona.length == 0) booleano = false
          else  {
            console.log("SUONA ", suona.length)
            window.parent.glob3 = suona
            tutorial(suona);
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



  });
});
