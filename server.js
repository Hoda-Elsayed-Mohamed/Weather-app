// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')

// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
app.listen (port, ()=>{
    // testing if our server is working.
    console.log(`Server is running.
     It's alive on http://localhost:${port}`)
});
//Add a GET route that returns the projectData object in server code 
app.get('/all', (req, res)=>{
    res.send(projectData);
});
//add a POST route that adds incoming data to projectData
app.post('/newWeather', (req, res)=>{
    projectData.date = req.body.newDate;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.enterFeeling;
    console.log(req.body)
    res.end();
});