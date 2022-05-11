import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (heuristicId, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        heuristicId: heuristicId,
        author: author,
        comment: comment
    }
});

export const fetchHeuristics= () => (dispatch) => {
    dispatch(heuristicsLoading(true))

    return fetch(baseUrl + 'heuristics')
        .then (response => response.json())
        .then (heuristics => dispatch(addHeuristics(heuristics)));
}

export const heuristicsLoading = () => ({
    type: ActionTypes.HEURISTICS_LOADING
});

export const heuristicsFailed= (errmess) => ({
    type: ActionTypes.HEURISTICS_FAILED,
    payload: errmess
});

export const addHeuristics= (heuristics) => ({
    type: ActionTypes.ADD_HEURISTICS,
    payload: heuristics
})

export const fetchComments= () => (dispatch) => {
     return fetch(baseUrl + 'comments')
        .then (response => response.json())
        .then (comments => dispatch(addComments(comments)));
}

export const commentsFailed= (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments= (heuristics) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: heuristics
})