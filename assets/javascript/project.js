/**
 **********************************************************
 * Input Validations
 **********************************************************
 */
//allows only letters to be entered (Still need to allow spaces)
$('#search-city').keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z .]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }
  else
  {
  e.preventDefault();
  // alert('Please Enter Alphabate');
  return false;
  }
});

//allows only numbers to be entered
$('#search-zipcode').keypress(function (e) {
  var regex = new RegExp("^[0-9]+$");  
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }
  else
  {
  e.preventDefault();
  // alert('Please Enter Alphabate');
  return false;
  }
});



/**
 **********************************************************
 * Alternative Fuel Station Look-up API
 **********************************************************
 */
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for Alternative Fuel Station API based on form inputs
 */
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json";

  // add the api key parameter (the one we received when we registered)
  queryURL += "?api_key=vX65llVP5vNMB4aIlcdXvQsNn0UaBxPBlg1QWjj7";

  // grab text the user typed into the  ZIP Code search input, add as parameter to url
  var searchTerm = $("#search-zipcode").val().trim();
  queryURL += "&location=" + searchTerm;

  // Logging the URL so we have access to it for troubleshooting
  // console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

/* builds query url base on information in city/state form */
function buildQueryURLcityState() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json";

  // add the api key parameter (the one we received when we registered)
  queryURL += "?api_key=vX65llVP5vNMB4aIlcdXvQsNn0UaBxPBlg1QWjj7";

  // get text the user typed into the city field
  var city = $("#search-city").val().trim();
  // console.log("city is ", city);

  // get state selected in state field
  var state = $("#search-state").val();
  // console.log("state is ", state);
  
  // put city and state in a string
  var cityAndState = city + "+" + state;
  // console.log("cityAndState is ", cityAndState);

  // replace spaces in string with +
  var searchTerm = cityAndState.replace(/\s/g, "+");
  // console.log("searchTerm is ", searchTerm);

  queryURL += "&location=" + searchTerm;

  // Logging the URL so we have access to it for troubleshooting
  // console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}



/**
 **********************************************************
 * Main Alternative Fuel Station API Work
 **********************************************************
 */
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} AltFuelData - object containing Alt Fuel Station API data
 */
function updatePage(AltFuelData) {
  // get from the form the number of results to display
  // api doesn't have a "limit" parameter, so we have to do this ourselves
  var numStations = 5

  // var numStations = $("#station-count").val();

  // log the AltFuelData to console, where it will show up as an object
  // console.log(AltFuelData);
  // console.log("------------------------------------");

  // loop through and build elements for the defined number of stations
  for (var i = 0; i < numStations; i++) {

    // get specific station info for current index
    var station = AltFuelData.fuel_stations[i];

    // increase the stationCount (track station # - starting at 1)
    var stationCount = i + 1;

    // create the HTML well (section) and add the station content for each
    var $stationWell = $("<station>");
    $stationWell.addClass("well");
    $stationWell.attr("id", "station-well-" + stationCount);

    // unhide table#well-section
    $("#well-section").attr("style", "");

    // add the newly created element to the DOM
    $("#well-section").append($stationWell);

    var fuelType = station.fuel_type_code;
    var stationName = station.station_name;
    var street = station.street_address;
    var city = station.city;
    var state = station.state;
    var zip = station.zip;

    // if the station has a fuelType, log and append to $stationWell  
    // if (station.fuel_type_code) {
    //   console.log("------------------------------------");
    //   console.log(fuelType);
    //   console.log("------------------------------------");
    // }

    // if the station has a station_name, log and append to $stationWell
    // if (station.station_name) {
    //   console.log(stationName);
    //   console.log("------------------------------------");
    // }

    // log street, and append to document if exists
    // console.log(station.street_address);
    // if (station.street_address) {
    // }

    // log city, and append to document if exists
    // console.log(city);
    // if (city) {
    // }

    // log state, and append to document if exists
    // console.log(state);
    // if (state) {
    // }

    // log zip, and append to document if exists
    // console.log(zip);
    // if (zip) {
    // }





    /* BUTTON LOGIC (must be in this function)
    Logic for constructing modal button with unique data values for each result */

    // make string with address, city, state
    var constructDataLocationImage = station.street_address + "+" + city + "+" + state;
    // console.log("constructDataLocationImage is", constructDataLocationImage);

    // replace spaces in constructDataLocationImage with +
    var constructDataLocationImageFinal = constructDataLocationImage.replace(/\s/g, "+");
    

    // console.log("constructDataLocationImageFinal is ", constructDataLocationImageFinal);



    var dataLocationImage = constructDataLocationImageFinal;
    // var dataLocationName = "Holiday Stationstore #335";
    var dataLocationName = stationName;


    var modalLink = "<a class='jsImageButton waves-effect waves-light btn modal-trigger green' href='#modal1' data-location-image='" + dataLocationImage + "' data-location-name='" + dataLocationName + "'><i class='material-icons dp48'>image</i><span>View location</span></a>"; 




    //add data into html table
    /* before modal window changes. sjaps
    $("#well-section > tbody").append("<tr><td>" + fuelType + "</td><td>" + stationName +
      "</td><td>" + street + "<br>" + city + "," + "&nbsp;" + state + "&nbsp;" + zip +
      "</td><td>" + "Modal Button Goes Here" + "</td></tr>");
    */
   $("#well-section > tbody").append("<tr><td>" + fuelType + "</td><td>" + stationName +
   "</td><td>" + street + "<br>" + city + "," + "&nbsp;" + state + "&nbsp;" + zip +
   "</td><td>" + modalLink + "</td></tr>");




  }
}



/**
 **********************************************************
 * Modal Windows
 **********************************************************
 */

/* Modernizer needs this for modal window to work */
$(document).ready(function () {
  $('.modal').modal();
});

// Click events for view location
$("#well-section").on("click", ".jsImageButton", function () {
  // alert("clicked it");

  var imageUrlBase = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=";

  var imageUrlLocation = $(this).attr("data-location-image");

  var imageUrlKey = "&key=AIzaSyBjs2MJp6REK0q4qkuENY_D78R4jZVr4OI";


  // alt value for  image
  var imageAltParameter = $(this).attr("data-location-name");
  console.log("imageAltParameter is ", imageAltParameter);

  // src value for image
  var imageUrlFinal = imageUrlBase + imageUrlLocation + imageUrlKey;
  console.log("imageUrlFinal is ", imageUrlFinal);

  $("#jsImage").attr("src", imageUrlFinal);
  $("#jsImage").attr("alt", imageAltParameter);

  $("#jsCaption").text(imageAltParameter);

});



/**
 **********************************************************
 * Google Street View API
 **********************************************************
 */
function loadData() {
  var $address = $('#address');
  var street = $('#street').val();
  var city = $('#city').val();
  var address = street + ',' + city;

  $address.text("Address: " + address + "");

  var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + '';

  $('#photo').attr("src", streetViewURL);

  return false;
}

$('#form-container').submit(loadData);



// function to empty out the table (Possible item to add once we get it all working)
function clear() {
  $("#table-data").empty();
}

/**
 **********************************************************
 * Click Handlers
 **********************************************************
 */

// .on("click") function associated with the ZIP Code Submit Button
$("#run-zip").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // empty the region associated with the articles
  clear();

  // build the query URL for the ajax request to the ALT Fuel API
  var queryURL = buildQueryURL();

  // make the AJAX request to the API - GETs the JSON data at the queryURL.
  // the data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});


// .on("click") function associated with the City/State Submit Button
$("#run-city-state").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // empty the region associated with the articles
  clear();

  // build the query URL for the ajax request to the ALT Fuel API
  // var queryURL = buildQueryURL();
  var queryURL = buildQueryURLcityState();

  // make the AJAX request to the API - GETs the JSON data at the queryURL.
  // the data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});