import { useEffect, useState } from "react";
import { DropdownTables } from "../types/dropdown-enum";
import { TMini } from "../types/TMini";
import DropdownItem from "./dropdownItem";

export default function DropDown(props: { table: "categories" | "languages" | "frameworks" }) {

    const [checkData, setCheckData] = useState<TMini[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/${props.table}`)
            .then((response) =>
                response.json().then((data) => setCheckData(data.data)
                ))
    }, [])

    const checkList = (checkData || []).map((elm, i) => (
        <li key={i}>
            <DropdownItem data={elm} />
        </li>
    ))

    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownCategorie"
                data-bs-toggle="dropdown" aria-expanded="false">
                Choisir {DropdownTables[props.table]}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {checkList}
            </ul>
        </div>
    )
}