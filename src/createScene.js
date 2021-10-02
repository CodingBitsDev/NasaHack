import * as BABYLON from "babylonjs"
export function createScene (engine, canvas) {
    let scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
		const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;

		const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {});

    //Your Code

  return scene;
};