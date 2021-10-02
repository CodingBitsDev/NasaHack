import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';

export default function createEarth(scene){
	const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 140, segments: 32}, scene);
	sphere.rotation.x = Math.PI;
	sphere.rotation.y = -Math.PI/2;

	    //Create dynamic texture
	const textureResolution = 2048;
	const texture = new BABYLON.DynamicTexture("earthTexture", textureResolution, scene);   
	const context = texture.getContext();

	const earthMat = new BABYLON.StandardMaterial("earthMat", scene);    				
	earthMat.diffuseTexture = texture;
	earthMat.material = earthMat;
	earthMat.diffuseColor = BABYLON.Color3.Gray();

	sphere.material = earthMat;
	// sphere.material.wireframe = true;

	  var img = new Image();
	img.src = '/textures/earth.jpg';
	img.onload = function() {
      //Add image to dynamic texture
			context.drawImage(this, 0, 0);
			texture.update();
    }	

}