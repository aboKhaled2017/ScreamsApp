import { SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';

/**get All screams */
export const getScreams=()=>(dispatch:Dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios.get('/screams').then(res=>{
      dispatch({type:SET_SCREAMS,payload:res.data})
    })
    .catch(err=> dispatch({type:SET_SCREAMS,payload:[]}))
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