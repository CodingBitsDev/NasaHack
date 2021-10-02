import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';

export default class Orbit{
	constructor(uid, tle1, tle2, color , scene ){
		this.uid = uid;
		this.color = color || new BABYLON.Color4(1,1,1, 0.5)
		this.scene = scene;
    this.tleLine1 = tle1;
    this.tleLine2 = tle2;

		this._enabled = false;

    // Initialize a satellite record
    let satrec = satellite.twoline2satrec(this.tleLine1, this.tleLine2);

    let points = [];
    let colors = [];

    const res = 100;
    for (let i = 0; i < res; i++){
        points.push(new BABYLON.Vector3(0, 0, 0));
        colors.push(new BABYLON.Color4(this.color.r, this.color.g, this.color.b, (res - i) / res * this.color.a));
    }

		this.currentPosition = points[0];
  
    const options = {
        points, 
        colors,
        updatable: true
    }
  
    let lines = BABYLON.MeshBuilder.CreateLines("orbit_" + this.uid, options, this.scene);
		lines.setEnabled(this._enabled)

    options.instance = lines;

    this.orbit = {
        satrec,
        options,
				instance: lines,
    };
	}

	setEnabled(enabled){
		this._enabled = enabled
		this.orbit.options.instance.setEnabled(this._enabled)
	}


	update() {
    let res = this.orbit.options.points.length;
    var time = new Date();
    var gmst = satellite.gstime(time);
    let test = satellite.eciToGeodetic(satellite.propagate(this.orbit.satrec, time).position);
    for (let i = 0; i < res; i++){
        
        let pos = satellite.eciToEcf(satellite.propagate(this.orbit.satrec, time).position, gmst);
        let point = this.orbit.options.points[i];
        point.x = pos.y / 100;
        point.y = pos.z / 100;
        point.z = -pos.x / 100;
        time.setSeconds(time.getSeconds() - 30);
    }

    this.orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", this.orbit.options);
		if (this._enabled){
			console.log("###", this._enabled)
		}
		this.orbit.options.instance.setEnabled(this._enabled)
		this.currentPosition = this.orbit.options.points[0]
	}
}