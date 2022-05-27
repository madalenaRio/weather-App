
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

// -----  trying to implement error message when user types same city twice  -----

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

            const cityCard = document.getElementById("cityCardContainer");
            const icon = document.createElement("img")
            icon.classList.add("img")
            icon.src = "https://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png"; 
            const tempParagraph = document.createElement("p");
            tempParagraph.innerText = Math.round(current.temp) + " ºC";
            // cityCardContainer.append(icon);
            // cityCardContainer.append(tempParagraph);
            const weatherList = document.createElement("ul");
            const weatherCondParagraph = document.createElement("li");
            const feelsLikeParagraph = document.createElement("li");
            const countryParagraph = document.createElement("li");
            const cloudsParagraph = document.createElement("li");
            const weatherContainer = createElement("div");
            weatherContainer.setAttribute("id","weatherContainer")
            weatherCondParagraph.innerText = "Weather: " + current.weather[0].description;
            feelsLikeParagraph.innerText = "Feels like: " + Math.round(current.feels_like) + " ºC";
            countryParagraph.innerText = "Location: " + timezone;
            cloudsParagraph.innerText = "Clouds: " + current.clouds + "%";
            weatherList.append(weatherCondParagraph);
            weatherList.append(feelsLikeParagraph);
            weatherList.append(countryParagraph);
            weatherList.append(cloudsParagraph);
            weatherContainer.append(icon)
            weatherContainer.append(tempParagraph)
            weatherContainer.append(weatherList)
            cityCard.appendchild(weatherContainer);
        })
        .catch(err => console.log(err))
}

const getCoordinates = (cityName) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
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

