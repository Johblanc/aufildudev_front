import { TComment } from '../types/TComment';

export function Comment(props: { data: TComment }) {
    const { content } = props.data;
    return (
        <div>
            <p>{content}</p>
        </div>
    );
}
