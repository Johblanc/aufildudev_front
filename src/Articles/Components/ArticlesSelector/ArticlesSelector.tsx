import { useContext, useEffect, useState } from "react"
import { ArticleContext } from "../../../context/ArticleContext";
import { UserContext } from "../../../context/UserContext";
import { DEFAULT_ARTICLE } from "../../Constant/DefaultArticle";
import { Requester } from "../../Types/requester"
import { TArticleFull } from "../../Types/TArticleFull"


export function ArticlesSelector(){

  const { user } = useContext(UserContext);
  const { setArticle , articlesHandle , setArticlesHandle} = useContext(ArticleContext);

  const [publicsArticles , setPublicsArticles ] = useState<TArticleFull[]>([])
  const [privatesArticles , setPrivatesArticles ] = useState<TArticleFull[]>([])
  const [submitsArticles , setSubmitsArticles ] = useState<TArticleFull[]>([])

  const [ access , setAccess ] = useState("public")
  const [currentSelection , setCurrentSelection ] = useState<JSX.Element[]>([])


  useEffect(()=> {
    const fetchPublics = async () => {
      const data = await Requester.allArticlesPublics() ;
      setPublicsArticles(data || [])
      setArticle(data[0] || DEFAULT_ARTICLE)
    }
    fetchPublics()

  },
  [setArticle])

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

  useEffect(()=>{
    if (articlesHandle){
      const {command, article } = articlesHandle

      console.log(command);
    
      let newPrivateTable : TArticleFull[] = [...privatesArticles] ;
      let newSubmitTable : TArticleFull[] = [...submitsArticles] ;
      let newPublicTable : TArticleFull[] = [...publicsArticles] ;
      
  
  
      if (command === "sup"|| command === "update"){
        newPrivateTable = newPrivateTable.filter(item => item.id !== article.id) ;
        newSubmitTable = newSubmitTable.filter(item => item.id !== article.id) ;
        newPublicTable = newPublicTable.filter(item => item.id !== article.id) ;
      }

      if (command === "add"|| command === "update"){
        if (article.status === "public"){
          newPublicTable.unshift(article)
        }
        if (article.user_pseudo === user.pseudo){
          newPrivateTable.unshift(article)
        }
        if ( user.access_lvl > 2 && article.status === "submit" ){
          newSubmitTable.unshift(article)
        }
      }
      
      setPrivatesArticles(newPrivateTable)
      setSubmitsArticles(newSubmitTable)
      setPublicsArticles(newPublicTable)

      if (command === "sup"){
        setArticle(publicsArticles[0] || DEFAULT_ARTICLE)
      }
      }
      setTimeout(()=>setArticlesHandle(undefined),1)
    
  },[articlesHandle])
  

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
  },[access,publicsArticles,privatesArticles,submitsArticles,setArticle])

  return (
    <div className="side-column scroll bg-primary border border-1 border-dark rounded m-1">
      <div>
        {user.access_lvl > 0 && 
          <select onChange={(e) => setAccess(e.target.value)} className="m-1 bg-secondary border border-1 border-dark text-light rounded p-1">
            <option value={"public"}>Articles Publiques</option>
            <option value={"private"}>Mes Articles</option>
            {user.access_lvl > 2 && <option value={"submit"}>Articles à valider</option>}
          </select>
        }
      </div>
      <div>
        {currentSelection}
      </div>
    </div>
  )
}