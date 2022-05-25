
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
    const weatherData = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}&only_current={true}`)
    .then(response => response.json())
        .then (data => {
           
            const { current, timezone } = data;
            const cityCard = document.getElementById("cityCard");
            const icon = document.createElement("img")
            const weatherCondParagraph = document.createElement("p");
            const tempParagraph = document.createElement("p");
            const feelsLikeParagraph = document.createElement("p");
            const countryParagraph = document.createElement("p");
            const cloudsParagraph = document.createElement("p")
            icon.src = "http://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png";
            weatherCondParagraph.innerText = "Weather condition = " + current.weather[0].description;
            tempParagraph.innerText = "Temperature = " + Math.round(current.temp) + " ºC";
            feelsLikeParagraph.innerText = "Feels like = " + Math.round(current.feels_like) + " ºC";
            countryParagraph.innerText = "Country = " + timezone;
            cloudsParagraph.innerText = "Clouds = " + current.clouds + "%";
            cityCard.append(icon);
            cityCard.append(weatherCondParagraph);
            cityCard.append(tempParagraph);
            cityCard.append(feelsLikeParagraph);
            cityCard.append(countryParagraph);
            cityCard.append(cloudsParagraph);
        })
        .catch(err => console.log(err))
   console.log(Data);
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
