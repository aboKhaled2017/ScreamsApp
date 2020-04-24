import { SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, POST_SCREAM, STOP_LOADING_UI, ADD_COMMENT } from '../types';
import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';


/**get All screams */
export const getScreams=()=>(dispatch:Dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios.get('/screams').then(res=>{
      dispatch({type:SET_SCREAMS,payload:res.data})
    })
    .catch(err=> dispatch({type:SET_SCREAMS,payload:[]}))
}

/**get scream */
export const getScream=(screamId:string)=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_UI});
  axios.get(`/scream/${screamId}`).then(res=>{
    dispatch({type:SET_SCREAM,payload:res.data})
    dispatch({type:STOP_LOADING_UI});
  })
  .catch(err=> console.log(err))
}

/**Like scream */
export const likeScream=(screamId:string)=>(dispatch:Dispatch)=>{
    axios.get(`/scream/${screamId}/like`).then(res=>{
      dispatch({type:LIKE_SCREAM,payload:res.data})
    })
    .catch(err=> console.log(err))
}

/**unlike scream */
export const unLikeScream=(screamId:string)=>(dispatch:Dispatch)=>{
    axios.get(`/scream/${screamId}/unlike`).then(res=>{
      dispatch({type:UNLIKE_SCREAM,payload:res.data})
    })
    .catch(err=> console.log(err))
}

/**delete scream */
export const deleteScream=(screamId:string)=>(dispatch:Dispatch)=>{
  axios.delete(`/scream/${screamId}`).then(res=>{
    dispatch({type:DELETE_SCREAM,payload:screamId})
  })
  .catch(err=> console.log(err))
}

/**post scream */
export const postScream=(scream:{body:string})=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_UI})
  axios.post(`/scream`,scream).then(res=>{
    dispatch({type:POST_SCREAM,payload:res.data});
    dispatch({type:CLEAR_ERRORS})
  })
  .catch(err=>{
    dispatch({type:SET_ERRORS,payload:err.response.data})
  })
}

/**add comment */
export const addComment=({screamId,body}:{screamId:string,body:string})=>(dispatch:Dispatch<AnyAction|any>)=>{
  axios.post(`/scream/${screamId}/comment`,{body}).then(res=>{
    dispatch({type:ADD_COMMENT,payload:res.data});
    dispatch(clearErrors())
  })
  .catch(err=>{
    dispatch({type:SET_ERRORS,payload:err.response.data})
  })
}

/**get user data */
export const getUserData=(handle:string)=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_DATA});
  axios.get(`/user/${handle}`).then(res=>{
    dispatch({type:SET_SCREAMS,payload:res.data.screams})
  })
  .catch(err=> {
    dispatch({type:SET_SCREAMS,payload:[]})
  })
}


/**clear errors */
export const clearErrors=()=>(dispatch:Dispatch)=>{
  dispatch({type:CLEAR_ERRORS})
}