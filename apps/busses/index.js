import MapController from '../map';
import 'leaflet-ajax';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../config.yml";

var mc = new MapController(config);

var geojsonLayer = new L.GeoJSON.AJAX("http://localhost:54145/vehicles_via_route?id=12");
geojsonLayer.addTo(mc.getMap());
