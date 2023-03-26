import { useContext, useEffect, useState } from 'react';
import { ArticleContext } from '../../../context/ArticleContext';
import { UserContext } from '../../../context/UserContext';
import { DEFAULT_ARTICLE } from '../../Constant/DefaultArticle';
import { Requester } from '../../Types/requester';
import { TArticleFull } from '../../Types/TArticleFull';
import { TSearchOption } from '../../Types/TSearchOption';

export function ArticlesSelector(props: {
    searchOption: TSearchOption;
    setPage: React.Dispatch<
        React.SetStateAction<'Article' | 'Profile' | 'Accueil' | 'Main'>
    >;
}) {
    const { searchOption } = props;
    const { user } = useContext(UserContext);
    const { setArticle, articlesHandle, setArticlesHandle } =
        useContext(ArticleContext);

    const [publicsArticles, setPublicsArticles] = useState<TArticleFull[]>([]);
    const [privatesArticles, setPrivatesArticles] = useState<TArticleFull[]>(
        []
    );
    const [submitsArticles, setSubmitsArticles] = useState<TArticleFull[]>([]);

    const [access, setAccess] = useState('public');
    const [currentSelection, setCurrentSelection] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchPublics = async () => {
            const data = await Requester.allArticlesPublics();
            setPublicsArticles(data || []);
            setArticle(data[0] || DEFAULT_ARTICLE);
        };
        fetchPublics();
    }, [setArticle]);

    useEffect(() => {
        const fetchPrivates = async () => {
            const data = await Requester.allArticlesPrivates(user.access_token);
            setPrivatesArticles(data);
        };
        const fetchSubmits = async () => {
            const data = await Requester.allArticlesSubmits(user.access_token);
            setSubmitsArticles(data);
        };

        if (user.access_lvl > 0) {
            fetchPrivates();
        } else {
            setPrivatesArticles([]);
        }

        if (user.access_lvl > 2) {
            fetchSubmits();
        } else {
            setSubmitsArticles([]);
        }
    }, [user]);

    useEffect(() => {
        if (articlesHandle) {
            const { command, article } = articlesHandle;

            console.log(command);

            let newPrivateTable: TArticleFull[] = [...privatesArticles];
            let newSubmitTable: TArticleFull[] = [...submitsArticles];
            let newPublicTable: TArticleFull[] = [...publicsArticles];

            if (command === 'sup' || command === 'update') {
                newPrivateTable = newPrivateTable.filter(
                    (item) => item.id !== article.id
                );
                newSubmitTable = newSubmitTable.filter(
                    (item) => item.id !== article.id
                );
                newPublicTable = newPublicTable.filter(
                    (item) => item.id !== article.id
                );
            }

            if (command === 'add' || command === 'update') {
                if (article.status === 'public') {
                    newPublicTable.unshift(article);
                }
                if (article.user_pseudo === user.pseudo) {
                    newPrivateTable.unshift(article);
                }
                if (user.access_lvl > 2 && article.status === 'submit') {
                    newSubmitTable.unshift(article);
                }
            }

            setPrivatesArticles(newPrivateTable);
            setSubmitsArticles(newSubmitTable);
            setPublicsArticles(newPublicTable);

            if (command === 'sup') {
                setArticle(publicsArticles[0] || DEFAULT_ARTICLE);
            }
        }
        setTimeout(() => setArticlesHandle(undefined), 1);
    }, [articlesHandle]);

    useEffect(() => {
        let arr: TArticleFull[] = [];
        if (access === 'public') {
            arr = publicsArticles;
        }
        if (access === 'private') {
            arr = privatesArticles;
        }
        if (access === 'submit') {
            arr = submitsArticles;
        }

        arr = arr.filter((article) => {
            const isincludeArray = (target: number[], include: number[]) => {
                //include=selection de l'utilisateur && target=ID de chaques articles
                let result = true; //par defaut il est inclus et on va s'assurer que c'est vrai(permet de renvoyer une liste d'article si aucun filtre n'est actif car true d'origine)
                include.forEach((item) => {
                    //on verifie chaque element de la selection, et on regarde (oui/non) si il se trouve à l'interieur de l'article
                    result = result && target.includes(item); //SI item inclus dans target alors result=true
                });
                return result;
            };

            //permet de recupérer l'ID de chacuns et de la stocker
            const categoriesId = article.categories.map((elm) => elm.id);
            const languagesId = article.languages.map((elm) => elm.id);
            const frameworksId = article.frameworks.map((elm) => elm.id);

            //conditions de resultat pour chaques filtres
            return (
                (article.title.includes(searchOption.inputSearch) ||
                    article.user_pseudo.includes(searchOption.inputSearch) ||
                    article.content.includes(searchOption.inputSearch)) &&
                article.title.includes(searchOption.inputTitle) &&
                article.user_pseudo.includes(searchOption.inputAuthor) &&
                isincludeArray(categoriesId, searchOption.categories) &&
                isincludeArray(languagesId, searchOption.languages) &&
                isincludeArray(frameworksId, searchOption.frameworks)
            );
        });

        setCurrentSelection(
            arr.map((item, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setArticle(item);
                        props.setPage('Article');
                    }}
                    className="w-100 bg-success border border-1 border-dark text-light rounded p-1"
                >
                    {item.title}
                </button>
            ))
        );
    }, [
        access,
        publicsArticles,
        privatesArticles,
        submitsArticles,
        setArticle,
        searchOption,
    ]);

    return (
        <div className="side-column scroll bg-primary border border-1 border-dark rounded m-1 ">
            <div>
                {user.access_lvl > 0 && (
                    <select
                        onChange={(e) => setAccess(e.target.value)}
                        className="m-1 bg-secondary border border-1 border-dark text-dark rounded p-1"
                    >
                        <option value={'public'}>Articles Publiques</option>
                        <option value={'private'}>Mes Articles</option>
                        {user.access_lvl > 2 && (
                            <option value={'submit'}>Articles à valider</option>
                        )}
                    </select>
                )}
            </div>
            <div>{currentSelection}</div>
        </div>
    );
}
