import React, {useState,useEffect,useRef} from "react";

export default function(props){
    let [time, setTime] = useState(props.scene.globalTime);
    let [isLiveMode, setIsLiveMode] = useState(true);

    let lifeClicked = () => {
        setIsLiveMode(true)
    }

    return (
        <div className="time-settings-container">
            <div className="time-settings-collum">
                <div className="time-settings-forward" onClick={onRewindPress}>
                    ⏪︎
                </div>
                
                    <div className="time-settings-Clock">
                        <div>
                            {getYearString(time)}
                        </div>
                        <div>
                            {getTimeString(time)}
                        </div>                
                    </div>
            
                <div className="time-settings-forward" onClick={onForwardPress}>
                     ⏩︎
                  </div>
            </div> 
            <div className="time-settings-collum">
            <div className="time-settings-pause" onClick={onPausePress}>
                    ⏸︎
                  </div>
                  <div className="time-settings-pause" onClick={onPlayPress}>
                     ▶
                  </div>
                  <div className="timeSettings-LiveButton" onClick={onLivePress}>
                      <div style={{backgroundColor:0xFFFFFF}} className="time-settings-LED">
                      </div>
                      <div style={{paddingLeft:5}}>
                         LIVE
                      </div>                  
                  </div>
                  <div className="time-settings-pause" onClick={onEditPress}>
                  ✏️
                  </div>
            </div>
        </div>
    )
}

function getYearString(date){
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

function getTimeString(date){
    
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
        timeString += "0" + date.getSeconds() + ":";
    }else{
        timeString += date.getSeconds();
    }

    return timeString;
}

function onForwardPress(){
    console.log("FORWARD PRESSED");
}

function onRewindPress(){
    console.log("REWIND PRESSED");
}

function onPausePress(){
    console.log("PASUE PRESSED");
}

function onEditPress(){
    console.log("EDIT PRESSED");
}

function onLivePress(){
    console.log("LIVE PRESSED");
}

function onPlayPress(){
    console.log("Play PRESSED");
}