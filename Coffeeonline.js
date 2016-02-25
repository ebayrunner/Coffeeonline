/**
 * Created by michaeluchida on 1/26/16.
 */



//onChange, contains three callback functions
var calculateTotal = function(){
    var totalCost = insideEspressoDrink() + insideEspressoShot() + ice();
    //assign the reference to the Element object
    var divobject = document.getElementById("grandTotal");
    divobject.innerHTML = "$"+totalCost.toFixed(2);
};

var insideEspressoDrink = function(){
    var priceOfDrink;
    //assign the reference to the Element object
    var whatDrink= document.getElementById("whatDrink")
    //looks up the espressoDrink object on Price.js
    priceOfDrink= espressoDrink[whatDrink.value]
    //returns the price of the drink to calculateTotal
    return priceOfDrink;
      };


var insideEspressoShot = function(){
    var totalShots =0;
    //assign the reference to the Element object
    var numberOfShots= document.getElementById("numberOfShots")
    //looks up the howManyShots object on Price.js
    totalShots = howManyShots[numberOfShots.value];
    //returns the price of the shots to calculateTotal
    return totalShots;
};

 var cupSize = function(){

     var ounceCup=0;
     //var theForm = document.forms["coffeeOrderForm"];
     var selectedCup = document.getElementById("sizeOfCup");
    //there is no price difference for cup size so no price lookup;
     var divobject = document.getElementById('cupPrice');
     divobject.innerHTML = selectedCup.value;
     //the value of ounceCup is returned to calculateTotal
     return selectedCup.value;
 };

var ice= function(){
    var icePrice=0;
    //assign te reference to the Element object
    var iceChoice = document.getElementById("icedDrink");
    //A simple boolean. if true add $.75, if false icePrice = 0;
    if(iceChoice.checked){
        icePrice = 0.75;
    }
    return icePrice;
}
//The Google Maps Geolocation API returns a location and accuracy radius
// based on information about cell towers and WiFi nodes that the mobile client can detect.
function initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13
        });
            //hide the div until the map is rendered
            $(function () {
                $("#api_wrapper").show()

            });
        //infoWindo is the pop-up window indicating latitude and longitude and arrow pointing to rendered map
        var infoWindow = new google.maps.InfoWindow({map: map});

        // navigator.geolocation determines geo location via data collection mechanisms like the ip of a wifi router, cell tower, etc
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                //since (navigator.geolocation) is asych, call whatEver after pos is determined.
                whatEver(pos);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Here is your location. Your latitude is ' + pos.lat.toFixed(4) + ' and your logitude is ' + pos.lng.toFixed(4));
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
//google.maps.event.addDomListener(window, "load", initialize);


    //this function, with the geolocation coordinates from initMap, makes a JSON request to OpenWeatherMap API.  A JSON file is returned
    function whatEver(coordinates) {
        //convert the argument to a format that will work with the api request
        var latitude = coordinates.lat;
        var longitude = coordinates.lng;
        var text = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7534f5fab6676373430402880c728290&";
        var addCoordinates = "lat=" + latitude + "&lon=" + longitude;
        var weatherObject = document.getElementById("weatherInfo");
        //make the ajax call to the API
        $(function(){
            $.getJSON(text + addCoordinates,
                function (data) {
                    //present to the user the raw JSON file
                    weatherObject.innerHTML = JSON.stringify(data)
                    var sortWeather = document.getElementById("sorted_weather");
                    //present to the user a simple illustration of key:value pairs from the object
                    sortWeather.innerHTML = "The temperature in " + data.name + " is " + data.main.temp + " degrees, " + " barometric temperature is "
                        + data.main.pressure + "mmHg, " + " and humidity is " + data.main.humidity + " %."
                })
        })
    }