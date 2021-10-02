import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import createEarth from "./createEarth";
import renderOrbit, { updateOrbit } from './renderOrbit';

var orbit;

export function createScene (engine, canvas) {
  let scene = new BABYLON.Scene(engine);
	window.scene = scene;

 	// Add a camera to the scene and attach it to the canvas
	// const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 190, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
	light.intensity = 0.7;
	light.diffuse = new BABYLON.Vector3(3,3,3)

	const earth = createEarth(scene);


  orbit = renderOrbit(scene);

  return scene;
};

export function updateScene() {
  updateOrbit(orbit);
}