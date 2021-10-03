import React, {useState,useEffect,useRef} from "react";
import TimeSettingsContainer from "./TimeSettingsContainer";

export default function(props){

    return (
        <div className="tool-Bar-Container-MAX">
           <TimeSettingsContainer scene={props.scene}/>
        </div>
    )
}