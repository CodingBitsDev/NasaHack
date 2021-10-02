import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import Orbit from './Orbit';

export default class Trash{
	constructor(scene, tle1, tle2, uid, data){
		this.scene = scene;

		this.tle1 = tle1;
		this.tle2 = tle2;
		this.uid = uid;
		this.data = data

		this.orbit = new Orbit(this.uid, this.tle1, this.tle2, new BABYLON.Color4(1,1,1,1),scene)
		this.orbit.update();
		this.trashSphere = scene.templateSphere.createInstance("instance" + uid);
		this.trashSphere.material.emissiveColor = new BABYLON.Vector3(0.8,0.8,0.8)
		this.trashSphere.position = this.orbit.currentPosition;
		this.trashSphere.active = false;

    this.trashSphere.actionManager = scene.mainActionManager;
		this.trashSphere.setOrbitEnabled = this.setOrbitEnabled.bind(this);
		this.trashSphere.setActive = this.setActive.bind(this);
		this.trashSphere.setSelected = this.setSelected.bind(this);
		this.trashSphere.onHover = this.onHover.bind(this);

		this.trashSphere.trashParent = this;

		this.selectedSphere = null;
	}

	setSelected(selected){
		this.trashSphere.selected = selected
		if (selected){
			this.selectedSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.51, segments: 32}, this.scene);
			this.selectedSphere.scaling = new BABYLON.Vector3(2,2,2)
			this.selectedSphere.material = new BABYLON.StandardMaterial("earthMat", this.scene);    				
			this.selectedSphere.material.emissiveColor = new BABYLON.Color3(0, 1, 0)
			this.selectedSphere.isPickable = false;
		} else {
			this.selectedSphere.dispose()
			this.selectedSphere = null;
		}
	}

	onHover(hover){
		if (hover){
			if ( this.selectedSphere ) this.selectedSphere.scaling = new BABYLON.Vector3(2,2,2)
			this.trashSphere.scaling = new BABYLON.Vector3(2,2,2)
		} else {
			if ( this.selectedSphere ) this.selectedSphere.scaling = new BABYLON.Vector3(1,1,1)
			this.trashSphere.scaling = new BABYLON.Vector3(1,1,1)
		}

	}

	setActive(active){
		this.trashSphere.active = active
		if (active) this.orbit.setEnabled(true);
	}

	setOrbitEnabled(enabled){
		if (!this.trashSphere.active){
			this.orbit.setEnabled(enabled);
		}
	}

	update(time){
		this.orbit.update(time)
		this.trashSphere.position = this.orbit.currentPosition;
		if (this.selectedSphere) this.selectedSphere.position = this.orbit.currentPosition;
	}
}