// Global
let lat = "";
let long = "";
const key = "699cf8a377d203af678c55c4d5a9a9cf";
const cityName = document.querySelector("#city-search");
const searchBtn = document.querySelector("#search-btn");
const curCity = document.querySelector("#search-result");
const icon = document.querySelector("#current-img");
const tempData = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humid = document.querySelector("#humid");
const uvI = document.querySelector("#uv");
// selects five day forcast section for cards
const fiveDay = document.querySelectorAll("#future");

// gets weather data by city info from input
const getWeather = (city) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      key
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        weatherData(data);
      });
    } else {
      alert("Not a valid entry, try again");
    }
  });
};

// gets more data using more specific instructions with lat and long and onecall api
const weatherData = (data) => {
  lat = data.coord.lat;
  long = data.coord.lon;
  // get daily values from one call using the data from firts fetch data lat and long

  // data collection for current weather
  let cityName = data.name;
  curCity.innerHTML = cityName;

  let currentIcon = data.weather[0].icon;
  icon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + currentIcon + ".png"
  );

  let currentTemp = data.main.temp;
  tempData.innerHTML = "Temp: " + currentTemp + "°F";

  let currentHumid = data.main.humidity;
  humid.innerHTML = "Humidity: " + currentHumid + "%";

  let currentWind = data.wind.speed;
  wind.innerHTML = "Wind: " + currentWind + "MPH";

  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&exclude=minutely,hourly,alerts&appid=" +
      key
  )
    .then((response) => {
      return response.json();
    })
    .then((forcast) => {
      console.log(forcast);
      // grabs uv data from current onecall
      let uvData = forcast.current.uvi;
      uvI.innerHTML = "UV: " + uvData;

      // loop through fiveday forcast section
      for (i = 0; i < fiveDay.length; i++) {
        fiveDay[i].innerHTML = "";
        let fiveIcon = document.createElement("img");
        fiveIcon.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/ " +
            forcast.daily[i].weather.icon +
            ".png"
        );
        fiveDay[i].appendChild(fiveIcon);

        let fiveTemp = document.createElement("p");
        fiveTemp.innerHTML = "Temp: " + forcast.daily[i].temp.day + "°F";
        fiveDay[i].appendChild(fiveTemp);

        let fiveHum = document.createElement("p");
        fiveHum.innerHTML = "Humidity: " + forcast.daily[i].humidity + "%";
        fiveDay[i].appendChild(fiveHum);

        let fiveWind = document.createElement("p");
        fiveWind.innerHTML = "Wind: " + forcast.daily[i].wind_speed + "mph";
        fiveDay[i].appendChild(fiveWind);

        let fiveUv = document.createElement("p");
        fiveUv.innerHTML = "UV: " + forcast.daily[i].uvi;
        fiveDay[i].appendChild(fiveUv);
      }
    });
};

const searchVal = () => {};

// search event listener
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let citySearch = cityName.value.trim();
  getWeather(citySearch);
  console.log(citySearch);
});
