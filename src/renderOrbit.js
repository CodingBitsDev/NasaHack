import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';

let renderInterval = null;

export function updateOrbit(orbit) {
    let delta = Date.now() / (60 * 1000) - 27219648;
    let res = orbit.options.points.length;
    for (let i = 0; i < res; i++){
        let pos = satellite.sgp4(orbit.satrec, i / 10 + delta).position;
        let point = orbit.options.points[i];
        point.x = pos.x / 100;
        point.y = pos.y / 100;
        point.z = pos.z / 100;
    }

    orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", orbit.options);
}

export default function createOrbit(scene, tle, color){
    // Sample TLE
    var tleLine1 = '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927',
    tleLine2 = '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537';  

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

    renderInterval = setInterval(() => {
        updateOrbit(orbit)
    }, 100) 
    
    return orbit;
}

export function dispose(){
    if (renderInterval) clearInterval(renderInterval)
}