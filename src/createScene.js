import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import renderTrash from './renderTrash';
import checkCollision from './checkCollision';
import Earth from './BabylonComponents/Earth';
import Axis from './BabylonComponents/Axis';
import { setActionManager } from './setActionManager';

let trash;

export function createScene (engine, canvas) {
  let scene = new BABYLON.Scene(engine);
	scene.autoUpdateTime = true;
	scene.globalTime = new Date();
	scene.update = updateScene
	scene.canvas = canvas
	scene.timeListener = new Set();
	scene.onTimeUpdated = (listener) => {
		scene.timeListener.add(listener)
		listener(scene.globalTime);
	};
	scene.setGlobalTime = (time) => {
		scene.globalTime = time
		scene.timeListener.forEach(listener => {
			if (listener) try {
				listener(scene.globalTime)
			} catch (e) { console.warn(e) }
		});
	}
	

	scene.useGeometryIdsMap = true

	setInterval(() => {
		scene.update();
	}, 100)


	window.scene = scene;

	//Inspector
  let inspectorVisible = false;
  let axis = new Axis(scene);

	document.addEventListener("keydown", evt => {
		var shortcutPressed = evt.key === "b" && evt.ctrlKey && evt.altKey;
		if (!shortcutPressed) return;
		if (inspectorVisible) {
			scene.debugLayer.hide();
			axis.toggle()
		} else {
			scene.debugLayer.show();
			axis.toggle()
		}
		inspectorVisible = !inspectorVisible;
	});

 	// Add a camera to the scene and attach it to the canvas
	// const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 190, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
	// light.intensity = 0.7;
	// light.diffuse = new BABYLON.Vector3(3,3,3)
	setActionManager(scene);

	createTemplateSphere(scene);
	createTemplateSphereHiglighted(scene);

	const earth = new Earth(scene);

  trash = renderTrash(scene);

  scene.clearColor = new BABYLON.Color3(0, 0, 0);

  return scene;
};

export function updateScene() {
  let collision = checkCollision(trash, 0.2);
  if (collision.crash) {
    collision.trash1.setActive(true);
    collision.trash2.setActive(true);
  }

	if (this.autoUpdateTime) this.setGlobalTime( new Date() );
}

function createTemplateSphere(scene){
		let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, segments: 3}, scene);
		sphere.material = new BABYLON.StandardMaterial("sphereMat", scene);    				
		sphere.material.emissiveColor = new BABYLON.Vector3(0.8,0.8,0.8)
		sphere.material.freeze();
		sphere.isVisible = false;
		scene.templateSphere = sphere
}

function createTemplateSphereHiglighted(scene){
		let sphere = BABYLON.MeshBuilder.CreateSphere("selectSphere", {diameter: 0.6, segments: 3}, scene);
		sphere.material = new BABYLON.StandardMaterial("sphereMatGreen", scene);    				
		sphere.material.emissiveColor = new BABYLON.Vector3(0,1,0)
		sphere.material.freeze();
		sphere.isPickable = false;
		scene.selectSphere = sphere
}