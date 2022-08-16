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
    
        case ActionTypes.ADD_HEURISTIC:
            var heuristic= action.payload;
            return {...ActionTypes, heuristics:state.heuristics.concat(heuristic)};

        default:
            return state;
    }
}