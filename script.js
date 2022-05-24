
import { ApiKey } from "./config.js";
let lon;
let lat;
let cityName;
const key = ApiKey;

const form = document.querySelector("form");
const input = document.getElementById("input");
const msg = document.getElementById("msg")


const executeForm = (e) => {
    // get the value from input textbox
    e.preventDefault(); 
    cityName = input.value;
    // get coordinates from input
    getCoordinates(cityName);
    console.log(getCoordinates + "inside executeform");
    //getWeather();
    console.log(getWeather() + "inside executeform");
}

form.addEventListener("submit", executeForm);

const getWeather = async () => { 
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
    .then(response = await response.json();
        then (response => console.log(response + "is this working"))
        // then(data => {
            // const { main, name, sys, weather } = data
            // const cityCard = document.getElementById("cityCard");
            // const tempParagraph = document.createElement("p");
            // const feelsLikeParagraph = document.createElement("p");
            // const countryParagraph = document.createElement("p");
            // const cityNameParagraph = document.createElement("p");
            // tempParagraph.innerText = main.temp;
            // feelsLikeParagraph.innerText = main.feels_like;
            // countryParagraph.innerText = sys.country;
            // cityNameParagraph.innerText = name;
            // cityCard.append(tempParagraph);
            // cityCard.append(feelsLikeParagraph);
            // cityCard.append(countryParagraph);
            // cityCard.append(cityNameParagraph);
        // })
        .catch(err => console.log(err))
        
}

const getCoordinates = (lat, lon) => {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            lat = data[0].lat;
            lon = data[0].lon;

            console.log(data[0].lat + "this one is working");
            console.log(data[0].lon + "I guess this one too");
        })
        .catch(err => console.log(err))

}

// const waitOrder = async () => {
//     const data = await getCoordinates();
    
//     return data;
// }

