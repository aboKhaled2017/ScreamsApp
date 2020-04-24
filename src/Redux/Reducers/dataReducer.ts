import { SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, ADD_COMMENT } from '../types';
import { IDataState, IScream } from '../interfaces';
const initialState:IDataState= {
loading:false ,
scream:{} as IScream,
screams:[]
}

export default (state = initialState, { type, payload }:{type:string,payload:any}) => {
    switch (type) {
    case LOADING_DATA:
    return { ...state, loading:true }
    case SET_SCREAMS:
        return { ...state, loading:false ,screams:payload}
    case POST_SCREAM:
        return { ...state,screams:[payload,...state.screams]}
    case SET_SCREAM:
        return {...state,scream:payload}
    case DELETE_SCREAM:
    {
        let index=state.screams.findIndex(scream=>scream.screamId===payload);
        state.screams.splice(index,1);
        return { ...state}  
    }   
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
    {
        let index=state.screams.findIndex(scream=>scream.screamId===payload.screamId);
        state.screams[index]=payload;
        if(state.scream.screamId===payload.screamId)
        state.scream={...payload,comments:state.scream.comments};
        return { ...state}  
    }      
    case ADD_COMMENT:
    {
        let updatedScream={
            ...state.scream,
              comments:[payload,...state.scream.comments],
              commentCount:state.scream.commentCount+1
        }
        let index=state.screams.findIndex(scream=>scream.screamId===updatedScream.screamId);
        state.screams[index]=updatedScream;
        state.scream=updatedScream
        return {...state}
    }       
    default:
        return state
    }
}
