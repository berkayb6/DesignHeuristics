import {createStore, combineReducers} from 'redux';
import { Heuristics } from './heuristics'
import { Comments } from './comments';
import { Users } from './users';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            heuristics: Heuristics,
            comments: Comments,
            users: Users
        })
    );

    return store;
}