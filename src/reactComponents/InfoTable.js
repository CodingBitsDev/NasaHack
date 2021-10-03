import React, {useState,useEffect,useRef} from "react";
import {getTimeString,getYearString,} from "./TimeSettingsContainer";

export default function(props){
    let [selectedData, setSelectedData] = useState({});
    let [show, setShow] = useState(false);

    useEffect(() => {
        props.scene.canvas.addEventListener("trash_selected", (e) => {
            let data = e.detail.data
            setSelectedData(data);
            setShow(true);
       })
       props.scene.canvas.addEventListener("trash_unselected", (e) => {
            setShow(false);
        })
    }, [])
   
    let getEntrys = () => {
        console.log(selectedData);

        let entrys = [];
        let index = 0;
        entrys[index] = {
            id : "ALT",
            value : 150,
            unitA : "Km",
        };
        index += 1;
        entrys[index] = {
            id : "SPEED",
            value : 80.25,
            unitA : "Km",
            unitB : "s"
        };
        index += 1;
        entrys[index] = {
            id : "CAPTURED",
            value : getYearString(new Date()),
        };
        index += 1;
        entrys[index] = {
            id : "APO",
            value : 250000,
            unitA : "Km",
        };
        index += 1;
        entrys[index] = {
            id : "PER",
            value : 150000,
            unitA : "Km",
        }; 
        index += 1;
        entrys[index] = {
            id : "FIRST SEEN",
            value : getYearString(new Date()),
        };
        index += 1;
        if(selectedData && selectedData.Name){
            entrys[index] = {
                id : "UID",
                value : selectedData.Name,
            };
            index += 1;
        }
        
       return (
           <div>
               {entrys.map(item => (
                   creatEntry(item.id,item.value,item.unitA,item.unitB)
               ))}
           </div>

       );
    }

    let getName = () => {
        console.log(selectedData);
        if(!selectedData){
            return;
        }
        if(selectedData.satelite != undefined){
            return selectedData.satelite;
        }else if(selectedData?.data?.resData?.satelite){
            return selectedData.data.resData.satelite;
        }
    }

    let infoTable = () => {
        if(show){
            return (
                <div className = "infoTable-container">
                    <div className = "infoTable-Header">
                        {getName()}
                    </div>
                    {getEntrys()}
                </div>
            )
        }
        else{
            return null;
        }
       
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
