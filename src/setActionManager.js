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
			if (newSelected.trashParent) scene.canvas.dispatchEvent(new CustomEvent("trash_selected", { detail: newSelected.trashParent }));

			newSelected.setSelected(true)
			if (lastSelected){
				lastSelected.setSelected(false);
			}
			lastSelected = newSelected;
		} else if (newSelected == lastSelected){
			lastSelected.setSelected(false);
			lastSelected = null;
		}


	}

	scene.mainActionManager = new BABYLON.ActionManager(scene);
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
		if (ev.source.onHover) ev.source.onHover(true)
		if (ev.source.setOrbitEnabled) ev.source.setOrbitEnabled(true)
	}));
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, (ev) => {
		if (ev.source.onHover) ev.source.onHover(false)
		if (ev.source.setOrbitEnabled) ev.source.setOrbitEnabled(false)
	}));
	scene.mainActionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (ev) => {
		let mesh = ev.source;
		if (mesh.setActive && !( !mesh.selected && mesh.active )) mesh.setActive(!ev.source.active)
		setSelected(ev.source)
	}));

}