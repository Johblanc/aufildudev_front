import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/url";
import { DropdownTables } from "../types/dropdown-enum";
import { TMini } from "../types/TMini";
import DropdownItem from "./dropdownItem";

export default function DropDown(props: { table: "categories" | "languages" | "frameworks", defaultValue: number[] }) {

    const [checkData, setCheckData] = useState<TMini[]>([]);

    const [currentValue, setCurrentValue] = useState<number[]>(props.defaultValue);


    useEffect(() => {
        fetch(`${BASE_URL}/${props.table}`)
            .then((response) =>
                response.json())
            .then((data) => {
                console.log(data);

                setCheckData(data.data)

            }
            )
    }, [props.table])


    const handleValue = (id: number, value: boolean) => {
        let newValue = [...currentValue]
        if (value) {
            newValue.push(id)
        }
        else {
            newValue = newValue.filter((item) => item !== id)
        }
        setCurrentValue(newValue)
        
    }
    console.log(...currentValue);


    const checkList = (checkData || []).map((elm, i) => (
        <li key={i}>
            <DropdownItem data={elm} value={currentValue.includes(elm.id)} setValue={handleValue} />
        </li>
    ))







    return (
        <div className="dropdown">
            <button className="btn width btn-primary dropdown-toggle " type="button" id="dropdownCategorie"
                data-bs-toggle="dropdown" aria-expanded="false">
                Choisir {DropdownTables[props.table]}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {checkList}
            </ul>
        </div>
    )
}