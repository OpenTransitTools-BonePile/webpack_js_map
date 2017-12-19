import MapController from '../map';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../config.yml";

var mc = new MapController(config);

var map = mc.map;
var L = mc.getLeaflet();


import omnivore from 'leaflet-omnivore'
require("iso8601-js-period");
require('leaflet-timedimension/dist/leaflet.timedimension.control.css');
require('leaflet-timedimension/dist/leaflet.timedimension.src.js');


var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

// start of TimeDimension manual instantiation
var timeDimension = new L.TimeDimension({
        period: "PT5M",
    });

// helper to share the timeDimension object between all layers
map.timeDimension = timeDimension;
// otherwise you have to set the 'timeDimension' option on all layers.

var player = new L.TimeDimension.Player({
    transitionTime: 100,
    loop: false,
    startOver:true
}, timeDimension);

var timeDimensionControlOptions = {
    player:        player,
    timeDimension: timeDimension,
    position:      'bottomleft',
    autoPlay:      true,
    minSpeed:      1,
    speedStep:     0.5,
    maxSpeed:      15,
    timeSliderDragUpdate: true
};

var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
map.addControl(timeDimensionControl);

/*
var icon = L.icon({
    iconUrl: 'img/running.png',
    iconSize: [22, 22],
    iconAnchor: [5, 25]
});
*/

var move = true;

var customLayer = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            if(move)
                map.panTo(latLng);
            return new L.Marker(latLng);
        }
        return L.circleMarker(latLng);
    }
});

var gpxLayer = omnivore.gpx('test/running_mallorca.gpx', null, customLayer).on('ready', function() {
    console.log('done loading data');
});

var gpxTimeLayer = L.timeDimension.layer.geoJson(gpxLayer, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});


/*
var overlayMaps = {
    "GPX Layer": gpxTimeLayer,
    "KML Layer": kmlTimeLayer
};
L.control.layers(baseLayers, overlayMaps).addTo(map);
*/

gpxTimeLayer.addTo(map);