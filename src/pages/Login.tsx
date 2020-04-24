import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import AppIcon from '../logo.svg'
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
/***Redux stuff */
import { loginUser } from '../Redux/Actions/userActions';
import {connect} from 'react-redux'
import { IUserState, IUIState, ILoginModel } from '../Redux/interfaces';
export interface ILoginProps {
  classes:{[key:string]:any}
  loginUser:(userData:ILoginModel,history:{push:(url:string)=>void})=>void
  user:IUserState
  UI:IUIState
  history: {
    push(url: string): void;
};
}
export interface ILoginState {
  email:string
  password:string
  errors:{email:string,password:string,general:string},
  [key:string]:any
}

const styles={
  form:{
    textAlign:'center'
  },
  pageTitle:{
   margin:'10px auto 10px auto'
 },
  image:{
    margin:'20px auto 20px auto'
 },
 textField:{
   margin:'10px auto 10px auto'
 },
 button:{
   marginTop:20,
   position:'relative'
 },
 customeErros:{
   marginTop:20,
   color:'red',
   fontSize:'0.8rem'
 },
 progress:{
   position:'absolute',
 }
}
class Login extends React.Component<ILoginProps, ILoginState> {
  state={
    email:'',
    password:'',
    errors:null as any
  }
  static propTypes = {
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired
  }
  constructor(props:any){
       super(props);
       this.state={
         email:'',
         password:'',
         errors:{}as any
       }
  }
  handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const userData={
        email:this.state.email,
        password:this.state.password
      }
      this.props.loginUser(userData,this.props.history);
  }
  handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       this.setState({
         [e.target.name]:e.target.value
       })
  }
  render() {
  const {classes,UI:{loading,errors}}=this.props;
  //const {errors}=this.state;
    return  (
    <Grid container className={classes.form }>
       <Grid item sm/>
       <Grid item sm>
         <img src={AppIcon} alt="smile" className={classes.image}/>
         <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
         <form noValidate onSubmit={this.handleSubmit}>
           <TextField 
                    name="email" type="email" 
                    id="email" label="Email" 
                    value={this.state.email}
                    onChange={this.handleChange}
                    helperText={errors?.email}
                    error={errors?.email?true:false}
                    fullWidth
                    className={classes.textField}/>
          <TextField 
                    name="password" type="password" 
                    id="password" label="Password" 
                    helperText={errors?.password}
                    error={errors?.password?true:false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/>     
          {errors?.general && 
           <Typography variant="body2" className={classes.customeErros}>{errors.general}</Typography>
          }          
          <Button 
                  type="submit" variant="contained" 
                  disabled={loading}
                  className={classes.button} color="primary">
            Login
            {
              loading&&(
                <CircularProgress size={30} color="secondary" className={classes.progress}/>
              )
            }
          </Button>     
          <br/><small>don't have account? signUp <Link to="/signup">here</Link></small>        
         </form>
       </Grid>
       <Grid item sm/>
    </Grid>
    );
  }
}
const mapStateToProps = (state:{user:IUserState,UI:IUIState}) => ({
  user:state.user,
  UI:state.UI
})

const mapDispatchToProps = {
  loginUser,
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles as any)(Login as any));
