import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state= COMMENTS, action) => {
    
    switch (action.type){
        case ActionTypes.ADD_COMMENT:
            var comment= action.payload;
            comment.id = state.length;
            console.log("Comment: ", comment);
            return state.concat(comment);

        default:
            
            return state;
    }
}