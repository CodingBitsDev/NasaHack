import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import Orbit from './Orbit';

export default class Trash{
	constructor(scene, tle1, tle2, uid, data){
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

		this.trashSphere.trashParent = this;
	}

	setSelected(selected){
		this.trashSphere.selected = selected
		if (selected) { 
			this.setActive(true);
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
	}
}