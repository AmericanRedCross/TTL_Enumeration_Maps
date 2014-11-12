// Create a map in the div #map

L.mapbox.accessToken = 'pk.eyJ1IjoiYW1lcmljYW5yZWRjcm9zcyIsImEiOiJzdHVRWjA4In0.bnfdwZhKX8tQeMkwY-kknQ';

var map = L.mapbox.map('map', 'americanredcross.3fa11223')
    .setView([11.0848,124.9269],12);

// Let's get our jsons - barangays.json and maps.json

var barangays;

var maps;

$.ajax({
    type: 'GET',
    url: 'data/barangays.json',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
    success: function(json) {
        barangay = json;
        console.log('Barangays success');
    },
    error: function(e) {
        console.log(e);
        console.log('Error');
    }
});

$.ajax({
    type: 'GET',
    url: 'data/maps.json',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
    success: function(json) {
        maps = json;
        console.log('Maps success');
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
            var latlng = new L.latLng(item.lon, item.lat);
            map.setView(latlng, 15);
        }
    });

});

// Switch between maps
// Changes map to selected feature and changes legend to corresponding items

// Drishtie, you'll need to populate a separate .json with the mapbox IDs and corresponding legend HTML to make this code work.

function changemap(data) {

    var html = "";

    $('#map_navigator').change(function() {
        $.each(maps, function(index, item) {
            if (place == item.map) {
                console.log('the current selection is ' + place);
                createLayer(item.mapboxID).addTo(map);
            }
        });

        $.each(maps, function(index,item) {
            if (place == item.map) {
                var itemhtml = item.html;
            }
        });

        html = html+itemhtml;
        $('#legend').html(html);

    });

}

// Populate interactive charts into a barangay sidebar

// Kick start the change function

changemap();

