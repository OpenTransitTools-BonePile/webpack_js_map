import MapController from '../../map';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../../config.yml";

var mc = new MapController(config);
mc.addMarker([45.52, -122.68],  mc.getMap(), 'A pretty CSS3 popup.<br> Easily customizable.', '<b>blah</b><br><i>blah</i><br>blah', true);
