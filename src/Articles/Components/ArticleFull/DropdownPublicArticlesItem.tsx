
import { TMini } from "../../../searchBar/types/TMini";
import { IconCheckBox } from "./Icon_CheckBox";


export default function DropDownPublicArticleItem(props:{
  data: TMini,
  value: boolean,
  setValue: (val: boolean) => void
  }) {
  const { data, value, setValue } = props
    
  
    return (
        <span className="dropdown-item d-flex pointer" onClick={()=>setValue(!value)}>
          <span>
            <IconCheckBox value={value} />
          </span>
            <span>
              <p>{data.name}</p>
            </span>
        </span>
    )
}