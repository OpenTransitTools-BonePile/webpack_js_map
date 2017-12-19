/**
 *
 * https://github.com/socib/Leaflet.TimeDimension
 *
 * http://apps.socib.es/Leaflet.TimeDimension/examples/
 *
 * http://apps.socib.es/Leaflet.TimeDimension/examples/example9.html
 *
 * http://apps.socib.es/Leaflet.TimeDimension/examples/example14.html
 * http://apps.socib.es/Leaflet.TimeDimension/examples/example12.html
 * https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=location,closed_date,complaint_type,street_name,created_date,status,unique_key,agency_name,due_date,descriptor,location_type,agency,incident_address&complaint_type=Noise - Commercial
 */

import omnivore from 'leaflet-omnivore'
require("iso8601-js-period");
require('leaflet-timedimension/dist/leaflet.timedimension.control.css');
require('leaflet-timedimension/dist/leaflet.timedimension.src.js');


export default class VehicleTimeline {

    constructor(map, move) {
        var startDate = new Date();
        startDate.setUTCHours(0, 0, 0, 0);

        // start of TimeDimension manual instantiation
        var timeDimension = new L.TimeDimension({
            period: "PT5M",
        });

        // helper to share the timeDimension object between all layers
        map.timeDimension = timeDimension;
        // otherwise you have to set the 'timeDimension' option on all layers.

        console.log("make TD player");
        var player = new L.TimeDimension.Player({
            transitionTime: 100,
            loop: false,
            startOver:true
        }, timeDimension);

        console.log("make TD controller");
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


        console.log("load TD data");
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

        console.log("add TD layer to map");
        gpxTimeLayer.addTo(map);

        console.log("done");
    }
}