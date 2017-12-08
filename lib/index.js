require("leaflet_css");
const L = require('leaflet');

// leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet_marker_2x"),
  iconUrl: require("leaflet_marker"),
  shadowUrl: require("leaflet_marker_shadow")
});


const json = require("json-loader!yaml-loader!./config.yml");



class MapController {
    constructor(config) {
        self.markers = [];
        self.config = config;

        // make map
        var lat = config.initLat || 45.5;
        var lon = config.initLon || -122.5;
        var zoom = config.initZoom || 11;
        self.map = L.map('main').setView([lat, lon], zoom);

        // make base layers
        self.baseLayers = {};
        var bl = config.baseLayers;
        for(var i in bl) {
            var name = bl[i].name;
            var l = L.tileLayer(bl[i].url, {id:name, attribution: bl[i].attribution});
            self.baseLayers[name] = l;
            l.addTo(self.map);
        }

        // make layer controller
        self.control = L.control.layers(self.baseLayers);
        if(config.layerCtlPos)
            self.control.setPosition(config.layerCtlPos);
        self.control.addTo(self.map);
    }

    getMap() {
        return self.map;
    }

    addMarker(coord, layer, content, tooltip, open) {
        var m = L.marker(coord);
        self.markers.push(m);

        if(content) m.bindPopup(content);
        if(layer)   m.addTo(layer);
        if(tooltip) m.bindTooltip(tooltip);
        if(open)    m.openPopup();
    }

    addLayer(coord, content, layer, open) {

    }
}


var mc = new MapController(json.map);
mc.addMarker([45.65, -122.6],  mc.getMap(), 'A pretty CSS3 popup.<br> Easily customizable.', 'blah<br>blah<br>blah', true);
