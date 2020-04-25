import React, { Dispatch } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import AppIcon from '../logo.svg'
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import { IUserState, IUIState, IComponentHistory, ISignUpModel } from '../Redux/interfaces';
import { connect } from 'react-redux';
import { signUpUser } from '../Redux/Actions/userActions';
import { AnyAction } from 'redux';
export interface ISignUpProps {
  user:IUserState
  UI:IUIState
  signUpUser:(newUserData:ISignUpModel,history:IComponentHistory)=>(dispatch:Dispatch<AnyAction>|any)=>void
  classes:Record<string, string>
  history: {
    push(url: string): void;
};
}
export interface ISignUpState {
  email:string
  password:string
  confirmPassword:string
  handle:string
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
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  state={
    email:'',
    password:'',
    confirmPassword:'',
    handle:'',
  }
  static propTypes={
    classes:propTypes.object.isRequired,
    UI:propTypes.object.isRequired,
    user:propTypes.object.isRequired,
    signUpUser:propTypes.func.isRequired,
    history:propTypes.object.isRequired
  }
  handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      let newUserData={
        email:this.state.email,
        password:this.state.password,
        confirmPassword:this.state.confirmPassword,
        handle:this.state.handle
      }
      this.props.signUpUser(newUserData,this.props.history);
  }
  handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       this.setState({
         [e.target.name]:e.target.value
       })
  }
  render() {
  const {classes,UI:{loading,errors}}=this.props;
    return  (
    <Grid container className={classes.form }>
       <Grid item sm/>
       <Grid item sm>
         <img src={AppIcon} alt="smile" className={classes.image}/>
         <Typography variant="h2" className={classes.pageTitle}>SignUp</Typography>
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
           <TextField 
                    name="confirmPassword" type="password" 
                    id="confirmPassword" label="Confirm Password" 
                    helperText={errors?.confirmPassword}
                    error={errors?.confirmPassword?true:false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/> 
           <TextField 
                    name="handle" type="text" 
                    id="handle" label="Handle" 
                    helperText={errors?.handle}
                    error={errors?.handle?true:false}
                    value={this.state.handle}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/>                         
          {errors?.general && 
           <Typography variant="body2" className={classes.customeErros}>{errors?.general}</Typography>
          }          
          <Button 
                  type="submit" variant="contained" 
                  disabled={loading}
                  className={classes.button} color="primary">
            Sign Up
            {
              loading&&(
                <CircularProgress size={30} color="secondary" className={classes.progress}/>
              )
            }
          </Button>     
          <br/><small>Already have an account? Login <Link to="/login">here</Link></small>        
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
  signUpUser
}

export default connect(mapStateToProps,mapDispatchToProps)  (withStyles(styles as any)(SignUp as any)) ;