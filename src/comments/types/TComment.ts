export type TComment = {
    id: number;
    content: string;
    article: {
        id: number;
        title: string;
    };
};
