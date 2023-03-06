import { useEffect, useState } from "react";


export function IconCheckBox(props : {defautValue? : boolean ; setValue? : (value : boolean) => void ,info? : string }){

  const pathCheck = "M -5,1 -1,3 5,-4 3,-1  1,2  -1,5 -2,4  -3,3 Z" ;
  const pathNotCheck = "M -5,-5 0,-1 5,-5 1,0 5,5 0,1  -5,5 -1,0 Z" ;
  const [isCheck , setIsCheck] = useState<boolean>((props.defautValue !== undefined) ? props.defautValue : false )

  useEffect(()=>{
    if (props.setValue){
      props.setValue(isCheck)
    }
  },[isCheck])

    return (
        
        <svg
            onClick={()=> setIsCheck(!isCheck)}
            width="1em"
            viewBox="-8 -8 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
        <title>{props.info}</title>
        <circle x={0} y={0} r={8} style={{
          fill :  isCheck? "#008800" : "#880000",
          transition : "all 0.5s"
          }} />
        <path 
          d={isCheck ? pathCheck : pathNotCheck} 
          style={{
            fill : isCheck? "#88FF88" : "#FF8888" ,
            transform : `rotate(${isCheck ? 0 : 900}deg)`,
            transition : "all 0.5s"
          }} 
        />
        </svg>
    )
}
