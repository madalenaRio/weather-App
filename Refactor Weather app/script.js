import Data from "./config.js";
import { createAddElement, } from "./_functions.js";

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
                let minMaxTemperatures;

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
                            let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
                            const data = result.daily[i];
                            console.log(date + "what is this?");

                           // Create the elements with Data
                            const card = document.createElement('div');
                            card.classList.add("card");
                            container.appendChild(card);
                            //createAddElement(container, "div", "card");

                            const imageBox = document.createElement('div');
                            imageBox.classList.add("imgBx");
                            card.appendChild(imageBox);
                            //createAddElement(card, "div", "imgBx", "imgBx");

                            const cardImg = document.createElement('img');
                            cardImg.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                            imageBox.appendChild(cardImg);

                            const contentBox = document.createElement("div");
                            contentBox.classList.add("contentBx");
                            card.appendChild(contentBox);
                            //createAddElement(card, "div", "contentBx", "");

                            const cardHeader = document.createElement("h2");
                            cardHeader.innerHTML = dayOfTheWeek;
                            contentBox.appendChild(cardHeader);
                            //createAddElement(contentBox, "h2", "h2", dayOfTheWeek);

                            const tempDescription = document.createElement("h4");
                            tempDescription.innerHTML = data.weather[0].description;
                            contentBox.appendChild(tempDescription);
                            //createAddElement(contentBox, "h4", "h4", data.weather[0].description)

                            const currentTempBox = document.createElement("div");
                            currentTempBox.classList.add("color");
                            contentBox.appendChild(currentTempBox);
                            //createAddElement(contentBox, "div", "color", "");

                            // const currentTempHeader = document.createElement("h3");
                            // currentTempHeader.innerHTML = "Temp:"
                            // currentTempBox.appendChild(currentTempHeader);
                            //const currentTempHeader = currentTempHeader;
                            createAddElement("h3", "currentTempHeader", "Temp:", currentTempBox);

                            const currentTemp = document.createElement("span");
                            currentTemp.classList.add("current-temp");
                            currentTemp.innerHTML = data.temp.day + "°C";
                            currentTempBox.appendChild(currentTemp);
                           //createAddElement( "span", "current-temp", data.temp.day + "°C", );

                            const minMaxTemperatures = document.createElement("div");
                            minMaxTemperatures.classList.add("details");
                            contentBox.appendChild(minMaxTemperatures);
                            //createElementImg(contentBox, "div", "details")
                            
                            const minMaxTempHeader = document.createElement("h3");
                            minMaxTempHeader.innerHTML = "More:"
                            minMaxTemperatures.appendChild(minMaxTempHeader);

                            const minTemp = document.createElement("span");
                            minTemp.classList.add("min-temp")
                            minTemp.innerHTML = data.temp.min + "°C";
                            minMaxTemperatures.appendChild(minTemp);

                            const maxTemp = document.createElement("span");
                            maxTemp.classList.add("max-temp")
                            maxTemp.innerHTML = data.temp.max + "°C";
                            minMaxTemperatures.appendChild(maxTemp);
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

