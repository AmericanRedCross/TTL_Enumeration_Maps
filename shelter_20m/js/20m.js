// Create a map in the div #map
L.mapbox.accessToken = 'pk.eyJ1IjoiYW1lcmljYW5yZWRjcm9zcyIsImEiOiJzdHVRWjA4In0.bnfdwZhKX8tQeMkwY-kknQ';

var map = L.mapbox.map('map','americanredcross.b9f58b6e')
    .setView([10.99904,124.9001],11);

//lets get barangay.json

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

//option for barangays
//changes location of map to selected barangay centroid (lat/long)
$('#navigation').change(function() {
    var place = $('#navigation option:selected').text();

    $.each(barangays, function(index, item) {
        if (place == item.barangay) {
            var latlng = new L.latLng(item.lat, item.lon);
            map.setView(latlng, 17);
        }
    });

});
