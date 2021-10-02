import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default class Earth{
	constructor(scene){
		this.scene = scene;
		this.sphere = BABYLON.MeshBuilder.CreateSphere("earth", {diameter: 127.42, segments: 32}, scene);
		this.sphere.rotation.x = Math.PI;
		this.sphere.rotation.y = Math.PI;

				//Create dynamic texture
		const width = 2048;
		const height = 1024;
		const texture = new BABYLON.DynamicTexture("earthTexture", { width, height }, scene);   
		const context = texture.getContext();
	
		const earthMat = new BABYLON.StandardMaterial("earthMat", scene);    				
		earthMat.emissiveTexture = texture;
		earthMat.emissiveColor = new BABYLON.Color3(0.0, 0.0, 0.0);
		//earthMat.bumpTexture = new BABYLON.Texture("/textures/gebco_08_rev_elev_2M.png", scene);  

		this.sphere.material = earthMat;
		// this.sphere.material.wireframe = true;

		let earthImg = new Image();
		earthImg.src = '/textures/land_ocean_ice_2048.png';
		earthImg.onload = function() {
				//Add image to dynamic texture
				context.drawImage(this, 0, 0);
				texture.update();
		}	

		//Clouds
/* 		var mat0 = new BABYLON.StandardMaterial("mat0", scene);
		mat0.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		mat0.opacityTexture = new BABYLON.Texture("/textures/cloud_combined.png", scene);
	
		var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 128.42, segments: 32}, scene);
		sphere1.material = mat0; */
	}
}