import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import createEarth from "./createEarth";

export function createScene (engine, canvas) {
    let scene = new BABYLON.Scene(engine);
		window.scene = scene;

    // Add a camera to the scene and attach it to the canvas
		// const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
		const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 190, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

		const earth = createEarth(scene);
    // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;

		// const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {});
		// const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 140, segments: 32}, scene);
		// sphere.rotation.x = Math.PI;
    // sphere.rotation.y = -Math.PI/2;
    // sphere.material = new BABYLON.StandardMaterial("smat", scene);
    // sphere.material.diffuseColor = BABYLON.Color3.Gray();
    // sphere.material.wireframe = false;

		// let textureResolution = 512;
    // let adt = new GUI.AdvancedDynamicTexture("EarthTexture", textureResolution, scene);

		// let ctx = adt.getContext();

		// var img = new Image();
		// img.src = '/textures/mercator.jpg';
		// img.onload = function() {
    //   //Add image to dynamic texture
    //   ctx.drawImage(this, 0, 0);
		// 	adt.update();
    // }	

    // sphere.material.diffuseTexture = adt
    // sphere.material.backFaceCulling = false;


    //Your Code

  return scene;
};