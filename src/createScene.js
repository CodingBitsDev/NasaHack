import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

import renderTrash from './renderTrash';
import Earth from './BabylonComponents/Earth';
import Axis from './BabylonComponents/Axis';

export function createScene (engine, canvas) {
  let scene = new BABYLON.Scene(engine);

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

	window.scene = scene;

 	// Add a camera to the scene and attach it to the canvas
	// const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1.1, 190, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
	light.intensity = 0.7;
	light.diffuse = new BABYLON.Vector3(3,3,3)

	createTemplateSphere(scene)

	const earth = new Earth(scene);

  let trash = renderTrash(scene);

  scene.clearColor = new BABYLON.Color3(0, 0, 0);
  
  return scene;
};

export function updateScene() {
}

function createTemplateSphere(scene){
		let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5, segments: 32}, scene);
		// sphere.position = new BABYLON.Vector3(70,0,0)
		sphere.rotation.x = Math.PI;
		sphere.rotation.y = -Math.PI/2;

				//Create dynamic texture
		const earthMat = new BABYLON.StandardMaterial("earthMat", scene);    				
		earthMat.diffuseColor = BABYLON.Color3.Gray();

		sphere.material = earthMat;

		sphere.isVisible = false;
		scene.templateSphere = sphere
}