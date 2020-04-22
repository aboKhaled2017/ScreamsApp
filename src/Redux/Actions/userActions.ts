import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, LOADING_ERROR } from '../types';
import axios from 'axios'
import { Dispatch, AnyAction } from 'redux'
import { ILoginModel, ISignUpModel, IComponentHistory, IUSerDetails } from '../interfaces';

export const loginUser=(userData:ILoginModel,history:IComponentHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
    //loading ui
    dispatch({type:LOADING_UI})
    axios.post('/login',userData)
      .then(res=>{
        AuthorizationHeader.setToken(res.data.token)
        //get user data
        dispatch(getUserData())
        //clear errors after getting data
        dispatch({type:CLEAR_ERRORS})
        history.push('/');
      })
      .catch(err=>{
          //set errors
          dispatch({
              type:SET_ERRORS,
              payload:err.response.data
          })
        //this.setState({errors:err.response.data,loading:false})
      })
}
export const signUpUser=(newUserData:ISignUpModel,history:IComponentHistory)=>(dispatch:Dispatch<AnyAction>|any)=>{
  //loading ui
  dispatch({type:LOADING_UI})
  axios.post('/signup',newUserData)
    .then(res=>{
      AuthorizationHeader.setToken(res.data.token)
      //get user data
      dispatch(getUserData())
      //clear errors after getting data
      dispatch({type:CLEAR_ERRORS})
      history.push('/');
    })
    .catch(err=>{
        //set errors
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
      //this.setState({errors:err.response.data,loading:false})
    })
}
export const logoutUser=()=>(dispatch:Dispatch)=>{
 AuthorizationHeader.clearToken();
 dispatch({type:SET_UNAUTHENTICATED})
}
export const getUserData=()=>(dispatch:Dispatch)=>{
   dispatch({type:LOADING_USER});
   axios.get('/user').then(res=>{
       dispatch({
           type:SET_USER,
           payload:res.data
       })
   })
   .catch(err=>console.log(err))
}
export const editUserDetails=(data:IUSerDetails)=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_USER});
  axios.post('/user',data).then(res=>{
      dispatch(getUserData() as any)
  })
  .catch(err=>{
    dispatch({type:LOADING_ERROR})
    console.log(err)
  })
}
export const uploadUserImage=(formdata:FormData)=>(dispatch:Dispatch)=>{
  dispatch({type:LOADING_USER});
  axios.post('/user/image',formdata).then(res=>{
       dispatch(getUserData() as any);
  })
  .catch(err=>{
    dispatch({type:LOADING_ERROR})
    console.log(err)
  })
}
const AuthorizationHeader={
  tokenKey:'FBIdToken',
  setToken(token:string){
    const FbIdToken=`Bearer ${token}`;        
    localStorage.setItem(this.tokenKey,FbIdToken)
    axios.defaults.headers.common['Authorization']=FbIdToken;
  },
  clearToken(){
   localStorage.removeItem(this.tokenKey)
  }
}
