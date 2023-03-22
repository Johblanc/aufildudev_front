


export function IconCheckBox(props : {value? : boolean ; setValue? : (value : boolean) => void ,info? : string }){

  const {value,setValue,info} = props
  const pathCheck = "M -5,0 -1,2 5,-5 3,-2  1,1  -1,4 -2,3  -3,2 Z" ;
  const pathNotCheck = "M -5,-5 0,-1 5,-5 1,0 5,5 0,1  -5,5 -1,0 Z" ;

  
    return (
        
        <svg
            onClick={()=> setValue ? setValue(!value) : {}}
            width="1.2em"
            viewBox="-8 -8 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
        <title>{info}</title>
        <circle x={0} y={0} r={8} style={{
          fill :  value? "#008800" : "#880000",
          transition : "all 0.5s"
          }} />
        <path 
          d={value ? pathCheck : pathNotCheck} 
          style={{
            fill : value? "#88FF88" : "#FF8888" ,
            transform : `rotate(${value ? 0 : 900}deg)`,
            transition : "all 0.5s"
          }} 
        />
        </svg>
    )
}
