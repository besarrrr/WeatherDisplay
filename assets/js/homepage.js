var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var key = "fb2f9559d74a156a776b176fddac490c";

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getCityInfo(cityname);
        cityContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city")
    }
};

function getCityInfo (cityname) {

    var apiurl = "http://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+key;

    fetch(apiurl)
    .then(function(response){
        if (response.ok){
        return response.json().then(function(data) {
            console.log(data);
            //run a function to display here once it is created
          });
        } else {
            alert('Error: City Not Found');
          }
    })
    .catch(function(error) {
        alert("Unable to connect to weather app");
      });
}



userFormEl.addEventListener("submit", formSubmitHandler);