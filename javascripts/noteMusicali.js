function simHertzRunTime(noteList) {

    var tempoGlobale = document.getElementById('content1').contentWindow.document.getElementById('idTextAreaDurata').value;
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
      var i = 0;
      while (i< wave.header.sampleRate * s) {
        var t = i/wave.header.sampleRate;
        data.push(128+Math.round(127*Math.sin(hz*t*2*Math.PI)))
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
      while (i< wave.header.sampleRate * s) {
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
   9     7    5    4     2    0     -2
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

  function frequencyToNote(y){
    var number = Math.round(40 - 17.3123 * Math.log(4434.92/y));
    var note = ["si", "", "la", "", "sol", "", "fa", "mi", "", "re", "", "do"];
    var i = 0;
    while (i < note.length) {
      // cerco, dato l'esponente, di ricavare quale nota sia.
      // Il "-2" è dato dal fatto che l'esponente minore in
      // scala 4 parte da -2 (vedi commento sopra)
      // quindi i-2 è l'esponente da provare
      if ((number+i-2)%12 === 0) {
        return note[i];
      }
      i++;
    }
    return "Non conosco la nota";
  }
