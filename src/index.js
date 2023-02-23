// Current Date Display

function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentDate = `${day} ${hours}:${min}`;

  return currentDate;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(forecastApi);
  axios.get(forecastApi).then(displayForecast);
}

//Current Location Display
function showWeather(response) {
  let hum = Math.round(response.data.main.humidity);
  let speed = Math.round(response.data.wind.speed);

  let descriptionElement = response.data.weather[0].description;
  let currentDate = document.querySelector("#current-day");
  let tempElement = document.querySelector("#current-temp");
  let locationElement = document.querySelector("#current-location-header");
  let iconElement = document.querySelector("#icon");
  let weatherDescription = document.querySelector("#description-element");
  let humidElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-windspeed");

  fahrenheitTemp = Math.round(response.data.main.temp);

  currentDate.innerHTML = formateDate(response.data.dt * 1000);
  locationElement.innerHTML = `${response.data.name}`;
  tempElement.innerHTML = `${fahrenheitTemp}°`;
  humidElement.innerHTML = `Humidity: ${hum}%`;
  windElement.innerHTML = `Wind Speed: ${speed} Km/H`;
  weatherDescription.innerHTML = `${descriptionElement}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let cityapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(cityapiUrl).then(showWeather);
}

function userEntry(event) {
  event.preventDefault();
  let searching = document.querySelector("#city-input");
  citySearch(searching.value);
}

function celFormula(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let celciusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  tempElement.innerHTML = `${celciusTemp}°`;
}
function fahrFormula(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${fahrenheitTemp}°`;
}
let userSearch = document.querySelector("#search-bar");
userSearch.addEventListener("submit", userEntry);

let fahrenheitTemp = null;

let celciusButton = document.querySelector("#cel-button");
celciusButton.addEventListener("click", celFormula);

let fahrenheitButton = document.querySelector("#fahr-button");
fahrenheitButton.addEventListener("click", fahrFormula);

citySearch("Dallas");
