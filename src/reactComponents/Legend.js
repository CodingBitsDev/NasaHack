import React, {useState,useEffect,useRef} from "react";

export default function Legend(){
	return (
		<div className="legend-container">
			<div className="legend-row">
				<div className="circle satelite"></div>
				<p>Satelites</p>
			</div>
			<div className="legend-row">
				<div className="circle debris"></div>
				<p>Debris</p>
			</div>

		</div>
	)

}