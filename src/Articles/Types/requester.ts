import { BASE_URL } from '../../constant/url';
import { TArticleDto } from './TArticleDto';
import { TArticleFull } from './TArticleFull';
import { TResponse } from './TResponse';

enum RequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}
export class Requester {
    static async base<Data>(
        url: string,
        method: RequestMethods = RequestMethods.GET,
        params: (string | number)[] = [],
        body: any = undefined,
        token: string | undefined = undefined
    ): Promise<TResponse<Data>> {
        const data = await fetch(
            `${BASE_URL}/${url}${params.map((item) => '/' + String(item))}`,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(body),
            }
        );
        const result: TResponse<Data> = await data.json();

        return result;
    }

    static async allArticlesPublics(): Promise<TArticleFull[]> {
        const responce = await Requester.base<TArticleFull[]>(
            'articles',
            RequestMethods.GET,
            []
        );
        return responce.data;
    }

    static async allArticlesPrivates(token: string): Promise<TArticleFull[]> {
        const responce = await Requester.base<TArticleFull[]>(
            'articles/user',
            RequestMethods.GET,
            [],
            undefined,
            token
        );
        return responce.data;
    }

    static async allArticlesSubmits(token: string): Promise<TArticleFull[]> {
        const responce = await Requester.base<TArticleFull[]>(
            'articles/submit',
            RequestMethods.GET,
            [],
            undefined,
            token
        );
        return responce.data;
    }

    static async articleCreatePuclic(
        body: TArticleDto,
        token: string
    ): Promise<TResponse<TArticleFull>> {
        const responce = await Requester.base<TArticleFull>(
            'articles/public',
            RequestMethods.POST,
            [],
            body,
            token
        );
        return responce;
    }

    static async articleCreatePrivate(
        body: TArticleDto,
        token: string
    ): Promise<TResponse<TArticleFull>> {
        const responce = await Requester.base<TArticleFull>(
            'articles',
            RequestMethods.POST,
            [],
            body,
            token
        );
        return responce;
    }

    static async articleUpdate(
        id: number,
        body: TArticleDto,
        token: string
    ): Promise<TResponse<TArticleFull>> {
        const responce = await Requester.base<TArticleFull>(
            'articles',
            RequestMethods.PATCH,
            [id],
            body,
            token
        );
        return responce;
    }

    static async articleSubmit(
        id: number,
        token: string
    ): Promise<TArticleFull> {
        const responce = await Requester.base<TArticleFull>(
            'articles/submit',
            RequestMethods.PATCH,
            [id],
            {},
            token
        );
        return responce.data;
    }

    static async articleValidate(
        id: number,
        token: string
    ): Promise<TArticleFull> {
        const responce = await Requester.base<TArticleFull>(
            'articles/validate',
            RequestMethods.PATCH,
            [id],
            {},
            token
        );
        return responce.data;
    }

    static async articleDelete(
        id: number,
        token: string
    ): Promise<TArticleFull> {
        const responce = await Requester.base<TArticleFull>(
            'articles',
            RequestMethods.DELETE,
            [id],
            {},
            token
        );
        console.log(responce);

        return responce.data;
    }
}
