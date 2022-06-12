/* Global Variables */
const generateButton =document.getElementById('generate');
const inputZip = document.getElementById('zip');

//Acquire API credentials from OpenWeatherMap website
const myApiKey = '7126423451f3d036aa111f06262da2ee&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked
generateButton.addEventListener('click', weatherToday);
//async function that uses fetch to make a GET request to the OpenWeatherMap API.
async function weatherToday(){
    const urlToBeFetched = `https://api.openweathermap.org/data/2.5/weather?zip=${inputZip.value}&appid=${myApiKey}`
    const enterFeeling = document.getElementById('feelings').value;
    console.log(enterFeeling);
    const result = await fetch(urlToBeFetched);
    try{
        const weatherDetails = await result.json();
        const main_temp = await weatherDetails.main.temp;
        let temp = Math.round(main_temp);
        console.log(temp);
   
    //Promise that makes a POST request to add the API data, as well as data entered by the user, to your app
    await fetch('/newWeather',
    {method:'POST',credentionals:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({newDate,temp,enterFeeling})
    })
    //Promise that updates the UI dynamically Write another async function
    const success =await fetch('/all').then (res=>res.json());
    console.log(success)
    document.getElementById('date').innerHTML= "Date: "+ success.date;
    document.getElementById('content').innerHTML="I feel: "+ success.feelings;
    document.getElementById('temp').innerHTML= "Temperature: " +success.temp +"&deg;"+"  degrees";
}
catch(err){
    console.log('Oops! There is an error ',err);
   }
}
