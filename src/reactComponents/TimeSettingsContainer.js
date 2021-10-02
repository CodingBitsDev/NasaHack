import React, {useState,useEffect,useRef} from "react";

export default function(props){
    let [time, setTime] = useState(new Date());
    let [isLiveMode, setIsLiveMode] = useState(true);

    let lifeClicked = () => {
        setIsLiveMode(true)
    }

    return (
        <div className="time-settings-container">

        </div>
    )

}