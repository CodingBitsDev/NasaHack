import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';


import Earth from './BabylonComponents/Earth';
import createAxis from './createAxis';
import renderOrbit, { updateOrbit } from './renderOrbit';

import { earthData } from "./spaceTrackDataSet.json.js";

var orbit;
var data;

export function createScene (engine, canvas) {
  let scene = new BABYLON.Scene(engine);

	//Inspector
  let inspectorVisible = false;
	document.addEventListener("keydown", evt => {
		var shortcutPressed = evt.key === "b" && evt.ctrlKey && evt.altKey;
		if (!shortcutPressed) return;
		if (inspectorVisible) {
			scene.debugLayer.hide();
		} else {
			scene.debugLayer.show();
		}
		inspectorVisible = !inspectorVisible;
	});

	window.scene = scene;

 	// Add a camera to the scene and attach it to the canvas
	// const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 190, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
	light.intensity = 0.7;
	light.diffuse = new BABYLON.Vector3(3,3,3)

  console.log(earthData);

	const earth = new Earth(scene);


  createAxis(scene);

  orbit = renderOrbit(scene);


  return scene;
};

export function updateScene() {
  updateOrbit(orbit);
}