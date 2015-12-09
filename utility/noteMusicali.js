
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

  function simHertz(hz) {
      var audio = new Audio();
      var wave = new RIFFWAVE();
      wave.header.sampleRate = 44100; // Set sample rate to 44KHz
      wave.header.numChannels = 1;
      var data = [];

      var i = 0;
      while (i<8000) { // la grandezza determina la durata .. la formula giusta dovrebbe essere wave.header.sampleRate * s
        var t = i/wave.header.sampleRate;
        data[i++] = 128+Math.round(127*Math.sin(hz*t*2*Math.PI));
      }

      wave.Make(data);
      audio.src = wave.dataURI;
      return audio;
  }

  var dictionaryParser = {
    "do_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -9)),
    "re_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -7)),
    "mi_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -5)),
    "fa_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -4)),
    "sol_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -2)),
    "la_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 0)),
    "si_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 2)),
    "do_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 3)),
    "re_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 5)),
    "mi_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 7)),
    "fa_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 8)),
    "sol_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 10)),
    "la_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 12)),
    "do_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 15)),
    "re_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 17)),
    "mi_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 19)),
    "fa_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 20)),
    "sol_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 22)),
    "la_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 24)),
    "si_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 26)),
    "do_s_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 4)),
    "re_s_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 16)),
    "mi_b_6": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 18)),
    "fa_s_5": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 9)),
    "la_b_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), -1)),
    "si_b_4": simHertz(440.0*Math.pow(Math.pow(2, 1.0/12), 1)),
    "pausa": simHertz(0)
  };
