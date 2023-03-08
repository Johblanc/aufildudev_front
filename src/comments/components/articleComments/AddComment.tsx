import { useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';

export function AddComment() {
    const userData = useContext(UserContext);

    /* const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: `{"content": "${bodyContent}"}`,
    }; */

    return;
}
