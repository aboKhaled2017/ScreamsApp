import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';
import { Reducer } from 'react';
import { IUIState } from '../interfaces';
 

const initialState:IUIState = {
 loading:false,
 errors:null as any
}
const reducer:Reducer<IUIState,{type:string,payload:any}>= (state = initialState, { type, payload }):IUIState => {
    switch (type) {
    case SET_ERRORS:
        return { ...state, loading:false,errors:payload}
    case CLEAR_ERRORS:
        return {...initialState};
    case LOADING_UI:
        return {...initialState,loading:true} 
    case STOP_LOADING_UI:
        return {...state,loading:false}  
    default:
        return state
    }
}
export default reducer;