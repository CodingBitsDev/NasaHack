import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import Orbit from './Orbit';

export default class Trash{
	constructor(scene, tle1, tle2, uid, type, data){
		this.scene = scene;

		this.tle1 = tle1;
		this.tle2 = tle2;
		this.uid = uid;
		this.type = type;

		this.data = {
			name: data.name,
			satelite: data.satelite,
			type: data.type,
			date: data.date,
			restData: data,
		}

		if(this.type == "satelite"){
			this.trashSphere = scene.templateSphereSatelite.createInstance("instance" + uid);
		} else {
			this.trashSphere = scene.templateSphereDebris.createInstance("instance" + uid);
		}
		let color = this.trashSphere.material.emissiveColor
		this.orbit = new Orbit(this.uid, this.tle1, this.tle2, new BABYLON.Color4(color.x,color.y,color.z,1),scene)
		this.orbit.update();

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
			this.selectedSphere = this.scene.selectSphere
			this.selectedSphere.trashSphere = this.trashSphere;
			this.selectedSphere.scaling = new BABYLON.Vector3(2,2,2)
			this.selectedSphere.setEnabled(true)
			this.selectedSphere.position = this.orbit.currentPosition;
		} else {
			if (this.selectedSphere.trashSphere == this.trashSphere){
				this.selectedSphere.scaling = new BABYLON.Vector3(1,1,1)
				this.selectedSphere.setEnabled(false)
			}
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

	setEnabled(enabled){
	}

	setOrbitEnabled(enabled){
		if (!this.trashSphere.active){
			this.orbit.setEnabled(enabled);
		}
	}

	update(time){
		this.orbit.update(time)
		this.trashSphere.position = this.orbit.currentPosition;

		/*
		const xSlide = new BABYLON.Animation("floatyboaty", "position", 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR2, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
	
		const keyFrames = []; 
	
		keyFrames.push({
			frame: 0,
			value: this.orbit.currentPosition
		});
	
		keyFrames.push({
			frame: 1,
			value: this.orbit.currentPosition + this.orbit.currentMovement
		});
	
		xSlide.setKeys(keyFrames);
	
		this.trashSphere.animations.push(xSlide);
	
		this.scene.beginAnimation(this.trashSphere, 0, 2 , true);*/

		if (this.selectedSphere) this.selectedSphere.position = this.orbit.currentPosition;
	}
}