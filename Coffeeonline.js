/**
 * Created by michaeluchida on 1/26/16.
 */

var drinkMenu = [
    {name: "Americano",
        price: 2.75 },
    {name: "Cappuchino",
        price: 3.35},
    {name: "Cubano",
        price: 3.85},
    {name: "Mexican Hot Chocolate",
        price: 4.10},
    {name: "Mocha",
        price: 3.50}
]


var espressoShot =[
    {name: "one", price: 0.50},
    {name:"two", price: 0.50},
    {name: "three", price: 1.50}
]

var drinkMenuExtras= [
    {name: "Whip Cream", price: 0.75},
    {name: "Iced", price: 0.75},
    {name: "Vanilla Syrup", price: 0.65}
]








//var drinkExtras = function(extras){
//    //return drinkMenu price
//    var extrasArray=[];
//    //console.log("value", extras.value)
//    extrasArray.push(drinkMenuExtras.find(function(item){
//        if(item.name === extras.value){
//            return item.price
//        }
//    }))
//    console.log(extrasArray)
//    //return extrasArray
//    //console.log(extrasObject)
//
//}
//sum espressoDrink + espressoShot + espressoDrinkExtras

var drinkObject;
var chosenDrink = function(drink){
    //return drinkMenu price
    //console.log("value", drink.value)
    drinkObject =  drinkMenu.find(function(item){
        if(item.name === drink.value){
            return item.price
        }
    })
    console.log(drinkObject)
    return drinkObject

    //console.log(drinkObject[0].name + drinkObject[0].price)

}

var shotsObject;
var totalShots = function(shots){
    //return drinkMenu price
    //console.log("value", shots.value)
    shotsObject =  espressoShot.find(function(item){
        if(item.name === shots.value){
            return item.price
        }
    })
    console.log(shotsObject)
    return shotsObject;
}


var calculateTotal = function(){
if(!drinkObject){
    return alert("Please chose a drink");
}
    if(!shotsObject){
        return alert("Please choose the number of espresso Shots");
    }
//    console.log("drinkObject from inside total",drinkObject)
//console.log("shotsObject from inside total", shotsObject)

    var arrayOfObject = [drinkObject,shotsObject]

    var totalPrice = arrayOfObject.reduce(function(sum, item){
        return sum + item.price;
    },0)

///use reduce to iterate through the three objects for the price
    var divobject = document.getElementById("total");
    //divobject.innerHTML = "You've ordered a "+ drinkObject.name + " with "
    //+ shotsObject.name + " shot(s) of espresso for a total price of $"+ totalPrice
    divobject.innerHTML = "$"+totalPrice

}
var clearButton = function() {
    var ele = document.getElementsByName("radButton");
    for (var i = 0; i < ele.length; i++)
        ele[i].checked = false;
    document.getElementById("total").innerText = ""
};

var checkOut = function(){


}


//console.log(allDrinks);
/// *************** find
//console.log(drinkMenu.find(function(item){
//    return item.name==="Americano"
//}))

//console.log(drinkMenu.filter(function(item){
//    return item.name ==="Americano";
//}))

    var customerInfo = [
    {name: "Sleepy",
        lastOrders: ["Mocha with Two Shots", "Triple shot Americano with vanilla flavoring & cream","Triple shot Cubano"],
        cardBalance: 14.00,
    },

    {name: "Doc",
    lastOrders: ["Double shot cubano with ice", 8],
        cardBalance: 0.80
    },
    {name: "Sneezy",
        lastOrders: ["Single shot mocha  with allegra"],
        cardBalance: 7.35
    },
    {name: "Bashful",
        lastOrders: ["Double shot latte with whole milk"],
        cardBalance: 10.80
    },
    {name: "Hopeful",
        lastOrders: ["Triple Americano with vanilla flavoring and cream"],
        cardBalance: 25.00
    },
    {name: "Create an Account",
        lastOrders: [],
        cardBalance: 0
    }
]

//******************************underscore functions***********************

var each=function(collection, iterator){
    //each does not have a return value, just applys the iterator to some arguments
    //test whether collection is an object or array
    //iterate over entire collection
    if(collection.length===undefined) {
        for (var key in collection) {
            iterator(collection[key], key, collection);
        }
    }

    else{
        for(var i=0;i<collection.length;i++){
            iterator(collection[i],i,collection);
        }
    }

};
var filter = function(collection,test){
    //create an empty array truthyElements - elements that path a truth test
    //will be pushed in to this array
    //iterate over collection using _.each
    //return truthyElements

    var truthyElements =[];

    each(collection,function(value){
        if(test(value)){
            truthyElements.push(value);
        }
    });
    return truthyElements;
};

var map = function(collection,iterator){
    //create an empty array
    //after applying the iterator to each elements,
    //push the new value into results
    var results = [];
    each(collection,function(value,key,collection){
        results.push(iterator(value,key,collection));
    });
    return results
};

var reduce = function(collection, iterator, accumulator){
    var thirdArgument = arguments.length===2;


    each(collection, function(item) {
        if (thirdArgument) {
            accumulator = item;
            thirdArgument=false

        }
        else {
            accumulator = iterator(accumulator,item);
        }
    });
    //returns a single value
    return accumulator;
};

 //*******************End of underscore functions **************

//Two Global variable - user, customerData
//user name;
var user;

//an array containing name, previous orders
var customerData;






var returningCustomer= function(){
    user = (document.getElementById("welcomeCustomer")).value;
    customerData = customerInfo.find(function(item){
        return item.name ===user;
    })
    console.log(customerData)
    welcomeMessage(customerData);
}


//creates a new customer account and automatically loads zoom card with $10.00
var createNewAccount = function(){
    alert("Create and account and we will place $10.00 on your Zoom Card")
    var newObj = {}
    var name = prompt("Enter your Name(no spaces)")
    //if user has spaces - recursively call newCustomerData
    newObj.name = name;
    newObj.cardBalance = 10.00;
    newObj.lastOrders = null
    //add customer info to customerInfo
    console.log(newObj,"newObj")
    customerInfo.push(newObj);
    console.log(customerInfo);
    customerData = newObj;
    welcomeMessage(customerData);
}


//displays a welcome message including name, last 3 orders, and Zoom card balance
var welcomeMessage = function(customerData) {
    //returning customer - display last orders and offer options to select past order or choose a new drink
    var divobject = document.getElementById("welcomeMessage");
    divobject.innerHTML = "Welcome " + customerData.name +","+
     " your Zoom card has a balance of $"+ customerData.cardBalance+". "+
            "Your last orders include: " + customerData.lastOrders

    if(customerData.lastOrders){
        var somedivobject = document.getElementById("lastOrders");
        var lastOrders = customerData.lastOrders.map(function(item){
            return item;
        })
        somedivobject = lastOrders;
    }


};



//var clicked(){
//    console.log("i've been clicked");
//};


//******************************************* API ******************************************


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
                console.log('from inside initMap', pos)
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

//******************************************* API ******************************************


//************************************Former Code in v1**************************************
////onChange, contains three callback functions
//var calculateTotal = function(){
//    var totalCost = insidedrinkMenu() + insideEspressoShot() + ice();
//    //assign the reference to the Element object
//    var divobject = document.getElementById("grandTotal");
//    divobject.innerHTML = "$"+totalCost.toFixed(2);
//};
//
//var insidedrinkMenu = function(){
//    var priceOfDrink;
//    //assign the reference to the Element object
//    var whatDrink= document.getElementById("whatDrink")
//    //looks up the drinkMenu object on Price.js
//    priceOfDrink= drinkMenu[whatDrink.value]
//    //returns the price of the drink to calculateTotal
//    return priceOfDrink;
//};
//
//
//var insideEspressoShot = function(){
//    var totalShots =0;
//    //assign the reference to the Element object
//    var numberOfShots= document.getElementById("numberOfShots")
//    //looks up the howManyShots object on Price.js
//    totalShots = howManyShots[numberOfShots.value];
//    //returns the price of the shots to calculateTotal
//    return totalShots;
//};
//
//var cupSize = function(){
//
//    var ounceCup=0;
//    //var theForm = document.forms["coffeeOrderForm"];
//    var selectedCup = document.getElementById("sizeOfCup");
//    //there is no price difference for cup size so no price lookup;
//    var divobject = document.getElementById('cupPrice');
//    divobject.innerHTML = selectedCup.value;
//    //the value of ounceCup is returned to calculateTotal
//    return selectedCup.value;
//};
//
//var ice= function(){
//    var icePrice=0;
//    //assign te reference to the Element object
//    var iceChoice = document.getElementById("icedDrink");
//    //A simple boolean. if true add $.75, if false icePrice = 0;
//    if(iceChoice.checked){
//        icePrice = 0.75;
//    }
//    return icePrice;
//}

//********************************* End of Former Code in v1 ****************************