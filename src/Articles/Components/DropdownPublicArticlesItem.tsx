import { useState } from "react";
import { TMini } from "../../searchBar/types/TMini";
import { IconCheckBox } from "./Icon_CheckBox";


export default function DropDownPublicArticleItem(props:{data :TMini, }) {
  const [isChecked, setIsChecked] = useState(false)
    return (
        <span className="dropdown-item d-flex">
          <span>
            <IconCheckBox/>
          </span>
            <span>
              <p>{props.data.name}</p>
            </span>
        </span>
    )
}