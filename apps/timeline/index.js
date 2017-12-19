import MapController from '../map';

// this is a webpack loader, which converts yaml into json
import config from "json-loader!yaml-loader!../config.yml";
import VehicleTimeline from './vehicle_timeline';


var mc = new MapController(config);

var map = mc.map;
var V = new VehicleTimeline(map, true);
