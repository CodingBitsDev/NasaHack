import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default class Axis{
    constructor(scene){
        this.lineX = BABYLON.MeshBuilder.CreateLines("lineX", {
            points: [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(200, 0, 0),
            ], 
            colors: [new BABYLON.Color4(1,0,0,1), new BABYLON.Color4(1,0,0,1)],
        }, scene);

        this.lineY = BABYLON.MeshBuilder.CreateLines("lineY", {
            points: [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(0, 200, 0),
            ], 
            colors: [new BABYLON.Color4(0,1,0,1), new BABYLON.Color4(0,1,0,1)],
        }, scene);

        this.lineZ = BABYLON.MeshBuilder.CreateLines("lineZ", {
            points: [
                new BABYLON.Vector3(0, 0, 1),
                new BABYLON.Vector3(0, 0, 200),
            ], 
            colors: [new BABYLON.Color4(0,0,1,1), new BABYLON.Color4(0,0,1,1)],
        }, scene);

        this.lineX.setEnabled(false);
        this.lineY.setEnabled(false);
        this.lineZ.setEnabled(false);

        this.visible = false;
    }

    toggle(){
        if (this.visible){
            this.visible = false;
            this.lineX.setEnabled(false);
            this.lineY.setEnabled(false);
            this.lineZ.setEnabled(false);
        } else {
            this.visible = true;
            this.lineX.setEnabled(true);
            this.lineY.setEnabled(true);
            this.lineZ.setEnabled(true);
        }
    }
}