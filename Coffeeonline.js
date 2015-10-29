/**
 * Created by michaeluchida on 9/14/15.
 *
 */



$.getAjax = function(){

    return $.ajax({
        url: 'package.json',
        //data: {espressoDrink},
        dataType:'json'

    }).promise()



};






//This is the callback function whos value is returned from the AJAX call

function insideEspressoDrink(jsonData) {
    var drink = 0;

    return function (jsonData) {

        drink = jsonData.espressoDrink[espressoDrink.value];
        var theForm = document.forms["coffeeOrderForm"];
        var divobject = document.getElementById('coffeePrice');
        divobject.style.display = 'block';
        divobject.innerHTML = drink;
        return drink;
    }


}


//This is the another callback function whos value is returned from the AJAX call

function insideEspressoShot (jsonData){
    var shots =0;
    var theForm = document.forms["coffeeOrderForm"];
    //var selectedDrink = theForm.elements["numberOfShots"];
    //set cakeFilling Price equal to value user chose
    //For example filling_prices["Lemon".value] would be equal to 5
    shots= jsonData.espressoShot[numberOfShots.value];
    if((typeof shots)=='string'){
        //console.log('here is the the type of shots',typeof shots)
        var divobject = document.getElementById('shotPrice');
        divobject.style.display='block';
        divobject.innerHTML = shots;
        return shots}
};








 function cupSize()
 {

     var cup_price = new Array();
     cup_price["8"]=0
     cup_price["12"]=1
     cup_price ["16"]=2
     cup_price["20"]=3;

 var ounceCup=0;
 //Get a reference to the form id="cakeform"
 var theForm = document.forms["coffeeOrderForm"];
 //Get a reference to the cake the user Chooses name=selectedCake":
 var selectedCake = theForm.elements["sizeOfCup"];
 //Here since there are 4 radio buttons selectedCake.length = 4
 //We loop through each radio buttons

 //we set cakeSizePrice to the value of the selected radio button
 //i.e. if the user choose the 8" cake we set it to 25
 //by using the cake_prices array
 //We get the selected Items value
 //For example cake_prices["Round8".value]"
 ounceCup = cup_price[sizeOfCup.value];


    var divobject = document.getElementById('cupPrice');
    divobject.style.display='block';
    divobject.innerHTML = ounceCup;
    return ounceCup
 }


function icedPrice()
{
    var icePrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["coffeeOrderForm"];
    //Get a reference to the checkbox id="includecandles"
    var ice = theForm.elements["iced"];

    //If they checked the box set candlePrice to 5
    if(ice.checked==true)
    {
        icePrice=.50;
    }
    //finally we return the candlePrice
    return icePrice;
}



function commuteMug(){
    var reusableMug=0;
    var theForm=document.forms["orderform"];
    var includeMug = theForm.elements['commutermug'];
    if(includeMug.checked==true){
        includeMug=15.75;
    }
    return includeMug;
}



//This function invokes the AJAX with callback as its argument

function calculateTotal() {
    var totalCost;
    totalCost=  $.getAjax().done(insideEspressoDrink)
   console.log(totalCost)


    var theForm = document.forms["coffeeOrderForm"];
    var divobject = document.getElementById('grandTotal');
    divobject.style.display='block';
    divobject.innerHTML = totalCost;
};




/*

function hideTotal() {
    var divobj = document.getElementById('grandTotal');
    divobj.style.display='none';
}
*/



/*



 *!/*/
