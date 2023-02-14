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

// Reorganizing Search Area-------------------------------------
//navigator.geolocation.getCurrentPosition(showPosition);
//userLocation.addEventListener("click", showPosition);

//Beginning of Edits---------------------
//function displayForcast(response) {}

// Gather Position
function showPosition(corrdinates) {
  let apiKey = "c93e97809431cb4a1503908d50079963";
  let long = position.coords.longitude;
  let lati = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);
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

  let fahrenheitTemp = Math.round(response.data.main.temp);

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

  //showPosition(response.data.coords);
}

function citySearch(city) {
  let apiKey = "c93e97809431cb4a1503908d50079963";
  let cityapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(cityapiUrl).then(showWeather);
}

function userEntry(event) {
  event.preventDefault();
  let searching = document.querySelector("#city-input");
  citySearch(searching.value);
}
citySearch("Dallas");

let userSearch = document.querySelector("#search-bar");
userSearch.addEventListener("submit", userEntry);
