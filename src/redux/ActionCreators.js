import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


// FETCHING COMMENTS AND PASSING INTO PROPS
export const fetchComments= () => (dispatch) => {
    return fetch(baseUrl + 'comments')
       .then (response => {
           /** When an error from the server is encountered  */

           if (response.ok)
               return response;
           else
               var error= new Error('Error '+ response.status + ': ' + response.statusText);
               error.response= response;
               throw error;
       },

       /** When no response from the server is encountered  */
       error=> {
           var errmess= new Error(error.message);
           throw errmess;
       })
       .then (response => response.json())
       .then (comments => dispatch(addComments(comments)))
       .catch( error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed= (errmess) => ({
   type: ActionTypes.COMMENTS_FAILED,
   payload: errmess
});

export const addComments= (comments) => ({
   type: ActionTypes.ADD_COMMENTS,
   payload: comments
})

// POSTING NEW COMMENTS
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (heuristicId, author, comment) => (dispatch) =>{
    const newComment ={
        heuristicId: heuristicId,
        author: author,
        comment: comment
    }
    
    //Sending the new comment to the server:
    return fetch (baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then (response => {
    /** When an error from the server is encountered  */

        if (response.ok)
            return response;
        else
            var error= new Error('Error '+ response.status + ': ' + response.statusText);
            error.response= response;
            throw error;
    },

    /** When no response from the server is encountered  */
    error=> {
        var errmess= new Error(error.message);
        throw errmess;
    })
    .then (response => response.json())
    .then (response => dispatch(addComment(response)))
    .catch ( error => {console.log ('Post comments ', error.message)
        alert( 'Your comment could not be posted\nError: ' + error.message)})
}


// FETCHING HEURISTICS FROM DATABASE
export const fetchHeuristics= () => (dispatch) => {
    dispatch(heuristicsLoading(true))

    return fetch(baseUrl + 'heuristics')
        .then (response => {
        /** When an error from the server is encountered  */

            if (response.ok)
                return response;
            else
                var error= new Error('Error '+ response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
        },

        /** When no response from the server is encountered  */
        error=> {
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then (response => response.json())
        .then (heuristics => dispatch(addHeuristics(heuristics)))
        .catch( error => dispatch(heuristicsFailed(error.message)));
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

// FETCHING USERS

export const fetchUsers= () => (dispatch) => {
    return fetch(baseUrl + 'users')
       .then (response => {
           /** When an error from the server is encountered  */

           if (response.ok)
               return response;
           else
               var error= new Error('Error '+ response.status + ': ' + response.statusText);
               error.response= response;
               throw error;
       },

       /** When no response from the server is encountered  */
       error=> {
           var errmess= new Error(error.message);
           throw errmess;
       })
       .then (response => response.json())
       .then (users => dispatch(addUsers(users)))
       .catch( error => dispatch(usersFailed(error.message)));
}

export const usersFailed= (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
 });
 
 export const addUsers= (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
 })

// -------------- REGISTRATION: -------------------
export const attemptRegistration = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});

export const register = (email, password, subscription) => (dispatch) =>{
    const newUser= {
        email: email,
        password: password,
        subscription: subscription
    }

    return fetch (baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then (response => {
        /** When an error from the server is encountered  */
    
            if (response.ok)
                return response;
            else
                var error= new Error('Error '+ response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
        },
    
        /** When no response from the server is encountered  */
        error=> {
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then (response => response.json())
        .then (response => dispatch(addComment(response)))
        .catch ( error => {console.log ('Registration ', error.message)
            alert( 'You could not be registered\nError: ' + error.message)})
}