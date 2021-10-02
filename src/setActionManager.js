import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export function setActionManager(scene){
	function removeAllActive(){
		scene.meshes.forEach(mesh => {
			if (mesh.active && mesh.setActive) mesh.setActive(false);
			if (mesh.setOrbitEnabled) mesh.setOrbitEnabled(false)
		});
	}

	let lastSelected = null
	function setSelected(newSelected){
		if (newSelected && newSelected != lastSelected && newSelected.setSelected) { 
			newSelected.setSelected(true)
			if (lastSelected){
				lastSelected.setSelected(false);
			}
			lastSelected = newSelected;
		}


	}

	scene.mainActionManager = new BABYLON.ActionManager(scene);
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
		ev.source.scaling = new BABYLON.Vector3(2,2,2)
		if (ev.source.setOrbitEnabled) ev.source.setOrbitEnabled(true)
	}));
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, (ev) => {
		ev.source.scaling = new BABYLON.Vector3(1,1,1)
		if (ev.source.setOrbitEnabled) ev.source.setOrbitEnabled(false)
	}));
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (ev) => {
		if (ev.source.setActive) ev.source.setActive(!ev.source.active)
		setSelected(ev.source)
	}));

}