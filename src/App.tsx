import React  from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './App.css';
/**Redux */
import {Provider} from 'react-redux'
import store from './Redux/store'
import {getUserData, logoutUser} from './Redux/Actions/userActions'
/**components */
import Navbar from './components/Layout/Navbar';
import AuthRoute from './util/AuthRoute'
/**pages */
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import User from './pages/User'

import {  SET_AUTHENTICATED } from './Redux/types';
import { AnyAction } from 'redux';
axios.defaults.baseURL="https://europe-west1-socialapp-a7454.cloudfunctions.net/api";
const FBIdToken=localStorage.getItem('FBIdToken');
if(FBIdToken){
const decodedToken=jwtDecode(FBIdToken) as any; 
if(decodedToken.exp*1000 < Date.now()){
  store.dispatch(logoutUser() as any);
  window.location.href="/login"
}
else{
  store.dispatch({type:SET_AUTHENTICATED});
  axios.defaults.headers.common['Authorization']=FBIdToken;
  store.dispatch(getUserData() as any as AnyAction)
}
}
const theme=createMuiTheme(themeFile as any)
function App() {
  return (
    <MuiThemeProvider theme={theme}>
       <Provider store={store}>
          <BrowserRouter>
            <Navbar/> 
            <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <AuthRoute exact path="/login"  component={Login}/>
              <AuthRoute exact path="/signup" component={SignUp}/>
              <Route exact  path="/users/:handle" component={User}/>
              <Route exact  path="/users/:handle/scream/:screamId" component={User}/>
            </Switch>
          </div>
          </BrowserRouter>
       </Provider>
    </MuiThemeProvider>
  );
}

export default App;
