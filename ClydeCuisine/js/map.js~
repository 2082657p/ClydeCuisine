/**
 * Google maps constructor
 * TODO: get Glasgow Lat/Lng
 */
 
 
 
 
$(document).ready(function () {
    var bi = new google.maps.LatLng(55.864442,-4.256815);
    var mapOptions = {
        center: new google.maps.LatLng(55.864442, -4.256815),
        zoom:16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    
    /**
     * Stub animation for testing
     * 
     */
    var marker = new google.maps.Marker({
        map: map,
        title: 'McDonalds Sauchiehall',
        animation: google.maps.Animation.BOUNCE
    });
    marker.setPosition(bi);
    /**
     * Toggles between showing and not showing the map
     * 
     */
    $("#btn").click(function () {
        $("#map_canvas").toggle();
    });

});

