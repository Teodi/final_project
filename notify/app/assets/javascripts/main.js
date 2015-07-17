function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        alert('You denied geolocation...')
    }
}; // getLocation


//
function initialize() {
    getLocation(function(location) {
        console.log(location)
        var markers = [];
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 16,
            center: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }


        });

        var latlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        console.log('creating marker');
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "You're here!"
        });

        marker.setMap(map);

        var circle = new google.maps.Circle({
            radius: 5000,
            center: latlng
        })



        var option = {
            bounds: circle.getBounds()

        };

        var searchBox = new google.maps.places.SearchBox(document.getElementById('searchPlace'), option);

        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }
            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };


                // Create a marker for each place.
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location
                });

                var infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);
                var request = {
                  placeId: place.place_id
                }
                service.getDetails(request, function(p, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: p.geometry.location
                        });
                        // debugger;
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent(p.name + "<br/>" + p.formatted_address + "<br/>" + '<a href="' + p.formatted_phone_number + '">Call us</a>' + "<br/>" + '<a href="' + p.website + '">Visit Website</a>');
                            infowindow.open(map, this);
                        });
                    }


                })

                markers.push(marker);

                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
        });
        // Bias the SearchBox results towards places that are within the bounds of the
        // current map's viewport.
        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });
    })



}; // initialize

$(document).on('ready', function() {
    google.maps.event.addDomListener(window, 'load', initialize);
})
