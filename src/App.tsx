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
import {getUserData} from './Redux/Actions/userActions'
/**components */
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'
/**pages */
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { SET_UNAUTHENTICATED, SET_AUTHENTICATED } from './Redux/types';
import { AnyAction } from 'redux';
const FBIdToken=localStorage.getItem('FBIdToken');
if(FBIdToken){
const decodedToken=jwtDecode(FBIdToken) as any; 
if(decodedToken.exp*1000 < Date.now()){
  if(window.location.href.indexOf('/login')<0){
    window.location.href="/login"
  }
  store.dispatch({type:SET_UNAUTHENTICATED});
}
else{
  store.dispatch({type:SET_AUTHENTICATED});
  axios.defaults.headers.common['Authorization']=FBIdToken;
  store.dispatch(getUserData() as any as AnyAction)
}
}
const theme=createMuiTheme(themeFile)
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
            </Switch>
          </div>
          </BrowserRouter>
       </Provider>
    </MuiThemeProvider>
  );
}

export default App;
