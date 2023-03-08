import { useEffect, useState } from "react";
import { TMini } from "../types/TMini";

export default function DropdownItem(props: { data: TMini, value: boolean, setValue: (id: number, val: boolean) => void }) {
    const { data, value, setValue } = props
    const [currentValue, setCurrentValue] = useState<boolean>(value);

    useEffect(() => {
        setCurrentValue(value)
    },
        [value]
    )


    return (
        <div className="dropdown-item" onClick={() => setValue(data.id, !currentValue)} >
            <div className="form-check">
                <input className="form-check-input" type="checkbox" defaultChecked={currentValue} />
                <label className="form-check-label" htmlFor="Checkme1">{data.name}</label>
            </div>
        </div>
    )
}