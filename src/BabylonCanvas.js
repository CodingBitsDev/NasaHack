import React, {useEffect, useRef, useState} from "react"
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { createScene, updateScene } from "./createScene"

window['BABYLON'] = BABYLON;


export default function BabylonCanvas({ onSceneReady }){
	let canvasRef = useRef(null)

	useEffect(() => {
		if (!canvasRef.current) return;
		let canvas = canvasRef.current
		const engine = new BABYLON.Engine(canvas, true); 
		const scene = createScene(engine, canvas); 
		if (onSceneReady) onSceneReady(scene)

		engine.runRenderLoop(function () {
			scene.render();
		});

		let resize = () => {
			engine.resize();
		}
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		}
	}, [])
	
	return (
		<canvas ref={canvasRef} id="babylon-canvas" className="babylon-canvas"></canvas>
	)
}