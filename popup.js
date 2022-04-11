// Initialize button with user's preferred color
let changeColor = document.getElementById("button");

//chrome.storage.sync.get("color", ({ color }) => {
  //changeColor.style.backgroundColor = color;
//});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

  //const getUnicodeAsHex = (c) => {
    //return c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')
  //};

  const escapeRegexExpChars = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

  const translations = {
    "este documento es solamente informativo y carece de cualquier valid\u00E9z oficial": {
      "global": ""
    },
    "../../": {
      "global": "https://www.saes.upiita.ipn.mx/"
    },
    'style="height:400px;overflow-y:scroll;"': {
      "global": ""
    },
    "ING. EN SIS. COMPUTACIONALES": {
      "en": "computer systems engineering"
    },
    "INGENIERIA MECATR\u00D3NICA": {
      "en": "mechatronics engineering"
    },
    "semestre": {
      "en": "level"
    },
    "primer": {
      "en": "first"
    },
    "segundo": {
      "en": "second"
    },
    "tercer": {
      "en": "third"
    },
    "cuarto": {
      "en": "fourth"
    },
    "quinto": {
      "en": "fifth"
    },
    "clave": {
      "en": "code"
    },
    "fecha": {
      "en": "date"
    },
    "periodo": {
      "en": "period"
    },
    "forma eval.": {
      "en": "type"
    },
    "calificacion": {
      "en": "grade"
    },
    "jun": {
      "en": "jun"
    },
    "ago": {
      "en": "aug"
    },
    "dic": {
      "en": "dec"
    },
    "ene": {
      "en": "jan"
    },
    "feb": {
      "en": "feb"
    },
    "boleta": {
      "en": "student id"
    },
    "plan": {
      "en": "plan"
    },
    "nombre": {
      "en": "full name"
    },
    "carrera": {
      "en": "career"
    },
    "promedio": {
      "en": "average"
    },

    // ISC - ESCOM
    "ANALISIS VECTORIAL": {
      "en": "vector analysis"
    },
    "MATEMATICAS DISCRETAS": {
      "en": "discrete mathematics"
    },
    "ALGORITMIA Y PROGRAMACION ESTRUCTURADA": {
      "en": "algorithms and structured programming"
    },
    "FISICA": {
      "en": "physics"
    },
    "INGENIERIA ETICA Y SOCIEDAD": {
      "en": "ethical engineering and society"
    },
    "ECUACIONES DIFERENCIALES": {
      "en": "differential equations"
    },
    // "ALGEBRA LINEAL": {
    //   "en": "linear algebra"
    // },
    "CALCULO APLICADO": {
      "en": "applied calculus"
    },
    // "CALCULO": {
    //   "en": "calculus"
    // },
    "ESTRUCTURAS DE DATOS": {
      "en": "data structures"
    },
    "COMUNICACION ORAL Y ESCRITA": {
      "en": "written and oral expression"
    },
    "ANALISIS FUNDAMENTAL DE CIRCUITOS": {
      "en": "fundamental circuit analysis"
    },
    "MATEMATICAS AVANZADAS PARA LA INGENIERIA": {
      "en": "ADVANCED MATHEMATICS FOR ENGINEERING"
    },
    "FUNDAMENTOS ECONOMICOS": {
      "en": "ECONOMICS FUNDAMENTALS"
    },
    "FUNDAMENTOS DE DISE\u00D1O DIGITAL": {
      "en": "DIGITAL DESIGN FUNDAMENTALS"
    },
    "TEORIA COMPUTACIONAL": {
      "en": "COMPUTATIONAL THEORY"
    },
    "BASES DE DATOS": {
      "en": "DATABASES"
    },
    "PROGRAMACION ORIENTADA A OBJETOS": {
      "en": "OBJECT-ORIENTED PROGRAMMING"
    },
    "ELECTRONICA ANALOGICA": {
      "en": "ANALOGIC ELECTRONICS"
    },
    "REDES DE COMPUTADORAS": {
      "en": "COMPUTER NETWORKS"
    },
    "DISE\u00D1O DE SISTEMAS DIGITALES": {
      "en": "DIGITAL SYSTEMS DESIGN"
    },
    // "PROBABILIDAD Y ESTADISTICA": {
    //   "en": "PROBABILITY AND STATISTICS"
    // },
    "SISTEMAS OPERATIVOS": {
      "en": "OPERATIVE SYSTEMS"
    },
    "ANALISIS Y DISE\u00D1O ORIENTADO A OBJETOS": {
      "en": "OBJECT ORIENTED ANALYSIS AND DESIGN"
    },
    "TECNOLOGIAS PARA LA WEB": {
      "en": "WEB TECHNOLOGIES"
    },
    "ADMINISTRACION FINANCIERA": {
      "en": "FINANCIAL ADMINISTRATION"
    },
    "ARQUITECTURA DE COMPUTADORAS": {
      "en": "COMPUTER ARCHITECTURE"
    },
    "COMPILADORES": {
      "en": "COMPILERS"
    },
    "INGENIERIA DE SOFTWARE": {
      "en": "SOFTWARE ENGINEERING"
    },
    "ADMINISTRACION DE PROYECTOS": {
      "en": "PROJECT ADMINISTRATION"
    },
    // "INSTRUMENTACION": {
    //   "en": "INSTRUMENTATION"
    // },
    "TEORIA DE COMUNICACIONES Y SE\u00D1ALES": {
      "en": "COMMUNICATION AND SIGNAL THEORY"
    },
    "APLICACIONES PARA COMUNICACIONES EN RED": {
      "en": "APPLICATIONS FOR NETWORK COMMUNICATIONS"
    },
    "INTRODUCCION A LOS MICROCONTROLADORES": {
      "en": "INTRODUCTION TO MICROCONTROLLERS"
    },
    "ANALISIS DE ALGORITMOS": {
      "en": "ALGORITHMS ANALYSIS"
    },
    "METODOS CUANTITATIVOS PARA LA TOMA DE DECISIONES": {
      "en": "QUANTITATIVE METHODS FOR DECISION MAKING"
    },
    "GESTION EMPRESARIAL": {
      "en": "BUSINESS MANAGEMENT"
    },
    "TRABAJO TERMINAL I": {
      "en": "TERMINAL PROJECT I"
    },
    "LIDERAZGO Y DESARROLLO PROFESIONAL": {
      "en": "LEADERSHIP AND PROFESSIONAL DEVELOPMENT"
    },
    "ADMINISTRACION DE SERVICIOS EN RED": {
      "en": "NETWORK SERVICES MANAGEMENT"
    },
    "DESARROLLO DE SISTEMAS DISTRIBUIDOS": {
      "en": "DEVELOPMENT OF DISTRIBUTED SYSTEMS"
    },
    // Mecatronica - upiita
    // 1st level
    "ALGEBRA LINEAL Y NUMEROS COMPLEJOS": {
      "en": "LINEAR ALGEBRA AND COMPLEX NUMBERS"
    },
    "ANALISIS Y DISE\u00D1O DE PROGRAMAS": {
      "en": "ANALYSIS AND DESIGN OF (COMPUTER) PROGRAMS"
    },
    "CALCULO DIFERENCIAL E INTEGRAL": {
      "en": "DIFFERENTIAL AND INTEGRAL CALCULUS"
    },
    "CALCULO VECTORIAL": {
      "en": "VECTORIAL CALCULUS"
    },
    "CIRCUITOS ELECTRICOS AVANZADOS": {
      "en": "ADVANCED ELECTRICAL CIRCUITS"
    },
    "CIRCUITOS ELECTRICOS": {
      "en": "ELECTRICAL CIRCUITS"
    },
    "DIBUJO ASISTIDO POR COMPUTADORA": {
      "en": "COMPUTER ASSISTED DESIGN"
    },
    // "ECUACIONES DIFERENCIALES": {
      //   "en": "DIFFERENTIAL EQUATIONS"
      // },
    "ELECTRICIDAD Y MAGNETISMO": {
      "en": "ELECTRICITY AND MAGNETISM"
    },
    "ESTRUCTURA Y PROPIEDADES DE LOS MATERIALES": {
      "en": "PROPERTIES AND STRUCTURE OF MATERIALS"
    },
    "COMUNICACION ORAL Y ESCRITA": {
      "en": "ORAL AND WRITTEN COMMUNICATION"
    },
    "FUNDAMENTOS DE ELECTRONICA": {
      "en": "FUNDAMENTALS OF ELECTRONICS"
    },
    "HERRAMIENTAS COMPUTACIONALES": {
      "en": "COMPUTATION TOOLS"
    },
    "INGLES I": {
      "en": "ENGLISH I"
    },
    "INGLES II": {
      "en": "ENGLISH II"
    },
    "INTRODUCCION A LA MECATRONICA": {
      "en": "INTRODUCTION TO MECHATRONICS"
    },
    "INTRODUCCION A LA PROGRAMACION": {
      "en": "INTRODUCTION TO PROGRAMMING"
    },
    "MECANICA DE LA PARTICULA": {
      "en": "PARTICLE MECHANICS"
    },
    "MECANICA DEL CUERPO RIGIDO": {
      "en": "RIGID BODY MECHANICS"
    },
    "PROCESO DE MANUFACTURA": {
      "en": "MANUFACTURING PROCESSES"
    },
    "RESISTENCIA DE MATERIALES": {
      "en": "RESISTANCE OF MATERIALS"
    },
    // 2nd level
    "ADMINISTRACION ORGANIZACIONAL": {
      "en": "ORGANIZATIONAL ADMINISTRATION"
    },
    "ANALISIS DE SE\u00D1ALES Y SISTEMAS": {
      "en": "ANALYSIS OF SIGNALS AND SYSTEMS"
    },
    "ANALISIS Y SINTESIS DE MECANISMOS": {
      "en": "ANALYSIS AND SYNTHESIS OF MECHANISMS"
    },
    "CIRCUITOS LOGICOS": {
      "en": "LOGIC CIRCUITS"
    },
    "DISE\u00D1O BASICO DE ELEMENTOS DE MAQUINAS": {
      "en": "BASIC DESIGN OF MACHINE ELEMENTS"
    },
    "DISPOSITIVOS LOGICOS PROGRAMABLES": {
      "en": "PROGRAMMABLE LOGIC DEVICES"
    },
    "ELECTRONICA ANALOGICA": {
      "en": "ANALOGIC ELECTRONICS"
    },
    "INGLES III": {
      "en": "ENGLISH III"
    },
    "MANTENIMIENTO Y SISTEMAS DE MANUFACTURA": {
      "en": "MAINTENANCE AND MANUFACTURING SYSTEMS"
    },
    "MAQUINAS ELECTRICAS": {
      "en": "ELECTRICAL MACHINES"
    },
    "MECANICA DE FLUIDOS": {
      "en": "FLUID MECHANICS"
    },
    "MICROPROCESADORES, MICROCONTROLADORES E INTERFAZ": {
      "en": "MICROCOPROCESSORS, MICROCONTROLLERS AND INTERFACES"
    },
    "NEUMATICA E HIDRAULICA": {
      "en": "PNEUMATICS AND HYDRAULICS"
    },
    "OSCILACIONES Y OPTICA": {
      "en": "OSCILLATIONS AND OPTICS"
    },
    "PROBABILIDAD Y ESTADISTICA PARA INGENIERIA": {
      "en": "PROBABILITY AND STATISTICS FOR ENGINEERING"
    },
    "PROGRAMACION AVANZADA": {
      "en": "ADVANCED PROGRAMMING"
    },
    "SENSORES Y ACONDICIONADORES DE SE\u00D1AL": {
      "en": "SENSORS AND SIGNAL CONDITIONING"
    },
    "SIMULACION ELECTRONICA Y DISE\u00D1O DE CIRCUITOS IMPRESOS": {
      "en": "ELECTRONIC SIMULATION AND PRINTED CIRCUIT DESIGN"
    },
    "SISTEMAS NEURODIFUSOS": {
      "en": "NEURO-FUZZY SYSTEMS"
    },
    "TEORIA ELECTROMAGNETICA": {
      "en": "ELETROMAGNETIC THEORY"
    },
    "TERMODINAMICA": {
      "en": "THERMODYNAMICS"
    },
    // 3RD LEVEL
    "CONTROL CLASICO": {
      "en": "CLASSIC CONTROL"
    },
    "ETICA PARA EL EJERCICIO PROFESIONAL": {
      "en": "ETHICS FOR THE PROFESSIONAL EXERCISE"
    },
    "MODELADO Y SIMULACION DE SISTEMAS MECATRONICOS": {
      "en": "MODELING AND SIMULATION OF MECHATRONIC SYSTEMS"
    },
    "AUTOMATIZACION INDUSTRIAL": {
      "en": "INDUSTRIAL AUTOMATION"
    },
    "DISE\u00D1O AVANZADO DE ELEMENTOS DE MAQUINAS": {
      "en": "ADVANCED DESIGN OF MACHINES"
    },
    "FINANZA E INGENIERIA ECONOMICA": {
      "en": "FINANCE AND ENGINEERING ECONOMICS"
    },
    "PROCESADOR DIGITAL DE SE\u00D1ALES": {
      "en": "DIGITAL SIGNAL PROCESSORS"
    },
    "PROYECTO INTEGRADOR": {
      "en": "INTEGRATOR PROJECT"
    },
    "AUTOMATAS INDUSTRIALES": {
      "en": "INDUSTRIAL AUTOMATAS"
    },
    "ELECTIVA I": {
      "en": "ELECTIVE I"
    },
    // 4TH LEVEL
    "CONTROL DE SISTEMAS MECATRONICOS": {
      "en": "CONTROL OF MECHATRONIC SYSTEMS"
    },
    "ELECTRONICA DE POTENCIA": {
      "en": "POWER ELECTRONICS"
    },
    "INGENIERIA ASISTIDA POR COMPUTADORA": {
      "en": "COMPUTER AIDED ENGINEERING"
    },
    "METODOLOGIA DE LA INVESTIGACION": {
      "en": "RESEARCH METHODOLOGY"
    },
    "PROYECTOS DE INVERSION": {
      "en": "INVESTMENT PROJECTS"
    },
    "SISTEMAS DE VISION ARTIFICIAL": {
      "en": "ARTIFICIAL VISION SYSTEMS"
    },
    "MERCADOTECNIA": {
      "en": "MARKETING"
    },
    "ELECTIVA II": {
      "en": "ELECTIVE II"
    },
    "INSTRUMENTACION VIRTUAL APLICADA": {
      "en": "APPLIED VIRTUAL INSTRUMENTATION"
    },
    "INSTRUMENTACION VIRTUAL": {
      "en": "VIRTUAL INSTRUMENTATION"
    },
    // 5TH LEVEL
    "CONTROL DE MAQUINAS ELECTRICAS": {
      "en": "CONTROL OF ELECTRICAL MACHINES"
    },
    "ELECTIVA III": {
      "en": "ELECTIVE III"
    },
    // buggy keys
    "materia": {
      "en": "course"
    },
  };

  const translate = (str, langCode) => {
    let ans = str;
    if (translations.hasOwnProperty(str)) {
      const langObj = translations[str];
      if (langObj.hasOwnProperty(langCode)) {
        ans = langObj[langCode];
      } else if (langObj.hasOwnProperty("global")) {
        ans = langObj["global"];
      } else {
        ans = undefined;
      }
    } else {
      ans = undefined;
    }
    return ans;
  };

  const container = document.getElementsByClassName("container")[0].innerHTML;
  const wordsToTranslate = Object.keys(translations);
  const wordsToTranslateEscaped = wordsToTranslate.map(word => escapeRegexExpChars(word));
  const regex = new RegExp(wordsToTranslateEscaped.join("|"), 'giu');
  const containerTranslated = container.replace(regex, (match) => {
    return (
      translate(match, "en") ??
      translate(match.toUpperCase(), "en") ??
      translate(match.toLowerCase(), "en") ??
      match
    ).toUpperCase();
  });
  var link = document.createElement('a');
  link.download = 'test.html';
  var blob = new Blob([containerTranslated], {type: 'text/html'});
  link.href = window.URL.createObjectURL(blob);
  link.click();
  //console.log(containerTranslated);
  //chrome.storage.sync.get("color", ({ color }) => {
    //document.body.style.backgroundColor = color;
  //});
}
