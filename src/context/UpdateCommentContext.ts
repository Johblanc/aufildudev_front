import React from 'react';
import { TComment } from '../comments/types/TComment';

export const UpdateCommentContext = React.createContext({
    comms: [] as TComment[],
    setComms: (value: TComment[]) => {},
});
