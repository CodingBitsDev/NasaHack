import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import * as satellite from 'satellite.js';

export default class Orbit{
	constructor(uid, tle1, tle2, color , scene, enabled = false ){
    this.uid = uid;
    this.color = color || new BABYLON.Color4(1,1,1, 0.5)
    this.scene = scene;
    this.tleLine1 = tle1;
    this.tleLine2 = tle2;

    this.isEnabled = false;


    // Initialize a satellite record
    let satrec = satellite.twoline2satrec(this.tleLine1, this.tleLine2);

    let points = [];
    let colors = [];

    const res = 50;
    for (let i = 0; i < res; i++){
        points.push(new BABYLON.Vector3(0, 0, 0));
        colors.push(new BABYLON.Color4(this.color.r, this.color.g, this.color.b, (res - i) / res * this.color.a));
    }

    this.currentPosition = points[0];
    this.currentVelocity = 0;
    this.currentMovement = new BABYLON.Vector3(0, 0, 0);
    this.currentHeight = 0;
    this.currentCoordinates = new BABYLON.Vector2();
  
    const options = {
        points, 
        colors,
        updatable: true
    }
  
    if (this.isEnabled){
        let lines = BABYLON.MeshBuilder.CreateLines("orbit_" + this.uid, options, this.scene);
        options.instance = lines;
    }

    this.orbit = {
        satrec,
        options,
    };

    this.setEnabled(false)
}

setEnabled(enabled, colision){
    if (enabled) {
        this.isEnabled = true
    }
    else {
        if (this.orbit.options.instance){
            this.orbit.options.instance.dispose(); 
            this.orbit.options.instance = null;
        }
        this.isEnabled = false
    } 
    this.update();
    if (colision && enabled){

    }
}


update() {
    let length = this.orbit.options.points.length;
    var time = new Date(this.scene.globalTime); 
    var gmst = satellite.gstime(time);
    
    for (let i = 0; i < (this.isEnabled ? length : 1); i++){
        //var gmst = satellite.gstime(time);
        let posVel = satellite.propagate(this.orbit.satrec, time);
        if (!posVel || !posVel.velocity || !posVel.position) continue;
    
        let pos = satellite.eciToEcf(posVel.position, gmst);
        let point = this.orbit.options.points[i];
        point.x = pos.x / 100;
        point.y = pos.z / 100;
        point.z = pos.y / 100;

        if (i === 0) {
            this.currentPosition = point;
            let vel = satellite.eciToEcf(posVel.velocity, gmst);
            this.currentMovement = new BABYLON.Vector3(vel.x, vel.z, vel.y);
            this.currentVelocity = this.currentMovement.length();
            this.currentMovement.scaleInPlace(0.01);
            this.currentGeodetic =  satellite.eciToGeodetic(posVel.position, gmst);
            /*this.currentMovement = (new BABYLON.Vector3(
                this.orbit.options.points[0].x - this.orbit.options.points[1].x,
                this.orbit.options.points[0].y - this.orbit.options.points[1].y,
                this.orbit.options.points[0].z - this.orbit.options.points[1].z)).scale(1 / 60);*/
        }

        time.setSeconds(time.getSeconds() - 60);
    }

    if (this.isEnabled && this.orbit.options.instance){
        this.orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", this.orbit.options);
    } else if (this.isEnabled ) {
        this.orbit.options.instance = BABYLON.MeshBuilder.CreateLines("lines", this.orbit.options, this.scene);
    }
    this.currentPosition = this.orbit.options.points[0]
	}
}