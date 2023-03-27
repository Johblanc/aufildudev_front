import { AllComments } from '../../comments/components/allComments/AllComments';
import UserList from './UserList';

export default function Admin(props: {
    page: 'Article' | 'Profile' | 'Accueil' | 'Admin';
}) {
    return (
        <div className="mx-2 border border-primary bg-info text-primary border-2 rounded rounded-4 px-4 pt-4  flex-grow-1 ">
            <h1 className="fs-3">Pannel Administrateur :</h1>
            <AllComments page={props.page} />
            <UserList />
        </div>
    );
}
