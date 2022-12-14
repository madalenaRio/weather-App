import Data from "./config.js";
import { addElementInnerHtml, addElementDiv, addElementSpan } from "./component.js";
import './style.css';

const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');
const thisCityB = searchBar.value;



console.log(thisCityB + "lets see if it works")

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// Event will start on a keyup action
searchBar.addEventListener('keyup', (event) => {

    // checking the action for specific key (Enter)
    if(event.key === "Enter") {
        // Store target in variable
        const thisCity = event.currentTarget.value.toLowerCase();
        const apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + thisCity + "&appid=" + Data.key;
        event.currentTarget.value = '';
        // Fetching first api to get the City coordinates
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const lon = data.city.coord.lon;
                const lat = data.city.coord.lat;

                cityNameContainer.innerHTML = data.city.name;

                // Fetching final data according to the coordinates
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=" + Data.key)
                    .then(response => response.json())
                    .then(result => {
                        console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')

                        // Removing all child elements from Container before creating new set of elements
                        while (container.firstChild) {
                            container.removeChild(container.firstChild);
                        };

                        // Looping through 5 days of weather data
                        for(let i = 0; i < 5; i++) {
                            
                            // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
                            const date = new Date();
                            const dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
                            const data = result.daily[i];
                            console.log((date.getDay() + i) % 7);

                            const card = addElementDiv(container, "div", "card");
                            const imageBox = addElementDiv(card, "div", "imgBx");

                            const cardImg = document.createElement('img');
                            cardImg.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                            imageBox.appendChild(cardImg);

                            const contentBox = addElementDiv(card, "div", "contentBx");
                            addElementInnerHtml(contentBox, "h2", dayOfTheWeek);
                            addElementInnerHtml(contentBox, "h4", data.weather[0].description);

                            const currentTempBox = addElementDiv(contentBox, "div", "color");
                            addElementInnerHtml(currentTempBox,"h3", "Temp:");
                            addElementSpan( currentTempBox, "span", "current-temp", data.temp.day + "??C");

                            const minMaxTemperatures = addElementDiv(contentBox, "div", "details");
                            addElementInnerHtml(minMaxTemperatures,"h3", "More:");
                            addElementSpan(minMaxTemperatures, "span", "min-temp",data.temp.min + "??C");
                            addElementSpan(minMaxTemperatures, "span", "max-temp",data.temp.max + "??C");
                        };
                    });
            })
            .catch((error) => {
                // If there are errors, send out an error message
                console.error('Error:', "not a place!");
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                };
                return alert("Are you sure you aren't holding your map upside down?");
            });
    };
});

