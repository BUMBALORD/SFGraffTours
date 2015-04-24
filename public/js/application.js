$(document).ready(function() {
        var map;
        var service;
        var marker;
        var pos;
        var infowindow;
        // var jadeMemorial = new google.maps.LatLng(37.809757, -122.269482);
        // var ceavBerkeley = new google.maps.LatLng(37.871689, -122.302293);
        // var oneAmSF = new google.maps.LatLng(37.779870, -122.407341);
        // var neonApex = new google.maps.LatLng(37.779555, -122.406955);
        // var natrl = new google.maps.LatLng(37.779004, -122.408427);
        var markersArray = [];
        var instaArray = [];
        var ACCESSTOKEN = "";



        function initialize() {

            var mapOptions = {
                zoom: 11

            };

            var map =   new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);

            var transitLayer = new google.maps.TransitLayer();
                transitLayer.setMap(map);

            //  var natrlMarker = new google.maps.Marker({
            //     position: natrl,
            //     map: map,
            //     icon: "http://i.imgur.com/jDD71tN.jpg",
            //     title: 'Natrl Wall',
            //     animation: google.maps.Animation.DROP
            //     });

            // var oneAmMarker = new google.maps.Marker({
            //     position: oneAmSF,
            //     map: map,
            //     icon: "http://i.imgur.com/eM4SbEM.jpg",
            //     title: '1AM Wall',
            //     animation: google.maps.Animation.DROP
            //     });

            // var jadeMarker = new google.maps.Marker({
            //     position: jadeMemorial,
            //     map: map,
            //     icon: "http://i.imgur.com/A6WtfXr.jpg",
            //     title: 'Jade Memorial',
            //     animation: google.maps.Animation.DROP
            //     });

            // var ceavMarker = new google.maps.Marker({
            //     position: ceavBerkeley,
            //     map: map,
            //     icon: "http://i.imgur.com/mEbjZGR.jpg",
            //     title: 'Berkeley Ceaver',
            //     animation: google.maps.Animation.DROP
            //     });

            // var neonApexMarker = new google.maps.Marker({
            //     position: neonApex,
            //     map: map,
            //     icon: "http://i.imgur.com/vyiqKI5.jpg",
            //     title: 'Neon Apex 49ers',
            //     animation: google.maps.Animation.DROP
            //     });

            // google.maps.event.addListener(natrlMarker, 'click', function() {
            //    map.setCenter(natrlMarker.getPosition());
            // });

            // google.maps.event.addListener(oneAmMarker, 'click', function() {
            //    map.setCenter(oneAmMarker.getPosition());
            // });

            // google.maps.event.addListener(ceavMarker, 'click', function() {
            //    map.setCenter(ceavMarker.getPosition());
            // });

            // google.maps.event.addListener(jadeMarker, 'click', function() {
            //    map.setCenter(jadeMarker.getPosition());
            // });

            // google.maps.event.addListener(neonApexMarker, 'click', function() {
            //    map.setCenter(neonApexMarker.getPosition());
            // });

            //HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


                    infowindow = new google.maps.InfoWindow({
                        map: map,
                        position: pos,
                        content: 'You are here!',
                        shadowStyle: 4,
                        backgroundColor: 'rgb(57,57,57)',
                        borderRadius: 5,

                    });

                    var circle = new google.maps.Circle({
                        map: map,
                        position: pos,
                        radius: 100,
                        fillColor: '#5CB8E6'


                    });
                    circle.bindTo('center', infowindow, 'position');
                    map.setCenter(pos);
                    infowindow = new google.maps.InfoWindow();
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                },

                    function () {
                        handleNoGeolocation(true);
                    });
            } else {
                handleNoGeolocation(false);
            }

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });

            }
        }

        google.maps.event.addDomListener(window, 'load', initialize);


        function getPictures(event){
        event.preventDefault();
        tag = $("#hashtag").val()
        debugger
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/tags/"+tag+"/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
           success: function(data) {
             for (var i = 0; i < 20; i++) {
             $(".popular").append("<li><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
             }
           }
        })
        }


        $('#search').on('click', getPictures)


});
