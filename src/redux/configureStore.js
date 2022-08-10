import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Heuristics } from './heuristics'
import { Comments } from './comments';
import { Users } from './users';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            heuristics: Heuristics,
            comments: Comments,
            users: Users,
            auth: Auth,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}