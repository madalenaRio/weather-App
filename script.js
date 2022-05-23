
import { ApiKey } from "./config.js";


let lon = -9.1365919;
let lat = 38.7077507;
const key = ApiKey;

const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.getElementById("msg")
const cityName = "Lisbon";
const countryCode = "PT";

const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

let inputVal = input.value;


document.getElementById("form").addEventListener("submit", function(e){
    if(!inputVal){
        e.preventDefault();    //stop form from submitting  
    }
    getWeather() //do whatever and submit the form

});

console.log ("is this weather thing working?");


const getWeather = () => {
    
    fetch(urlWeather)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(data => {
            const { main, name, sys, weather } = data;
            const cityCard = document.getElementById("cityCard");
            const tempParagraph = document.createElement("p");
            tempParagraph.innerText = main.temp;
            cityCard.append(tempParagraph);

        })
        
        .catch(err => console.log(err))

}

const getCoordinates = () => {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${key}`)
        .then(response => response.json())
        //.then(response => console.log(response))
        .catch(err => console.log(err))

}

getCoordinates()

