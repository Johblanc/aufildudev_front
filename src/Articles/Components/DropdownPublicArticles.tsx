import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/url";
import { TMini } from "../../searchBar/types/TMini";
import DropDownPublicArticleItem from "./DropdownPublicArticlesItem";

export default function DropDownPublicArticles( props: { }) {

    const [checkData, setCheckData] = useState<TMini[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/articles`)
            .then((response) =>
                response.json())
            .then((data) => data.data )
            .then((result)=> setCheckData(result.map((item : any) => {return {id :item.id, name : item.title}})))
    }, [])
    console.log(checkData);
    
    const checkList = (checkData || []).map((elm, i) => (
        <li key={i}>
            <DropDownPublicArticleItem data={elm} />
        </li>
    ))

    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownCategorie"
                data-bs-toggle="dropdown" aria-expanded="false">
                Choisir Prérequis
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {checkList}
            </ul>
        </div>
    )
}