import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default function createAxis(scene) {
    let lineX = BABYLON.MeshBuilder.CreateLines("lineX", {
        points: [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(200, 0, 0),
        ], 
        colors: [new BABYLON.Color4(1,0,0,1), new BABYLON.Color4(1,0,0,1)],
    }, scene);

    let lineY = BABYLON.MeshBuilder.CreateLines("lineY", {
        points: [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 200, 0),
        ], 
        colors: [new BABYLON.Color4(0,1,0,1), new BABYLON.Color4(0,1,0,1)],
    }, scene);

    let lineZ = BABYLON.MeshBuilder.CreateLines("lineZ", {
        points: [
            new BABYLON.Vector3(0, 0, 1),
            new BABYLON.Vector3(0, 0, 200),
        ], 
        colors: [new BABYLON.Color4(0,0,1,1), new BABYLON.Color4(0,0,1,1)],
    }, scene);
}