import React from "react";
import Layout from "./layout";


// components



// layout for page


export default function APIGenTabBody(props) {
   
    switch(props.apiGenTab){
        case 0 :return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 -mt-10  ">
    
                <Layout setModalToggle = {props.setModalToggle} setAlumniData={props.setAlumniData} reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild}/>
              </div>
            </div>
               
            </>
          );
          default: return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 top-0 ">
        
        555555
              </div>
            </div>
               
            </>
          );
    }
  
}



