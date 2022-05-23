
import { ApiKey } from "./config";
const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.getElementById("msg")

let inputVal = input.value;

const key = ApiKey;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(getWeather);

     });

console.log ("is this weather thing working?");

const getWeather = () => {
    
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

}

