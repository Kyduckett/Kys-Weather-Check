let now = new Date();
let currentDateDisplay = document.querySelector("#current-day");
function formateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let currentDate = `${day} ${hours}:${min}`;

  return currentDate;
}
currentDateDisplay.innerHTML = `${formateDate(now)}`;

function userEntry() {
  event.preventDefault();
  searched.innerHTML = `${searching.value}`;
  axios.get(cityapiUrl).then(citySearch);
}
// Searched Informaiton Display
function citySearch(response) {
  let apiKey = "c93e97809431cb4a1503908d50079963";
  let cityapiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searching.value},&limit=5&appid=${apiKey}`;
  let searchedTemp = response.data.main.temp;
  let searchedHum = response.data.main.humidity;
  let searchedWind = response.data.wind.speed;
  userTemp.innerHTML = `${searchedTemp}°`;
  userHumid.innerHTML = `Humidity :${searchedHum}%`;
  userWind.innerHTML = `Wind Speed:${searchedWind} Km/H`;
}

let searching = document.querySelector("#city-input");
let searched = document.querySelector("#current-location-header");
let userSearch = document.querySelector("#search-bar");

userSearch.addEventListener("submit", userEntry);

//Current Location Display
function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let hum = Math.round(response.data.main.humidity);
  let speed = Math.round(response.data.wind.speed);
  let descriptionElement = response.data.weather[0].description;
  userLocation.innerHTML = `${response.data.name}`;
  userTemp.innerHTML = `${temp}°`;
  userHumid.innerHTML = `Humidity: ${hum}%`;
  userWind.innerHTML = `Wind Speed: ${speed} Km/H`;
  weatherConditon.innerHTML = `${descriptionElement}`;
}
// Gather Position
function showPosition(position) {
  let apiKey = "c93e97809431cb4a1503908d50079963";
  let long = position.coords.longitude;
  let lati = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);
let userLocation = document.querySelector("#current-location-header");
let userTemp = document.querySelector("#current-temp");
let userHumid = document.querySelector("#current-humidity");
let userWind = document.querySelector("#current-windspeed");
let weatherConditon = document.querySelector("#description-element");
userLocation.addEventListener("click", showPosition);
