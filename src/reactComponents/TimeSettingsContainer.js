import React, {useState,useEffect,useRef} from "react";

import { FaForward } from '@react-icons/all-files/fa/FaForward';
import { FaBackward } from '@react-icons/all-files/fa/FaBackward';
import {ImShrink} from '@react-icons/all-files/im/ImShrink';
import {BsFillPlayFill} from '@react-icons/all-files/bs/BsFillPlayFill';
import {AiOutlinePause} from '@react-icons/all-files/ai/AiOutlinePause';

export default function TimeSettingsContainer(props){
    let [time, setTime] = useState(props.scene.globalTime);
    let [isLiveMode, setIsLiveMode] = useState(true);
    let [speed, setSpeed] = useState(1);
    let [showPopUp,setShowPopUp] = useState(false);
    let [miniMize,setMiniMize] = useState(true);

    useEffect(() => {
        props.scene.onTimeUpdated((time) => {
            setTime(time)
        })
    },[])

    let updateSpeed = (i) => {    
        setSpeed(i);
        props.scene.setPlaybackSpeed(i);
    }

    let miniMizeClicked = () => {
        setMiniMize(!miniMize);
        setShowPopUp(false);
    };

    let lifeClicked = () => {
        updateSpeed(1);
        setIsLiveMode(true);
        props.scene.setLiveMode(true);
    }

    let forwarClicked = () => {
        let newspeed = speed;

        if(newspeed === -0.25){
            newspeed = -newspeed;
        }
        else if(newspeed > 0){
            newspeed = newspeed * 2;
        }else{
            newspeed = newspeed/2;
        }

        if(newspeed > 128){
            newspeed = 128;
        }
        updateSpeed(newspeed);
        setIsLiveMode(false);
        props.scene.setLiveMode(false);
    }
    
    let rewindClicked = () => {
        let newspeed = speed;

        if(newspeed === 0.25){
            newspeed = -newspeed;
        }else if(newspeed > 0){
            newspeed = newspeed / 2;
        }else{
            newspeed = newspeed*2;
        }

        if(newspeed < -128){
            newspeed = -128;
        }
        setIsLiveMode(false);
        props.scene.setLiveMode(false);
        updateSpeed(newspeed);
    }
    
    let pauseClicked = () => {
        updateSpeed(0)
        setIsLiveMode(false);
        props.scene.setLiveMode(false);
    }
    
    let editClicked = () => {
        setShowPopUp(true);
    }
    
    let playClicked = () => {
        updateSpeed(1)
    }

    let getLED = () => {
        if(isLiveMode){
            return (
                <div className="time-settings-LED-ON">
                </div>
            );
        }
        return (
            <div className="time-settings-LED-OFF">
            </div>
        );
    }

    let getStatus = () => {
        if(speed != 0){
            if(speed < 0){
                return "-X" +  -1*speed;
            }else{
                return "X" + speed;
            }
           
        }
        if(speed == 0){
            return "pause";
        }
        return "Status";
    }

    let enterDate = () => {
        let closeClicked = () => {
            setShowPopUp(false);
        }

        let confirmClicked = () => {
            let newTime =  document.getElementById("Date Input").valueAsDate;
       
            if(newTime != null){
                setIsLiveMode(false);
                props.scene.setLiveMode(false);
                updateSpeed(1);
                props.scene.setGlobalTime(newTime, true);
            }
            setShowPopUp(false);
        }

        if(showPopUp){
            return (
                <div className="time-Settings-Enter-Date-Popup">
                    <div style={{flexDirection: "column", display: "flex"}}>  
                        <div style={{flexDirection: "row-reverse", display: "flex", marginBottom: "4%"}}>
                             <div className="time-Settings-Enter-Date-Popup-CloseButton" onClick={closeClicked}>
                                X
                            </div> 
                            <div style={{marginRight: "1em", marginLeft: "1em", textAlign:"center", display: "flex", alignItems: "center"}}>
                                Enter Date
                            </div>
                        </div>    
                        <div style={{marginLeft:"1rem",marginRight: "1rem"}}>
                          <input id="Date Input" className="time-Settings-Enter-Date-Popup-TextInput-Field" type="date"/>                                     
                        </div>
                        <div style={{display:"flex", justifyContent: "center", alignItems:"center",  margin:"0.2em"}}>
                        <div className="time-Settings-Enter-Date-Popup-Confirm-Button" onClick={confirmClicked}>
                                Confirm
                            </div>
                        </div>                 
                    </div>                       
                </div>
            )
        }

        return null;
    
    }

    if(miniMize){
        return(       
         <React.Fragment>
            {enterDate()}
            <div className="tool-Bar-Container-MAX">
                <div className="time-settings-container">
                    <div className="time-settings-collum">
                        <div className="time-Settings-Status-Container">
                            <div className="time-Settings-Status">
                                {getStatus()}
                            </div>
                            <div className="time-settings-collum">
                                <div className="time-settings-forward" onClick={rewindClicked}>
                                    <FaBackward />
                                </div>
                                <div className="time-settings-Clock" onClick={editClicked}>
                                    <div>
                                        {getYearString(time)}
                                    </div>
                                    <div>
                                        {getTimeString(time)}
                                    </div>                
                                </div>
                            <div className="time-settings-forward" onClick={forwarClicked}>
                                <FaForward />
                            </div>
                            </div>                   
                        </div>
                    </div> 
                    <div className="time-settings-collum">
                    <div className="time-settings-pause" onClick={pauseClicked}>
                            <AiOutlinePause/>
                        </div>
                        <div className="time-settings-pause" onClick={playClicked}>
                            <BsFillPlayFill />
                        </div>
                        <div className="timeSettings-LiveButton" onClick={lifeClicked}>
                                {getLED()}
                            <div style={{paddingLeft:5}}>
                                LIVE
                            </div>                  
                        </div>
                        <div className="time-settings-pause" onClick={miniMizeClicked}>
                            <ImShrink/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
    }else{
        return (
            <React.Fragment>
                <div className="tool-Bar-Container-MAX" onClick={miniMizeClicked}>
                    <div className="time-settings-container">
                        <div className="time-settings-collum">
                            <div className="time-Settings-Status-Container">
                                <div className="time-Settings-Status">
                                    {getStatus()}
                                </div>
                                <div className="time-settings-collum">
                                    <div className="time-settings-Clock">
                                        <div>
                                            {getYearString(time)}
                                        </div>
                                        <div>
                                            {getTimeString(time)}
                                        </div>                
                                    </div>
                                </div>                   
                            </div>
                        </div> 
                    </div>
                </div>
            </React.Fragment>
        )
    }
   

}

export function getYearString(date){
    let yearString = ""
    yearString += date.getFullYear() + ".";
    if(date.getMonth() < 9){
        yearString += "0" + (date.getMonth() + 1) + ".";
    }else{
        yearString += (date.getMonth() + 1) + ".";
    }
    yearString += date.getDate();

    return yearString;
}

export function getTimeString(date){
    
    let timeString = "";

    if(date.getHours() < 9){
        timeString += "0" + date.getHours() + ":";
    }else{
        timeString += date.getHours() + ":";
    }

    if(date.getMinutes() < 9){
        timeString += "0" + date.getMinutes() + ":";
    }else{
        timeString += date.getMinutes() + ":";
    }

    if(date.getSeconds() < 9){
        timeString += "0" + date.getSeconds();
    }else{
        timeString += date.getSeconds();
    }

    return timeString;
}