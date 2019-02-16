import MapController from '../map';
import 'leaflet-ajax';
import 'leaflet-rotatedmarker';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../config.yml";

var mc = new MapController(config);


var geojsonLayer = new L.GeoJSON.AJAX("http://localhost:54145/vehicles_via_route?id=12", {
    pointToLayer: function(geoJsonPoint, latlng) {
        console.log("marker at " + latlng);
        var lat = geoJsonPoint.properties.lat
        var lon = geoJsonPoint.properties.lon
        var ll = L.latLng(lat, lon)
        return L.marker(ll, {
                rotationAngle: 45
            }
        );
    },
    xstyle: function (feature) {
        return {color: '#FF0000'};
    }}).bindPopup(function (layer) {
        console.log("popup");
        return layer.feature.properties.destination;
    });

geojsonLayer.addTo(mc.getMap());
