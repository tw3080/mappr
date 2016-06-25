// Initialize variables
var flickrKey = 'bd5883080cd861f2e51ffc57c3e6b717';
var radius = 1;
var photoGallery = [];
var gallery = $('#gallery');

// Initialize map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    // Center initializes to Seattle, WA
    // TODO: possibly use user's geolocation to initially center map?
    center: {lat: 47.60621, lng: -122.332071},
    zoom: 12
  });
  var geocoder = new google.maps.Geocoder();
  // Submit button click event
  // TODO: pressing enter should have same affect as clicking button
  $('.search-bar').submit(function(e) {
    e.preventDefault();
    geocodeAddress(geocoder, map);
    // var location = $(this).find('#address').val();
  });
}

// Geocode address which user inputted
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    // Global latititude and longitude variables
    lat = results[0].geometry.location.lat();
    lng = results[0].geometry.location.lng();
    getPhotos(lat, lng);
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      // Adds marker for each searched address on map
      /*
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      */
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Gets flickr photos (public only) based on the location inputted by the user
function getPhotos(lat, lng) {
  var params = {
    format: 'json',
    method: 'flickr.photos.search',
    api_key: flickrKey,
    nojsoncallback: 1,
    accuracy: 12,
    lat: lat,
    lon: lng,
    radius: radius,
    radius_units: 'mi'
  };

  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    type: 'GET',
    data: params,
    success: function(response) {
      // Appends photos to #gallery
      $.each(response.photos.photo, function(i, item) {
        var url = 'http://farm' +
          item.farm +
          '.staticflickr.com/' +
          item.server +
          '/' +
          item.id +
          '_' +
          item.secret +
          '.jpg';
        // var a = $('<a>').attr('href', '#');
        var img = $('<img>').attr('src', url);
        // a.append(img);
        // $('#gallery').append(a);
        $('#gallery').append(img);
      });
    }
  })
  // TODO: Add a more descriptive error alert/message
  .fail(function(jqXHR, error) {
    console.log('fail');
  });
}

$(function() {
  $('.search-bar').submit(function(e) {

  });
});
