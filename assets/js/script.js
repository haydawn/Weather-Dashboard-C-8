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
      var apiKey = "ef4de6bdfd15df375228f55a30731fc0";
      var apiUrl = weatherApiUrl + "?q=" + cityName + "&appid=" + apiKey;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          displayWeatherData(data);
        });
    }

    function displayWeatherData(data) {
      // Clear previous data
      $("#today, #forecast").empty();
  
      // Display current weather
      var currentWeather = $("<div>").addClass("current-weather");
      currentWeather.append("<h2>" + data.name + "(" + new Date().toLocaleDateString()+ ")"+"</h2>");
      currentWeather.append("<p>Temp: " + data.main.temp + " K</p>");
      currentWeather.append("<p>Wind: " + data.wind.speed + " m/s</p>");
      currentWeather.append("<p>Humidity: " + data.main.humidity + "%</p>");
     
  
      $("#today").append(currentWeather);
  
      // Display 5-day forecast
      var forecast = $("<div>").addClass("forecast");
  
      for (var i = 1; i <= 5; i++) {
        var forecastDay = $("<div>").addClass("forecast-day");
        forecastDay.append("<p>Date: " + new Date().toLocaleDateString() + "</p>");
  
        forecast.append(forecastDay);
      }
  
      $("#forecast").append(forecast);
    }
    
  
    function addToSearchHistory(cityName) {
      $("#history").append("<div>" + cityName + "</div>");
    }
  });
  