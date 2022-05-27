
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

    const fiveDaysData = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
        .then(response => response.json())
      
        .then(data => {
            const { daily } = data;

            const cityCardContainer = document.getElementById("cityCardContainer");
            const cityCard = document.createElement("div");
            cityCard.setAttribute("id", "cityCard");
            const weeklyforecastCityCard = document.createElement("div");
            weeklyforecastCityCard.setAttribute("id", "cityCard");
            let weeklyForecastTable = document.createElement('table')
            let weeklyForecastTablebody = document.createElement('tbody');

            for (let i = 0; i < daily.length; i++) {
                const day = daily[i].dt;

                let [dayOfWeek, month, dayOfMonth] = convertTimeToWeekDay(day);

                if (i == 0) {
                    const tempParagraph = document.createElement("p");
                    const icon = document.createElement("img")
                    const weatherCondParagraph = document.createElement("li");
                    const feelsLikeParagraph = document.createElement("li");
                    const minTemperature = document.createElement("li");
                    const maxTemperature = document.createElement("li");
                    const cloudsParagraph = document.createElement("li");

                    
                    icon.src = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + "@2x.png";
                    tempParagraph.innerText = Math.round(daily[i].temp.day) + " ºC";
                    weatherCondParagraph.innerText = "Weather condition : " + daily[i].weather[0].description;
                    feelsLikeParagraph.innerText = "Feels like : " + Math.round(daily[i].feels_like.day) + " ºC";
                    minTemperature.innerText = "min : " + Math.round(daily[i].temp.min) + " ºC";
                    maxTemperature.innerText = "max : " + Math.round(daily[i].temp.max) + " ºC";
                    cloudsParagraph.innerText = "Clouds : " + daily[i].clouds + "%";

                    cityCard.append(icon);
                    cityCard.append(tempParagraph);
                    cityCard.append(weatherCondParagraph);
                    cityCard.append(feelsLikeParagraph);
                    cityCard.append(minTemperature);
                    cityCard.append(maxTemperature);
                    cityCard.append(cloudsParagraph);

                    //cityCardContainer.append(cityCard)
                }

               else { 
                   
                let row = document.createElement('tr');

                let dayofWeekForecast = document.createElement('td');
                dayofWeekForecast.innerText = dayOfWeek + ", " + dayOfMonth + " " + month;

                let dayofweekIcon = document.createElement('td');
                let icon = document.createElement('img');
                icon.src = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + "@2x.png";
                dayofweekIcon.appendChild(icon);
                
                let maxMinTemp = document.createElement('td');
                maxMinTemp.innerHTML = "min : " + Math.round(daily[i].temp.min) + " ºC" + "<br>" + "max : " + Math.round(daily[i].temp.max) + " ºC";

                let weatherDescription = document.createElement('td');
                weatherDescription.innerText = daily[i].weather[0].description;

                row.appendChild(dayofWeekForecast);
                row.appendChild(dayofweekIcon);
                row.appendChild(maxMinTemp);
                row.appendChild(weatherDescription);
                weeklyForecastTablebody.appendChild(row);
                
                }

                weeklyForecastTable.appendChild(weeklyForecastTablebody);
                cityCard.appendChild(weeklyForecastTable);
                cityCardContainer.append(cityCard);
                
                // console.log(dayOfWeek, dayOfMonth, month);
                // console.log(daily[i].weather[0].icon);
                // console.log(daily[i].temp.min);
                // console.log(daily[i].temp.max);
                // console.log(daily[i].weather[0].description);
            }



        })

        .catch(err => console.log(err))
}


const getCoordinates = (cityName) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(lat, lon)
            getWeather(lat, lon)
        })
        .catch(() => {
            errorInputMessage.textContent = "Please search for a valid city 😩";
        });
}

const convertTimeToWeekDay = (timestamp) => {

    let a = new Date(timestamp * 1000);
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = days[a.getDay()];
    let month = months[a.getMonth()];
    let dayOfMonth = a.getDate();
    // console.log(month);
    // console.log(dayOfMonth);

    return  [dayOfWeek, month, dayOfMonth];
}

button.addEventListener("click", executeForm);


