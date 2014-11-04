// Create a map in the div #map
L.mapbox.accessToken = 'pk.eyJ1IjoiYW1lcmljYW5yZWRjcm9zcyIsImEiOiJzdHVRWjA4In0.bnfdwZhKX8tQeMkwY-kknQ';

L.mapbox.map('map')
    .setView([11.0848,124.9269],12);

// Let's get barangays.json

$.ajax({
    type: 'GET',
    url: 'data/barangays.json',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
    success: function(json) {
        barangays = json;
        console.log('Success');
    },
    error: function(e) {
        console.log(e);
        console.log('Error');
    }
});

// Switch between barangays

// Option for barangays
// Changes location of map to selected barangay centroid (lat/long)
$('#navigation').change(function() {
    var place = $('#navigation option:selected').text();

    $.each(barangays, function(index, item) {
        if (place == item.barangay) {
            var latlng = L.LatLng(item.lat, item.lon);
            map.setView(latlng, 17);
        }
    });

});

// Populate interactive charts into a barangay sidebar

