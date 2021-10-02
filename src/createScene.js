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

  let path = [];
  const res = 100;
  for (let i = 0; i < res + 1; i++){
    path.push(new BABYLON.Vector3(
      Math.sin(i * Math.PI * 2 / res) * 75,
      0,
      Math.cos(i * Math.PI * 2 / res) * 75
    ))
  }

  const options = {
    points: path, //vec3 array,
    updatable: true
  }

  let lines = BABYLON.MeshBuilder.CreateLines("lines", options, scene);

  return scene;
};