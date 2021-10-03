import React, {useState,useEffect,useRef} from "react";
import {getTimeString,getYearString,} from "./TimeSettingsContainer";

export default function(props){
    let [selectedData, setSelectedData] = useState(null) 

    props.scene.canvas.addEventListener("trash_selected", (e) => { console.log("selected", e.detail)})

    let getEntrys = () => {
        let entrys = [];
        entrys[0] = {
            id : "ALT",
            value : 150,
            unitA : "Km",
        };
        entrys[1] = {
            id : "SPEED",
            value : 80.25,
            unitA : "Km",
            unitB : "s"
        };
        entrys[2] = {
            id : "CAPTURED",
            value : getYearString(new Date()),
        };
        entrys[3] = {
            id : "APO",
            value : 250000,
            unitA : "Km",
        };
        entrys[4] = {
            id : "PER",
            value : 150000,
            unitA : "Km",
        };
        entrys[4] = {
            id : "FIRST SEEN",
            value : getYearString(new Date()),
        };
        entrys[5] = {
            id : "UID",
            value : 62457,
        };
       return (
           <div>
               {entrys.map(item => (
                   creatEntry(item.id,item.value,item.unitA,item.unitB)
               ))}
           </div>

       );
    }

    let infoTable = () => {
        return (
            <div className = "infoTable-container">
                <div className = "infoTable-Header">
                    IRIDIUM-33 DEB
                </div>
                {getEntrys()}
            </div>
        )
    }
    return (
        <div>
            {infoTable()}
        </div>       
    )
}

function getUnit(unitA,unitB){
    if(unitB !== undefined){
    return (
        <div className="infoTable-entry-unit">
            <div className="infoTable-entry-unitA">
                {unitA} 
            </div>
            <div className="infoTable-entry-unitB">
                {unitB}
            </div>
        </div>       
    );
    }else if(unitA !== undefined){
        return (
        <div className="infoTable-entry-unit">
            <div className="infoTable-entry-unitA-S">
                {unitA} 
            </div>
        </div>
        );    
    }

    return null;
}

function creatEntry(Name,data,unitA,unitB){
    return ( 
        <div className="infoTable-entry-container">
            <div className="infoTable-entry-Name">
                {Name + ":"}
            </div>
            <div style={{flexDirection:"row", justifyContent: "flex-end", display:"flex"}}>
                <div className="infoTable-entry-Value">
                    {data}
                </div>
                {getUnit(unitA,unitB)}
            </div>
        </div>
    )
}
