import MapController from '../map';
import 'leaflet-ajax';
import 'leaflet-rotatedmarker';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../config.yml";

var mc = new MapController(config);


var geojsonLayer = new L.GeoJSON.AJAX("http://localhost:54145/vehicles_via_route?id=12", {
    pointToLayer: function(pt, latlng) {
        console.log("marker at " + latlng);
        var lat = pt.properties.lat;
        var lon = pt.properties.lon;
        var ll = L.latLng(lat, lon);
        var ic = L.icon({
            iconUrl: 'https://maps.trimet.org/images/map/misc/vehicle-arrow.png',
            iconSize: [15, 15],
            iconAnchor: [7, 7],
            popupAnchor: [0, -6]
        });
        return L.marker(ll, {
                icon: ic,
                rotationAngle: pt.properties.heading
            }
        );
    }
    }).bindPopup(function (layer) {
        console.log("popup");
        return layer.feature.properties.destination;
    });

geojsonLayer.addTo(mc.getMap());
