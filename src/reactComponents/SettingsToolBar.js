import React, {useState,useEffect,useRef} from "react";
import TimeSettingsContainer from "./TimeSettingsContainer";

export default function(props){

    return (
        <React.Fragment>
           <TimeSettingsContainer scene={props.scene}/>
        </React.Fragment>
    )
}