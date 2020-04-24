import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED,
         LIKE_SCREAM,
         LOADING_USER, LOADING_ERROR } from '../types';
import { IUserState, ICredentials } from '../interfaces';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ } from '../types';
import { markNotificationsRead } from '../Actions/userActions';
const initialState:IUserState = {
 authenticated:false,
 credentials:{} as any as ICredentials,
 likes:[],
 notifications:[],
 loading:false
}
const reducer:Reducer<IUserState,AnyAction&{payload?:any}>= (state = initialState, { type, payload }):IUserState => {
    switch (type) {
    case SET_AUTHENTICATED:
        return { ...state, authenticated:true,loading:false}
    case SET_UNAUTHENTICATED:
        return initialState;
    case SET_USER:
        return {...payload,authenticated:true,loading:false}
    case LOADING_USER:
        return {...state,loading:true}
    case LOADING_ERROR:
        return {...state,loading:false}     
    case LIKE_SCREAM:   
        return {...state,likes:[...state.likes,{
            userHandle:state.credentials.handle,
            screamId:payload.screamId
        }]} 
    case UNLIKE_SCREAM:
        return {
            ...state,
            likes:state.likes.filter(like=>like.screamId!==payload.screamId)
        } 
    case MARK_NOTIFICATIONS_READ:
    {
        state.notifications.forEach(notif=>(notif.read=true))
        return{...state}
    }             
    default:
        return state
    }
}
export default reducer;
