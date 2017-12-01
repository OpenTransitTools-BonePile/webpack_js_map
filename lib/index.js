//require("./sass/main");
require("leaflet_css");
//require("leaflet_marker");
//require("leaflet_marker_2x");
//require("leaflet_marker_shadow");

var json = require("json-loader!yaml-loader!./config.yml");
var L = require('leaflet');
var map = L.map('main').setView([45.6, -122.5], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([45.65, -122.6]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


//var leaflet = require('node_modules')
