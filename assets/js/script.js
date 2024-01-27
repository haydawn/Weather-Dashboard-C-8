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
        });
    }
  
    function addToSearchHistory(cityName) {
      $("#history").append("<div>" + cityName + "</div>");
    }
  });
  