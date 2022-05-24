
import { ApiKey } from "./config.js";
let lon;
let lat;
let cityName;
const key = ApiKey;

const button = document.getElementById("button")
const input = document.getElementById("input");
const msg = document.getElementById("msg")

const executeForm = () => {
    // get the value from input text
    cityName = input.value;
    console.log(cityName)
    // get coordinates from input
    getCoordinates(cityName);
    //getWeather();
   

}

const getWeather = (lat, lon) => { 
    const weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
    .then(response => response.json())
        .then (data => {
           
            const { main, name, sys, weather } = data
            const cityCard = document.getElementById("cityCard");
            const weatherCondParagraph = document.createElement("p");
            const tempParagraph = document.createElement("p");
            const feelsLikeParagraph = document.createElement("p");
            const countryParagraph = document.createElement("p");
            const cityNameParagraph = document.createElement("p");
            weatherCondParagraph.innerText = "Weather condition = " + weather.description;
            tempParagraph.innerText = "Temperature = " + main.temp;
            feelsLikeParagraph.innerText = "Feels like = " + main.feels_like;
            countryParagraph.innerText = "Country = " + sys.country;
            cityNameParagraph.innerText = "City location measurement = " + name;
            cityCard.append(weatherCondParagraph);
            cityCard.append(tempParagraph);
            cityCard.append(feelsLikeParagraph);
            cityCard.append(countryParagraph);
            cityCard.append(cityNameParagraph);
        })
        .catch(err => console.log(err))
   
}

const getCoordinates = (cityName) => {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(lat, lon)
            getWeather(lat, lon)
        })
        .catch(err => console.log(err))
}

button.addEventListener("click", executeForm);
