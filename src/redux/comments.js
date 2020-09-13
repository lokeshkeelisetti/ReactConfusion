import * as ActionTypes from './ActionTypes';

export const Comments=(state= {
    errMess:null,
    comments:[]
},action) =>{
    switch(action.type) {        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading:false,errmess:action.payload,comments:[]}
        case ActionTypes.ADD_COMMENTS:
            //console.log(action);
            var comment = action.payload;
            //console.log("state ",state)
            return {...state, comments:state.comments.concat(comment)};
        default:
            return state;
    }
}