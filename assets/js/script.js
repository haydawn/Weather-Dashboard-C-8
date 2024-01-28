function saveToLocalStorage(cityName, temperature) {
  var savedData = {
    cityName: cityName,
    temperature: temperature
  };
  localStorage.setItem("weatherData", JSON.stringify(savedData));
}

function retrieveFromLocalStorage() {
  var savedDataString = localStorage.getItem("weatherData");
  var savedData = JSON.parse(savedDataString);

  if (savedData) {
    console.log("City Name: " + savedData.cityName);
    console.log("Temperature: " + savedData.temperature);
  } else {
    console.log("No saved data found");
  }
}

$(document).ready(function () {
  $("#search-form").submit(function (event) {
    event.preventDefault();

    var cityName = $("#search-input").val().trim();
    getWeatherData(cityName);

    $("#search-input").val("");
    addToSearchHistory(cityName);
  });

  function getWeatherData(cityName) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast"; 
    var apiKey = "ef4de6bdfd15df375228f55a30731fc0";

    // Fetch current weather data
    fetch(weatherApiUrl + "?q=" + cityName + "&appid=" + apiKey)
      .then(response => response.json())
      .then(currentData => {
        // Fetch 5-day forecast data
        fetch(forecastApiUrl + "?q=" + cityName + "&appid=" + apiKey)
          .then(response => response.json())
          .then(forecastData => {
            displayWeatherData(currentData, forecastData);
          });
      });
  }

  function displayWeatherData(currentData, forecastData) {
    $("#today, #forecast").empty();

    // Display current weather
    var currentWeather = $("<div>").addClass("current-weather");
    currentWeather.append("<h2>" + currentData.name + "(" + new Date().toLocaleDateString() + ")" + "</h2>");
    currentWeather.append("<p>Temp: " + currentData.main.temp + " K</p>");
    currentWeather.append("<p>Wind: " + currentData.wind.speed + " m/s</p>");
    currentWeather.append("<p>Humidity: " + currentData.main.humidity + "%</p>");

    // Save to localStorage
    saveToLocalStorage(currentData.name, currentData.main.temp);

    $("#today").append(currentWeather);

    // Display 5-day forecast
    var forecast = $("<div>").addClass("forecast");

    for (var i = 0; i < 5; i++) {
      var forecastDay = $("<div>").addClass("forecast-day");

      // Forecast information for each day
      var forecastItem = forecastData.list[i];
      var date = new Date(forecastItem.dt_txt);

      forecastDay.append(date.toLocaleDateString());
      forecastDay.append("<i class='fas fa-cloud'></i>");
      forecastDay.append("<p>Temp: " + forecastItem.main.temp + " K</p>");
      forecastDay.append("<p>Wind: " + currentData.wind.speed + " m/s</p>");
      forecastDay.append("<p>Humidity: " + forecastItem.main.humidity + "%</p>");

      forecast.append(forecastDay);
    }

    $("#forecast").append("<h2>5-Day Forecast:</h2>").append(forecast);
  }

  function addToSearchHistory(cityName) {
    $("#history").append("<div>" + cityName + "</div>");
  }
});

