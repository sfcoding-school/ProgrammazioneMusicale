
  // function makeListWave(hertz, giri){
  //   giri = typeof giri !== 'undefined' ? giri : 5000;
  //   var data = [];
  //   var i = 0;
  //   while (i<5000) { // la grandezza determina la durata .. sarebbe da metterci la variabile giri
  //     var t = i/wave.header.sampleRate;
  //     data[i++] = 128+Math.round(127*Math.sin(hertz*t*2*Math.PI));
  //   }
  //   return data;
  // }


//   $(window).load(function(){
//   $("#idTextAreaDurata").keyup(function() {
//         var $this = $(this);
//         var temp = (this.value)
//         temp = parseInt(temp)
//         if (!isNaN(temp)){
//           window.globDurata = parseFloat(temp);
//           console.log("ho cambiato t")
//         }else {
//           window.glob = false
//         }
//
//   });
// });




  function simHertzRunTime(noteList) {

    var tempoGlobale = document.getElementById('idTextAreaDurata').value;
    console.log("tempoGlobale " + tempoGlobale);
    console.log(noteList);
    var audio = new Audio();
    var wave = new RIFFWAVE();
    wave.header.sampleRate = 44100;

      // Set sample rate to 44KHz  In digital audio, 44,100 Hz
      //(alternately represented as 44.1 kHz) is a common sampling frequency. Analog audio is recorded by
      //sampling it 44,100 times per second, and then these samples are used to reconstruct the audio signal when playing it back.

    wave.header.numChannels = 1;
    var data = [];
    for (var j = 0; j < noteList.length; j++) {
      hz = noteList[j][0];
      s = noteList[j][1] * tempoGlobale;
      s_prec = 0;
      if (j !== 0) s_prec = noteList[j-1][1]*tempoGlobale;
      var i = 0;
      while (i< wave.header.sampleRate * s) { // la grandezza determina la durata .. la formula giusta dovrebbe essere wave.header.sampleRate * s
        var t = i/wave.header.sampleRate;
        data[(wave.header.sampleRate * s_prec * j) + i] = 128+Math.round(127*Math.sin(hz*t*2*Math.PI)); // 127 è l'ampiezza del segnale
        i++;
      }
    }

      wave.Make(data);
      audio.src = wave.dataURI;
      return audio;

  }

  function simHertz(hz, s) {
      s = typeof s !== 'undefined' ? s : 0.2; //default 0.2
      var audio = new Audio();
      var wave = new RIFFWAVE();
      wave.header.sampleRate = 44100; // Set sample rate to 44KHz  In digital audio, 44,100 Hz
      //(alternately represented as 44.1 kHz) is a common sampling frequency. Analog audio is recorded by
      //sampling it 44,100 times per second, and then these samples are used to reconstruct the audio signal when playing it back.
      wave.header.numChannels = 1;
      var data = [];

      var i = 0;
      while (i< wave.header.sampleRate * s) { // la grandezza determina la durata .. la formula giusta dovrebbe essere wave.header.sampleRate * s
        var t = i/wave.header.sampleRate;
        data[i++] = 128+Math.round(127*Math.sin(hz*t*2*Math.PI)); // 127 è l'ampiezza del segnale
      }

      wave.Make(data);
      audio.src = wave.dataURI;
      return audio;
  }

  /*
   do · re · mi · fa · sol · la · si
   C     D    E    F     G    A     B
  */
  var dictionaryParser = {
    "do_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -9)),
    "re_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -7)),
    "mi_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -5)),
    "fa_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -4)),
    "sol_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -2)),
    "#sol_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -1)),
    "la_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 0)),
    "#la_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 1)),
    "si_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 2)),
    "do_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 3)),
    "#do_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 4)),
    "re_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 5)),
    "mi_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 7)),
    "fa_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 8)),
    "#fa_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 9)),
    "sol_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 10)),
    "la_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 12)),
    "do_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 15)),
    "#do_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 16)),
    "re_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 17)),
    "#re_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 18)),
    "mi_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 19)),
    "fa_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 20)),
    "sol_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 22)),
    "la_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 24)),
    "si_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 26)),
    "pausa": simHertz(0, 0.0001)
  };

// var mario = "mi5 mi5 mi5 do5 mi5 sol5 pausa sol pausa do5 pausa sol pausa mi pausa la si #sol la pausa sol mi5 sol5 la5 fa5 sol5 mi5 do5 re5 si do5 pausa sol pausa mi la si #sol la pausa sol mi5 sol5 la5 fa5 sol5 mi5 do5 re5 si pausa sol5 \#fa5 fa5 re5 mi5 #sol la do5 pausa la do5 re5 sol5 \#fa5 fa5 re5 mi5 do6 do6 do6 pausa sol5 \#fa5  fa5 re5 mi5 #sol la do5 pausa la do5 re5 pausa  #do5 re5 pausa do5 pausa do5 do5 do5 do5 re5 mi5 do5 la sol pausa do5 do5 do5 do5 re5 mi5 pausa do5 do5 do5 do5 re5 mi5 do5 la sol mi5 mi5 mi5 do5 sol5 pausa sol mi5 do5";
var mario = "mi5 mi5 mi5 do5 mi5 sol5 pausa sol pausa do5 pausa sol pausa mi pausa la si #sol la pausa sol mi5 sol5 la5 fa5 sol5 mi5 do5 re5 si do5 pausa sol pausa mi la si #sol la pausa";
