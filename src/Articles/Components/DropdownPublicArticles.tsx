import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/url";
import { TMini } from "../../searchBar/types/TMini";
import DropDownPublicArticleItem from "./DropdownPublicArticlesItem";

export default function DropDownPublicArticles (props: {
  value: number[],
  setValue: (value: number[])=>void,
  articleId : number
}) {
  const { value, setValue ,articleId} = props

  const [checkData, setCheckData] = useState<TMini[]>([]);


  useEffect(() => {
    fetch(`${BASE_URL}/articles`)
        .then((response) =>
            response.json())
        .then((data) => data.data )
        .then(
          (result)=> 
          setCheckData(
            result.map((item : any) => {return {id :item.id, name : item.title}})
            .filter((item : TMini) => item.id !== articleId)
            )
          )
}, [])


  const handleValue = (_id: number, _value: boolean) => {
      
      let newValue = [...value]
      if (_value) {
          newValue.push(_id)
      }
      else {
          newValue = newValue.filter((item) => item !== _id)
      }
      setValue(newValue)


  }

    
  const checkList = (checkData || []).map((elm, i) => (
    <li key={i}>
        <DropDownPublicArticleItem data={elm} value={value.includes(elm.id)} setValue={(val : boolean)=>handleValue(elm.id,val) } />
    </li>
))
const selectList = (checkData || [])
  .filter(elm => value.includes(elm.id))
  .map((elm, i) => (
    <li key={i}>
      {elm.name}
      <button onClick={()=>handleValue(elm.id,false)}>X</button>
    </li>
  ))

    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Choisir Prérequis
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {checkList}
            </ul>
            <ul>
                {selectList}
            </ul>
        </div>
    )
}