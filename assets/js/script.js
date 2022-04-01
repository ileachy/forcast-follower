// Global
const key = "699cf8a377d203af678c55c4d5a9a9cf";
const city = document.querySelector("#search-result");
const icon = document.querySelector("#current-img");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humid = document.querySelector("#humid");
const uvI = document.querySelector("#uv");
// selects five day forcast section for cards
const fiveDay = document.querySelector("#future");
// city search function

// gets weather data by city info
const getWeather = (city) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      key
  )
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        alert("Not a valid entry, try again");
      }
    })
    .then((data) => weatherData(data));
};

const weatherData = (data) => {
  // data collection for current weather
  const { cityName } = data;
  city.innerHTML = cityName;

  const { currentIcon } = data.weather[0].icon;
  icon.src = "http://openweathermap.org/img/wn/" + currentIcon + ".png";

  const { currentTemp } = data.main.temp;
  temp.innerHTML = "Temp: " + currentTemp + "°F";

  const { currentHumid } = data.main.humidity;
  humid.innerHTML = "Humidity: " + currentHumid + "%";

  const { currentWind } = data.wind.speed;
  wind.innerHTML = "Wind: " + currentWind + "MPH";
};

const searchVal = (event) => {
  event.preventDefault();
  const name = document.querySelector("#city-search").value.trim();
  const seachEl = document.querySelector("#city-search").value;
};

document.querySelector("#seach-btn").addEventListener("submit", searchVal);
