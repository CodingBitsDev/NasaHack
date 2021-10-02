import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default class Earth{
	constructor(scene){
		this.scene = scene;
		this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 140, segments: 32}, scene);
		this.sphere.rotation.x = Math.PI;
		this.sphere.rotation.y = -Math.PI/2;

				//Create dynamic texture
		const width = 2048;
		const height = 1024;
		const texture = new BABYLON.DynamicTexture("earthTexture", { width, height }, scene);   
		const context = texture.getContext();

		const earthMat = new BABYLON.StandardMaterial("earthMat", scene);    				
		earthMat.diffuseTexture = texture;
		earthMat.material = earthMat;
		earthMat.diffuseColor = BABYLON.Color3.Gray();

		this.sphere.material = earthMat;
		// this.sphere.material.wireframe = true;

		var img = new Image();
		img.src = '/textures/earth.jpg';
		img.onload = function() {
				//Add image to dynamic texture
				context.drawImage(this, 0, 0);
				texture.update();
		}	
	}
}