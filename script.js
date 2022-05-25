
import { ApiKey } from "./config.js";
let lon;
let lat;
let cityName;
const key = ApiKey;

const button = document.getElementById("button")
const input = document.getElementById("input");
const errorInputMessage = document.getElementById("msg");

const executeForm = () => {
    // get the value from input text
    cityName = input.value;
    console.log(cityName)
    // get coordinates from input
    getCoordinates(cityName);
}

// -----  trying to implemntent error message when user types same city twice  -----

// const executeForm = () => {
//     // get the value from input text
//     cityName = input.value;
//     //compare to existing ones if the same display error message
//     const CityCardlistItems = list.querySelectorAll(".cityCard .li");
//     const listItemsArray = Array.from(CityCardlistItems);

//     if (cityName.innerText === listItemsArray[4].innerText) {
//         errorInputMessage.textContent = "You got the weather for that already please search another city 😩";
//     } else {
//         // get coordinates from input
//         getCoordinates(cityName);
//     }
// }

const getWeather = (lat, lon) => {
    const weatherData = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}&only_current={true}`)
        .then(response => response.json())
        .then(data => {

            const { current, timezone } = data;
            const cityCard = document.getElementById("cityCard");
            const icon = document.createElement("img")
            const weatherCondParagraph = document.createElement("li");
            const tempParagraph = document.createElement("li");
            const feelsLikeParagraph = document.createElement("li");
            const countryParagraph = document.createElement("li");
            const cloudsParagraph = document.createElement("li");
            icon.src = "http://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png";
            weatherCondParagraph.innerText = "Weather condition = " + current.weather[0].description;
            tempParagraph.innerText = "Temperature = " + Math.round(current.temp) + " ºC";
            feelsLikeParagraph.innerText = "Feels like = " + Math.round(current.feels_like) + " ºC";
            countryParagraph.innerText = "Country and State = " + timezone;
            cloudsParagraph.innerText = "Clouds = " + current.clouds + "%";
            cityCard.append(icon);
            cityCard.append(weatherCondParagraph);
            cityCard.append(tempParagraph);
            cityCard.append(feelsLikeParagraph);
            cityCard.append(countryParagraph);
            cityCard.append(cloudsParagraph);
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
        .catch(() => {
            errorInputMessage.textContent = "Please search for a valid city 😩";
        });
}

button.addEventListener("click", executeForm);

