import * as ActionTypes from './ActionTypes';

export const Heuristics = (state= {
        isLoading: true,
        errMess: null,
        heuristics: []
    }, action) => {
    switch (action.type){
        case ActionTypes.ADD_HEURISTICS:
            return {...state, isLoading: false, errMess: null, heuristics: action.payload}

        case ActionTypes.HEURISTICS_LOADING:
            return {...state, isLoading: true, errMess: null, heuristics: []}

        case ActionTypes.HEURISTICS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, heuristics: []}

        default:
            return state;
    }
}