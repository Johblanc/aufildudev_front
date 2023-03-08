import { useState, useEffect } from "react";
import { IconCheckBox } from "../../Articles/Components/Icon_CheckBox";
import "../style/profile-style.css"




export function Profile(props : {id : number, name : string}) {
   console.log(props);
   const [compteur, setCompteur] = useState <number> (0)

   useEffect (() => {
   console.log(compteur);
   }, [compteur])
   return (
      <div className=" border-2  rounded-5 profile-back w-100 h-100 cont" id="profile">
         <div className="text-center">
            <div className="row test">
               <div className="col-3  pt-4 pb-4 ">
               <button onClick={() => setCompteur(compteur + 1)}>{compteur}</button>
               </div>
               <div className="col-3  pt-4 pb-4">
               {compteur%2 === 0 && "paire"}
               </div>
               <div className="col-3  pt-4 pb-4">
               {compteur%2 === 1 && "impaire"}
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
            </div>
            <div className="row">
               <div className="col-3  pt-4 pb-4 test2">
                  Column
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
            </div>
            <div className="row">
               <div className="col-3  pt-4 pb-4 test2">
                  <IconCheckBox info="test"/>
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
               <div className="col-3  pt-4 pb-4">
                  Column
               </div>
            </div>
         </div>
      </div>

   );
}