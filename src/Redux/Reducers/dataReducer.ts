import { SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types';
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
    case SET_SCREAM:
        return { ...state, loading:false }
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
        return { ...state}  
    }      
    default:
        return state
    }
}
