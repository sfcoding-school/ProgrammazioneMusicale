function matchExact(r, str) {
   var match = str.match(r);
   return match !== null && str == match[0];
}

$(window).load(function(){
  $("#textareaUNO").keyup(function() {

    var $this = $(this);
    var booleano = true;
    var head = "";
    var tail = (this.value);
    var suona = [];

    tail.toLowerCase();
    tail = tail.replace(/ripeti/g,"@");

    while (tail.indexOf("@")!= -1){
      var startRipeti = tail.lastIndexOf("@");
      var endRipeti;
      var toAdd = "";
      for (var i = startRipeti; i < tail.length; i++) {
        if (tail[i]==")"){
          endRipeti = i;
          break;
        }
      }
      var ripeti = tail.substring(startRipeti+1,endRipeti);
      var temp = ripeti.split(",");
      var iterator;

      if (temp.length != 2){
        booleano = false;
        break;
      } else {
        temp[1] = temp[1].replace( /[^\d.]/g, '' );
        iterator = parseInt(temp[1]);
        if (isNaN(iterator)){
          booleano = false;
          break;
        }

        if (temp[0].indexOf("(")!= -1){
          temp[0] = temp[0].replace("("," ");
          temp[0] = temp[0] + " ";
        } else {
          booleano = false;
          break;
        }
      }

      for (i = 0; i < iterator; i++){
        toAdd += temp[0];
      }
      tail = tail.substring(0,startRipeti -1) + toAdd + tail.substring(endRipeti+1,tail.length);
    }

    while (tail.length >= 0 ){ // while(true)

      var temp1 = tail.substring(0,1);
      if (temp1 != " " && temp1 !== ""){
        head = head + temp1;
      }
      else if (head !== ""){
        //parse HEAD
        parsed = head.replace("_","");
        tono = parseInt(parsed.replace( /[^\d.]/g, ''));
        parsed = parsed.replace( /[0-9]/g, '');

        if (matchExact("do|re|mi|fa|sol|la|si", parsed)) {
          if (isNaN(tono)){
            parsed = parsed + "_5";
          } else if (tono > 0 && tono < 7){
            parsed = parsed + "_" + tono;
          } else {
            booleano = false;
            break;
          }
          suona.push(parsed);

        } else if (parsed == "pausa"){
          suona.push(parsed);
        }else {
          booleano = false;
          break;
        }
        head = "";
      }
      if(tail.length === 0) break;
      tail = tail.substring(1,tail.length);
    }

    window.parent.glob2 = suona;
  });
});
