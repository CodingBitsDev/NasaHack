import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';

export function updateOrbit(orbit) {
    let delta = Date.now() / (60 * 1000) - 27219648;
    console.log(delta);
    let res = orbit.options.points.length;
    for (let i = 0; i < res; i++){
        let pos = satellite.sgp4(orbit.satrec, i / 10 + delta).position;
        let point = orbit.options.points[i];
        point.x = pos.x / 70;
        point.y = pos.y / 70;
        point.z = pos.z / 70;
    }

    orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", orbit.options);
}

export default function createOrbit(scene, tle, color){
    // Sample TLE
    var tleLine1 = '1 25544U 98067A   19156.50900463  .00003075  00000-0  59442-4 0  9992',
    tleLine2 = '2 25544  51.6433  59.2583 0008217  16.4489 347.6017 15.51174618173442';    

    // Initialize a satellite record
    var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    let points = [];
    let colors = [];

    const res = 100;
    for (let i = 0; i < res; i++){
        points.push(new BABYLON.Vector3(0, 0, 0));
        colors.push(new BABYLON.Color4(1, 1, i / res, i / res));
    }
  
    const options = {
        points, 
        colors,
        updatable: true
    }
  
    let lines = BABYLON.MeshBuilder.CreateLines("lines", options, scene);

    options.instance = lines;

    let orbit = {
        satrec,
        options,
    };

    updateOrbit(orbit);
    
    return orbit;
}