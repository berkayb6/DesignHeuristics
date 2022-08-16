import * as ActionTypes from './ActionTypes';

export const Images = (state= {
    errMess: null,
    images: []
}, action) => {
    switch (action.type){
        case ActionTypes.UPLOAD_IMAGE:
            var image= action.payload;
            return {...state, images:state.images.concat(image)};
        default:
            return state;
    }
}
