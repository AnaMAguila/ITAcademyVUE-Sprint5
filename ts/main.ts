interface interfAcudits {
    joke : string;
    score : number;
    date : string;
};

//Array que almacena los datos de la interface
const reportAcudits : interfAcudits[] = []; 

//Para conservar el chiste sin ""
let acuditNet : string = ``;

const textAcudit = document.querySelector(`.textAcudit`) as HTMLElement;
const btnAcudit = document.querySelector(`.btnAcudit`) as HTMLElement;
const divValoracio = document.querySelector(`.valoracio`) as HTMLElement;
const divTemps = document.querySelector(`.temps`) as HTMLElement;

// Oculta botones valoración si no hay chiste
divValoracio.style.display = `none`;

// API Weather
fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/barcelona?unitGroup=metric&key=TBHYF4EG4ZALQ78K35FVM4TCT&contentType=json", {
  method: 'GET', 
  headers: {},           
}).then(response => {
  if (!response.ok) throw response;        
  return response.json();
}).then(response => {
  processWeatherData(response);
});

// Muestra el tiempo
function processWeatherData(response : any) {  
    var days=response.days[0];
    divTemps.innerHTML = days.description;
}

// API Jokes
async function mostraAcudit() {
    const acuditsAPI = await fetch(`https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPI.json();
    
    divValoracio.style.display = `block`;

    //console.log(acuditObj.joke);

    acuditNet = acuditObj.joke;
    textAcudit.innerHTML = `" ${acuditNet} "`;
}

// API Jokes de Chuck Norris
async function mostraAcuditChuck() {
    const acuditsAPIChuck = await fetch(`https://api.chucknorris.io/jokes/random`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPIChuck.json();
    divValoracio.style.display = `block`;
    
    acuditNet = acuditObj.value;
    textAcudit.innerHTML = `" ${acuditNet} "`;
}

// Genera un número aleatorio para mostrar los chistes
function acuditAleatori(){
    const numAleatori : number = Math.floor(Math.random()*2);
    (numAleatori%2==0) ?  mostraAcudit() : mostraAcuditChuck(); 
}

btnAcudit.addEventListener(`click`, acuditAleatori);

function valoracio(nota : number) {
    let resultat: interfAcudits = {
        joke : acuditNet,
        score: nota,
        date: new Date().toISOString()
    };

    // Muestra la nota del chiste por consola
    //console.log("Score: ", nota);

    //Comprobar si el chiste existe y crearlo o modificar la nota
    const foundIndex = reportAcudits.findIndex(element => element.joke === acuditNet);    
    (foundIndex == -1) ? reportAcudits.push(resultat) : reportAcudits[foundIndex]=resultat; 

    //Muestra por consola el array de chistes con su última valoración
    console.log(reportAcudits);
}