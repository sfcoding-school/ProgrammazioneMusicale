var wave = new RIFFWAVE();
wave.header.sampleRate = 44100; // Set sample rate to 44KHz
wave.header.numChannels = 1;

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -9)));
  var Do_4 = C_4 = new Audio(wave.dataURI); //C_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -7)));
  var Re_4 = D_4 = new Audio(wave.dataURI); //D_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -5)));
  var Mi_4 = E_4 = new Audio(wave.dataURI); //E_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -4)));
  var Fa_4 = F_4 = new Audio(wave.dataURI); //F_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -2)));
  var Sol_4 = G_4 = new Audio(wave.dataURI); //G_4
  
  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 0)));
  var La_4 = A_4 = new Audio(wave.dataURI); //A_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), -1)));
  var La_b_4 = A_b_4 = new Audio(wave.dataURI); //Ab4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 1)));
  var Si_b_4 = B_b_4 = A_s_4 = new Audio(wave.dataURI); //B_b_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 2)));
  var Si_4 = B_4 = new Audio(wave.dataURI); //B_4

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 3)));
  var Do_5 = C_5 = new Audio(wave.dataURI); //C_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 4)));
  var Do_s_5 = C_s_5 = D_b_5 = new Audio(wave.dataURI); //C_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 5)));
  var Re_5 = D_5 = new Audio(wave.dataURI); //C_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 7)));
  var Mi_5 = E_5 = new Audio(wave.dataURI); //E_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 8)));
  var Fa_5 = F_5 = new Audio(wave.dataURI); //E_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 9)));
  var Fa_s_5 = F_s_5 = new Audio(wave.dataURI); 

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 10)));
  var Sol_5 = G_5 = new Audio(wave.dataURI); //G_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 12)));
  var La_5 = A_5 = new Audio(wave.dataURI); //A_5

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 15)));
  var Do_6 = C_6 = new Audio(wave.dataURI); //C_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 16)));
  var Re_s_6 = C_s_6 = new Audio(wave.dataURI); //c_s_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 17)));
  var Re_6 = D_6 = new Audio(wave.dataURI); //D_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 18)));
  var Mi_b_6 = E_b_6 = new Audio(wave.dataURI); //E_b_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 19)));
  var Mi_6 = E_6 = new Audio(wave.dataURI); //E_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 20)));
  var Fa_6 = F_6 = new Audio(wave.dataURI); //F_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 21)));
  var Sol_b_6 = G_b_6 = new Audio(wave.dataURI); //G_b_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 22)));
  var Sol_6 = G_6 = new Audio(wave.dataURI); //G_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 24)));
  var La_6 = new Audio(wave.dataURI); //A_6

  wave.Make(makeListWave(440.0*Math.pow(Math.pow(2, 1.0/12), 26)));
  var Si_6 = B_6 = new Audio(wave.dataURI); //B_6

  wave.Make(makeListWave(0, 150));
  var pausa = new Audio(wave.dataURI);

  function makeListWave(hertz, giri){
    giri = typeof giri !== 'undefined' ? giri : 5000;
    var data = [];
    var i = 0;
    while (i<5000) { // la grandezza determina la durata
      var t = i/wave.header.sampleRate;
      data[i++] = 128+Math.round(127*Math.sin(hertz*t*2*Math.PI));
    }
    return data;
  }

  var dictionaryParser = {
    "do_4": Do_4,
    "la_4": La_4,
    "si_4": Si_4,
    "re_4": Re_4,
    "mi_4": Mi_4,
    "fa_4": Fa_4,
    "la_4": La_4,
    "si_4": Si_4,
    "do_5": Do_5,
    "re_5": Re_5,
    "mi_5": Mi_5,
    "fa_5": Fa_5,
    "la_5": La_5,
    "do_6": Do_6,
    "re_6": Re_6,
    "mi_6": Mi_6,
    "fa_6": Fa_6,
    "la_6": La_6,
    "si_6": Si_6,
    "sol_6": Sol_6, 
    "sol_4": Sol_4, 
    "sol_5": Sol_5, 
    "sol_b_6": Sol_b_6, 
    "do_s_5": Do_s_5,
    "re_s_6": Re_s_6,
    "mi_b_6": Mi_b_6,
    "fa_s_5": Fa_s_5,
    "la_b_4": La_b_4,
    "si_b_4": Si_b_4,
    "pausa": pausa
  }