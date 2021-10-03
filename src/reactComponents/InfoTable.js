import React, {useState,useEffect,useRef} from "react";
import {getTimeString,getYearString,} from "./TimeSettingsContainer";

export default function(props){
    let [thrashData, setThrashData] = useState({});
    let [show, setShow] = useState(false);

    useEffect(() => {
        props.scene.canvas.addEventListener("trash_selected", (e) => {
            let data = e.detail
            setThrashData(data);
            setShow(true);
       })
       props.scene.canvas.addEventListener("trash_unselected", (e) => {
            setShow(false);
        })
    }, [])
   
    let infoPanelClicked = () => {
        setShow(false);
    };

    let getEntrys = () => {
        let entrys = [];
        let index = 0;
        if(thrashData?.orbit?.currentGeodetic?.height){
            entrys[index] = {
                id : "ALT",
                value : thrashData?.orbit?.currentGeodetic?.height.toFixed(3),
                unitA : "Km",
            };
            index += 1;
        }
        if(thrashData?.orbit?.currentVelocity){
            entrys[index] = {
                id : "SPEED",
                value : thrashData?.orbit?.currentVelocity.toFixed(3),
                unitA : "Km",
                unitB : "s"
            };
            index += 1;
        }
       
        if(thrashData?.orbit?.orbit?.satrec?.alta){
            entrys[index] = {
                id : "APO",
                value : (6371*(thrashData?.orbit?.orbit?.satrec?.alta)).toFixed(3),
                unitA : "Km",
            };
            index += 1;
        }

        if(thrashData?.orbit?.orbit?.satrec?.altp){
            entrys[index] = {
                id : "PER",
                value : (6371*(thrashData?.orbit?.orbit?.satrec?.altp)).toFixed(3),
                unitA : "Km",
            }; 
            index += 1;
        }

        if(thrashData?.data?.name){
            entrys[index] = {
                id : "UID",
                value : thrashData.data.name,
            };
            index += 1;
        }

        if(thrashData?.orbit?.orbit?.satrec?.epochyr && thrashData?.orbit?.orbit?.satrec?.epochdays){
            
            let date = new Date();
            date.setFullYear(1999 + thrashData?.orbit?.orbit?.satrec?.epochyr);
            date.setDate(thrashData?.orbit?.orbit?.satrec?.epochdays);

            entrys[index] = {
                id : "CAPTURED",
                value : getYearString(date),
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
        if(!thrashData){
            return;
        }
        if(thrashData?.data?.satelite != undefined){
            return thrashData.data.satelite;
        }else if(thrashData?.data?.resData?.satelite){
            return thrashData.data.resData.satelite;
        }
    }

    let infoTable = () => {
        if(show){
            return (
                <div className = "infoTable-container" onClick={infoPanelClicked}>
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
        <div key={Name} className="infoTable-entry-container">
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
