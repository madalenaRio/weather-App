console.log ("is this weather thing working?");

const key = "777ec2ec99c374aacef9a89e0e843292";
const formSearch = document.querySelector('search-input')

fetch(api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})

fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;