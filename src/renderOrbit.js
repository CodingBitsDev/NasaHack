import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';
import Orbit from './BabylonComponents/Orbit';

export function updateOrbit(orbit, time) {
    let res = orbit.options.points.length;
    var gmst = satellite.gstime(time);
    for (let i = 0; i < res; i++){
        
        let pos = satellite.eciToEcf(satellite.propagate(orbit.satrec, time).position, gmst);
        let point = orbit.options.points[i];
        point.x = pos.x / 100;
        point.y = pos.z / 100;
        point.z = pos.y / 100;
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
       orbit.updateOrbit(new Date()); 
    }, 100);
    return orbit
}