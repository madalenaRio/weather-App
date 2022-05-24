
import { ApiKey } from "./config.js";
let lon;
let lat;
const key = ApiKey;

const form = document.querySelector("form");
const input = document.getElementById("input");
const msg = document.getElementById("msg")


//const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

const executeForm = (e) => {
    // get the value from input textbox
    e.preventDefault(); 
    let inputVal = input.value;
    // get coordinates from input
    getCoordinates(inputVal);
    waitOrder();
    getWeather();    
    console.log(inputVal);   
}

form.addEventListener("submit", executeForm);

const getWeather = () => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(data => {
            const { main, name, sys, weather } = data;
            const cityCard = document.getElementById("cityCard");
            const tempParagraph = document.createElement("p");
            const feelsLikeParagraph = document.createElement("p");
            const countryParagraph = document.createElement("p");
            const cityNameParagraph = document.createElement("p");
            tempParagraph.innerText = main.temp;
            feelsLikeParagraph.innerText = main.feels_like;
            countryParagraph.innerText = sys.country;
            cityNameParagraph.innerText = name;
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
            lat = data[0].lat;
            lon = data[0].lon;

            console.log(data[0].lat);
            console.log(data[0].lon);
        })
        .catch(err => console.log(err))

}

const waitOrder = async () => {
    const response = await fetch()
    const weatherData = await response.json();
    return weatherData;
}

