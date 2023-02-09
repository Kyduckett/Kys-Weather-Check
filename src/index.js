let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

//let citySearch = prompt("Enter a City");
//citySearch = citySearch.toLowerCase();

//if (weather[citySearch] !== undefined) {
//let temperature = weather.[citySearch].temp
//let celciusTemp = Math.round(temperature);
//let fahrenheitTemp = (temperature * 9/5) + 32;
//let humidity = weather.[citySearch].humidity

//alert(`It is currently ${celciusTemp}°C (${fahrenheitTemp}) in ${citySearch} with a humidity of ${humidity}`);
//}
// else {
//  alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +(citySearch)
//);
//}

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
userLocation.addEventListener("click", showPosition);
