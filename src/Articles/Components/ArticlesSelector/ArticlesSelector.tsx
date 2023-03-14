import { useContext, useEffect, useState } from "react"
import { ArticleContext } from "../../../context/ArticleContext";
import { UserContext } from "../../../context/UserContext";
import { Requester } from "../../Types/requester"
import { TArticleFull } from "../../Types/TArticleFull"


export function ArticlesSelector(){

  const { user } = useContext(UserContext);
  const { setArticle } = useContext(ArticleContext);

  const [publicsArticles , setPublicsArticles ] = useState<TArticleFull[]>([])
  const [privatesArticles , setPrivatesArticles ] = useState<TArticleFull[]>([])
  const [submitsArticles , setSubmitsArticles ] = useState<TArticleFull[]>([])

  const [ access , setAccess ] = useState("public")
  const [currentSelection , setCurrentSelection ] = useState<JSX.Element[]>([])


  useEffect(()=> {
    const fetchPublics = async () => {
      const data = await Requester.allArticlesPublics() ;
      setPublicsArticles(data || [])
    }
    fetchPublics()
  },
  [])

  useEffect(()=> {
    const fetchPrivates = async () => {
      const data = await Requester.allArticlesPrivates(user.access_token) ;
      setPrivatesArticles(data)
    }
    const fetchSubmits = async () => {
      const data = await Requester.allArticlesSubmits(user.access_token) ;
      setSubmitsArticles(data)
    }
    
    if (user.access_lvl > 0)
    {
      fetchPrivates()
    } 
    else 
    {
      setPrivatesArticles([])
    }

    if (user.access_lvl > 2)
    {
      fetchSubmits()
    } 
    else 
    {
      setSubmitsArticles([])
    }
  },
  [user])

  useEffect(()=> {
    let arr : TArticleFull[] = []
    if (access === "public"){
      arr = publicsArticles
    }
    if (access === "private"){
      arr = privatesArticles
    }
    if (access === "submit"){
      arr = submitsArticles
    }

    setCurrentSelection(arr.map(
      (item , i) => (
          <button 
            key={i} 
            onClick={()=> setArticle(item)}
            className="w-100 bg-success border border-1 border-dark text-light rounded p-1"
          >
            {item.title}
          </button>
      )
    ))
  },[access,publicsArticles])

  return (
    <div className="side-column bg-primary border border-1 border-dark rounded m-1">
      <div>
        {user.access_lvl > 0 && 
          <select onChange={(e) => setAccess(e.target.value)} className="m-1 bg-secondary border border-1 border-dark text-light rounded p-1">
            <option value={"public"}>Publiques</option>
            <option value={"private"}>Privés</option>
            {user.access_lvl > 2 && <option value={"submit"}>Pour Validation</option>}
          </select>
        }
      </div>
      <div>
        {currentSelection}
      </div>
    </div>
  )
}