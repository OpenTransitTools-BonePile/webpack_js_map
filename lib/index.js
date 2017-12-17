import 'leaflet_css';
import 'pelias_css';

import L from 'leaflet';
import G from 'leaflet-geocoder-mapzen';


// leaflet icons (special handling under webpack importing)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet_marker_2x'),
    iconUrl: require('leaflet_marker'),
    shadowUrl: require('leaflet_marker_shadow')
});

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!./config.yml";


class MapController {
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

        // make base layers
        this.baseLayers = {};
        var layer = null;
        var bl = config.map.baseLayers;
        for(var i in bl) {
            var name = bl[i].name;
            var l = L.tileLayer(bl[i].url, {id: name, attribution: bl[i].attribution});
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

        // make geocoder
        this.addGeoCoder();
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

    addGeoCoder() {
        var options = {
          position: 'topright',
          expanded: true
        };
        var key = 'mapzen-KEY-HERE';
        if(this.config.geocoder) {
            Object.assign(options, this.config.geocoder);
            key = this.config.geocoder.MAPZEN_KEY;
        }
        L.control.geocoder(key, options).addTo(this.map);
    }
}



var mc = new MapController(config);
mc.addMarker([45.65, -122.6],  mc.getMap(), 'A pretty CSS3 popup.<br> Easily customizable.', '<b>blah</b><br><i>blah</i><br>blah', true);
