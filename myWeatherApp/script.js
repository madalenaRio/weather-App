
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


const getWeather = (lat, lon) => {

     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
        .then(response => response.json())
      
        .then(data => {
            const { daily } = data;

            const cityCardContainer = document.getElementById("cityCardContainer");
            const cityCard = document.createElement("div");
            cityCard.setAttribute("id", "cityCard");
            const weeklyforecastCityCard = document.createElement("div");
            weeklyforecastCityCard.setAttribute("id", "cityCard");
            const weeklyForecastTable = document.createElement('table')
            weeklyForecastTable.setAttribute("id", "weeklyForecastTable");
            const weeklyForecastTablebody = document.createElement('tbody');

            for (let i = 0; i < daily.length; i++) {
                const day = daily[i].dt;

                const [dayOfWeek, month, dayOfMonth] = convertTimeToWeekDay(day);

                if (i == 0) {
                    const tempParagraph = document.createElement("p");
                    const firstDayOfWeek = document.createElement("p");
                    firstDayOfWeek.setAttribute("id", "firstDayofWeek");
                    const icon = document.createElement("img")
                    const minMaxTemperature = document.createElement("p");
                    minMaxTemperature.setAttribute("id", "minMaxFirstDayParg");
                    const weatherCondParagraph = document.createElement("li");
                    const feelsLikeParagraph = document.createElement("li");
                    const cloudsParagraph = document.createElement("li");
                    icon.src = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + "@2x.png";
                    tempParagraph.innerHTML = Math.round(daily[i].temp.day) + " ºC";
                    firstDayOfWeek.innerHTML = cityName + "<br>" + dayOfWeek + "<br>" + dayOfMonth + month;
                    weatherCondParagraph.innerHTML = daily[i].weather[0].description;
                    feelsLikeParagraph.innerHTML = "Feels like : " + Math.round(daily[i].feels_like.day) + " ºC";
                    minMaxTemperature.innerHTML = "min : " + Math.round(daily[i].temp.min) + " ºC" + "<br>" +"max : " + Math.round(daily[i].temp.max) + " ºC";
                    cloudsParagraph.innerText = "Clouds : " + daily[i].clouds + "%";

                    cityCard.append(icon);
                    cityCard.append(tempParagraph);
                    cityCard.append(minMaxTemperature);
                    cityCard.append(firstDayOfWeek)
                    cityCard.append(weatherCondParagraph);
                    cityCard.append(feelsLikeParagraph);
                    cityCard.append(cloudsParagraph);
                }

               else { 
                   
                const row = document.createElement('tr');

                const dayofWeekForecast = document.createElement('td');
                dayofWeekForecast.innerHTML = Math.round(daily[i].temp.day) + " ºC" + "<br>" + dayOfWeek + ", " + dayOfMonth + " " + month + "<br>" + daily[i].weather[0].description;

                const dayofweekIcon = document.createElement('td');
                const icon = document.createElement('img');
                icon.src = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + "@2x.png";
                dayofweekIcon.appendChild(icon);
                
                const maxMinTemp = document.createElement('td');
                maxMinTemp.innerHTML = "min : " + Math.round(daily[i].temp.min) + " ºC" + "<br>" + "max : " + Math.round(daily[i].temp.max) + " ºC";

                row.appendChild(dayofWeekForecast);
                row.appendChild(dayofweekIcon);
                row.appendChild(maxMinTemp);
                weeklyForecastTablebody.appendChild(row);
                }

                weeklyForecastTable.appendChild(weeklyForecastTablebody);
                cityCard.appendChild(weeklyForecastTable);
                cityCardContainer.append(cityCard);
                
                 console.log(dayOfWeek, dayOfMonth, month);
                 console.log(daily[i].weather[0].icon);
                 console.log(daily[i].temp.min);
                 console.log(daily[i].temp.max);
                 console.log(daily[i].weather[0].description);
            }

        })

        .catch(err => console.log(err))
}


const getCoordinates = (cityName) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then(response => response.json())
        .then(data => {

            // console.log(data)

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

    const a = new Date(timestamp * 1000);
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[a.getDay()];
    const month = months[a.getMonth()];
    const dayOfMonth = a.getDate();
    // console.log(month);
    // console.log(dayOfMonth);

    return  [dayOfWeek, month, dayOfMonth];
}

button.addEventListener("click", executeForm);


