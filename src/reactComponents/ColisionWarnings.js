import React, {useState,useEffect,useRef} from "react";
import {getTimeString,getYearString,} from "./TimeSettingsContainer";

import { IoWarningOutline } from '@react-icons/all-files/io5/IoWarningOutline';

export default function(props){
    let [warnings, setWarnings] = useState({});
    let [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.scene.collision.crash);
    }, [])

    let getCollisionText = () => {
        let string = "";
        string += "collision warnings";
        return string
    };

    if(show){
        return (
            <div className="warning-Container-show">
                <div className="warning-container">
                    <IoWarningOutline />
                </div>  
                {getCollisionText()}
            </div>       
        )
    }
    else{
        return (
            <div>
            </div>       
        )
    }
  
}
