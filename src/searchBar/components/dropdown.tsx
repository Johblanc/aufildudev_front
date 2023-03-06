import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/url";
import { DropdownTables } from "../types/dropdown-enum";
import { TMini } from "../types/TMini";
import DropdownItem from "./dropdownItem";

export default function DropDown(props: { table: "categories" | "languages" | "frameworks" }) {

    const [checkData, setCheckData] = useState<TMini[]>([]);

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

    const checkList = (checkData || []).map((elm, i) => (
        <li key={i}>
            <DropdownItem data={elm} />
        </li>
    ))

    return (
        <div className="dropdown flex-wrap">
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