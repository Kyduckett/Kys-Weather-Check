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
  let min = now.getMinutes();
  let currentDate = `${day} ${hours}:${min}`;

  return currentDate;
}
currentDateDisplay.innerHTML = `${formateDate(now)}`;

function userEntry() {
  event.preventDefault();
  searched.innerHTML = `${searching.value}`;
}

let searching = document.querySelector("#city-input");
let searched = document.querySelector("#current-location-header");
let userSearch = document.querySelector("#search-bar");

userSearch.addEventListener("submit", userEntry);

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  userLocation.innerHTML = `${response.data.name}`;
  userTemp.innerHTML = `${temp}°`;
  userHumid.innerHTML = `Humidity : ${response.data.main.humidity}%`;
  userWind.innerHTML = `Wind Speed: ${response.data.wind.speed}mph`;
}

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
userLocation.addEventListener("click", showPosition);
