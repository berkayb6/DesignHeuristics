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
        comment: comment
    }
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    //Sending the new comment to the server:
    return fetch (baseUrl + "heuristics/" + heuristicId+ '/comments/', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
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

// -------------- ADD NEW HEURISTIC -------------------
export const addHeuristic = (heuristic) => ({
    type: ActionTypes.ADD_HEURISTIC,
    payload: heuristic
});

export const postHeuristic = (designFor, positiveEffects, designPhase, title, negativeEffects, lifeCyclePhase, industry, rating, category, description, image, sources) => (dispatch) =>{
    const newHeuristic= {
        designFor: designFor,
        positiveInfluence: positiveEffects,
        designPhase: designPhase,
        title: title,
        negativeInfluence: negativeEffects,
        lifeCyclePhase: lifeCyclePhase,
        industry: industry,
        rating: rating,
        category: category,
        description: description,
        image: image,
        sources: sources
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    console.log("new Heur: ", newHeuristic)
    return fetch (baseUrl + 'heuristics', {
        method: 'POST',
        body: JSON.stringify(newHeuristic),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
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
        .then (response => {dispatch(addHeuristic(response))
            console.log("user: ", JSON.stringify(response))})
        .catch ( error => {console.log ('Registration ', error.message)
            alert( 'You could not be registered\nError: ' + error.message)})
}

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

export const register = (email, password, subscription, library, yourHeuristics, [adminProjects, participantProjects]) => (dispatch) =>{
    const newUser= {
        username: email,
        password: password,
        subscription: subscription,
        library: library,
        yourHeuristics: yourHeuristics,
        projects: {
            adminProjects: adminProjects,
            participantProjects: participantProjects
        }
    }
    return fetch (baseUrl + 'users/signup', {
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
        .then (response => {dispatch(attemptRegistration(response))
            console.log("user: ", JSON.stringify(response))})
        .catch ( error => {console.log ('Registration ', error.message)
            alert( 'You could not be registered\nError: ' + error.message)})
}


//-------------------LOGIN-----------------------
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds),
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            console.log("ERR")
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};


//-------------------LOGOUT-----------------------

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

//-------------------UPLOAD IMAGE-----------------------


export const attemptUploadImage = (image) => ({
    type: ActionTypes.UPLOAD_IMAGE,
    payload: image
});

export const uploadImage = (data) => (dispatch) =>{
    const newData ={
        data: data
    }
    console.log("test12: ", data)
    //Sending the new comment to the server:
    return fetch (baseUrl + "imageUpload", {
        method: 'POST',
        body: data,
        headers: {
            
            'Content-Type': 'multipart/form-data'
        }
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