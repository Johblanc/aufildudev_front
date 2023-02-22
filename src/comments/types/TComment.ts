export type TComment = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    article: {
        id: number;
        title: string;
    };
    user: { pseudo: string };
};
