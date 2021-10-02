import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';
import Orbit from './BabylonComponents/Orbit';

let renderInterval = null;

export function updateOrbit(orbit) {
    let res = orbit.options.points.length;
    var time = new Date();
    var gmst = satellite.gstime(time);
    let test = satellite.eciToGeodetic(satellite.propagate(orbit.satrec, time).position);
    //console.log(test);
    //console.log(satellite.degreesLong(test.longitude), satellite.degreesLat(test.latitude));
    for (let i = 0; i < res; i++){
        
        let pos = satellite.eciToEcf(satellite.propagate(orbit.satrec, time).position, gmst);
        let point = orbit.options.points[i];
        point.x = pos.y / 100;
        point.y = pos.z / 100;
        point.z = -pos.x / 100;
        time.setSeconds(time.getSeconds() - 30);
    }

    orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", orbit.options);
}

export default function createOrbit(scene, tle, color){
    // Sample TLE
    var tleLine1 = '1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993',
    tleLine2 = '2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232';  
    
    // Initialize a satellite recor
    let orbit = new Orbit(tleLine1, tleLine2, null, scene)

    let interval =  setInterval(() => {
       orbit.updateOrbit(); 
    }, 100);
    return orbit
}