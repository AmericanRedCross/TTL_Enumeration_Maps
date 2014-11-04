// Create a map in the div #map
L.mapbox.accessToken = 'pk.eyJ1IjoiYW1lcmljYW5yZWRjcm9zcyIsImEiOiJzdHVRWjA4In0.bnfdwZhKX8tQeMkwY-kknQ';

L.mapbox.map('map', 'americanredcross.39356e17')
    .setView([11.0848,124.9269],12);

//lets get barangay.json

$.ajax({
    type: 'GET',
    url: 'data/barangays.json',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
    success: function(json) {
        guineaCities = json;
        console.log('Success');
    },
    error: function(e) {
        console.log(e);
        console.log('Error');
    }
});

// Switch between barangays

//option for barangays
//changes location of map to selected barangay centroid (lat/long)
$('#navigation').change(function() {
    var place = $('#navigation option:selected').text();

    $.each(barangay, function(index, item) {
        if (place == item.barangay) {
            var latlng = L.latLng(item.lat, item.lon);
            map.setView(latlng, 17);
        }
    });

});

// Populate interactive charts into a barangay sidebar

