import 'leaflet_css';
import 'pelias_css';
import 'app_css';
import 'leaflet_fullscreen_css';
import 'leaflet_measure_css';
import 'leaflet_locate_css';

import 'leaflet.locatecontrol/dist/L.Control.Locate.css';

import 'font-awesome/fonts/fontawesome-webfont.ttf';
import 'font-awesome/css/font-awesome.css';


import L from 'leaflet';
import 'leaflet-geocoder-mapzen';
import 'leaflet-fullscreen';
import 'leaflet.polylinemeasure';
import 'leaflet.locatecontrol';


// leaflet icons (special handling under webpack importing)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet_marker_2x'),
    iconUrl: require('leaflet_marker'),
    shadowUrl: require('leaflet_marker_shadow')
});


export default class MapController {
    /**
     * @constructor
     * @param {Object} config ... json object (probably parsed from config.yml
     * @see config.yml
     */
    constructor(config) {
        this.markers = [];
        this.config = config;

        // make map
        var lat = config.map.initLat || 45.5;
        var lon = config.map.initLon || -122.5;
        var zoom = config.map.initZoom || 11;
        this.map = L.map('main', {
            center: [lat, lon],
            zoom: zoom
        });

        // make geocoder -- order matters for controls
        this.addGeoCoder();

        // make base layers
        this.baseLayers = {};
        var layer = null;
        var bl = config.map.baseLayers;
        for(var i in bl) {
            var name = bl[i].name;
            var l = L.tileLayer(bl[i].url, {id: name, attribution: bl[i].attribution, maxZoom: bl[i].maxZoom});
            this.baseLayers[name] = l;
            if(layer == null)
                layer = l;
        }
        layer.addTo(this.map);

        // make layer controller
        this.control = L.control.layers(this.baseLayers);
        if(config.map.layerCtlPos)
            this.control.setPosition(config.map.layerCtlPos);
        this.control.addTo(this.map);

        // other controls
        // TODO : config these on / off
        L.control.locate({position: 'topright', strings: {title: "Show me where I am, yo!"}}).addTo(this.map);

        this.map.addControl(new L.Control.Fullscreen());
        L.control.scale({maxWidth:240, metric:false, imperial:true, position: 'bottomleft'}).addTo(this.map);
        L.control.polylineMeasure({unit:'landmiles', clearMeasurementsOnStop:true, showMeasurementsClearControl:true, showUnitControl: true}).addTo(this.map);
    }

    getMap() {
        return this.map;
    }

    addMarker(coord, layer, content, tooltip, open) {
        var m = L.marker(coord);
        this.markers.push(m);

        if(content) m.bindPopup(content);
        if(layer)   m.addTo(layer);
        if(tooltip) m.bindTooltip(tooltip);
        if(open)    m.openPopup();
    }

    addLayer(coord, content, layer, open) {
    }

    /** https://github.com/mapzen/leaflet-geocoder */
    addGeoCoder() {
        var options = {
            fullWidth: 500,
            position: 'topright',
            expanded: true,
            focus: true
        };
        var key = 'mapzen-KEY-HERE';
        if(this.config.geocoder) {
            Object.assign(options, this.config.geocoder);
            key = this.config.geocoder.MAPZEN_KEY;
        }
        L.control.geocoder(key, options).addTo(this.map);
    }

    getLeaflet() {
        return L;
    }
}
