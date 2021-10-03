import React, {useState,useEffect,useRef} from "react";

export default function Legend(){
	let [show, setShow] = useState(false);

	let legendClicked = () => {
		setShow(!show);
	}

	if(show){
		return (
			<div className="legend-container" onClick={legendClicked}>
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
	}else{
		return (
			<div className="legend-container" onClick={legendClicked}>
				Legend	
			</div>
		) 
	}
	

}