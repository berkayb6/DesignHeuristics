import * as ActionTypes from './ActionTypes';

export const addComment = (heuristicId, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        heuristicId: heuristicId,
        author: author,
        comment: comment
    }
});