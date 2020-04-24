import React, { Component } from 'react'
import {Dispatch} from 'redux'
import PropTypes from 'prop-types';
import { IUIState, IUserState } from '../../Redux/interfaces';
/**Material ui stuff */
import  withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
/**icons */
import { connect } from 'react-redux';
import { addComment } from '../../Redux/Actions/dataActions';
import { TextField, Button } from '@material-ui/core';

const styles=(theme:any)=>({
    ...theme.spreadThis,
}) 
type AddCommentType={screamId:string,body:string}
interface Props {
    screamId:string
    classes:Record<string,string>
    UI:IUIState
    authenticated:boolean
    addComment:(data:AddCommentType)=>(dispatch:Dispatch)=>void
}
interface State {
    body:string
    errors:{comment:string}
    [key:string]:any
    loading:boolean
}

export class CommentForm extends Component<Props, State> {
    state = {body:'',errors:null as any,loading:false}
    static propTypes={
        classes:PropTypes.object.isRequired,
        screamId:PropTypes.string.isRequired,
        authenticated:PropTypes.bool.isRequired,
        UI:PropTypes.object.isRequired,
        addComment:PropTypes.func.isRequired,
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e: React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
       e.preventDefault();
       this.props.addComment({screamId:this.props.screamId,body:this.state.body})
       this.setState({loading:true})
    }
    componentWillReceiveProps(nextProps:Props){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors as any,loading:false})
        }
        if(!nextProps.UI.errors){
            this.setState({body:'',loading:false})
        }
    }
    render() {
        const {classes,screamId,authenticated}=this.props;
        const markUpForm=authenticated?(
            <Grid item sm={12} style={{textAlign:'center'}}>
               <form onSubmit={this.handleSubmit}>
                 <TextField type="text"
                            label="Post on comment"
                            name="body"
                            onChange={this.handleChange}
                            value={this.state.body}
                            fullWidth className={classes.textField}
                            helperText={this.state.errors?.comment}
                            error={this.state.errors?.comment?true:false}  />
                <Button 
                        type="submit" 
                        color="primary"
                        className={classes.button}
                        variant="contained">
                            Submit
                            {this.state.loading && <CircularProgress size={20} thickness={3}/>}
                </Button>
                <hr className={classes.visibleSeperator}/>
               </form>
            </Grid>
        ):null;
        return markUpForm;
    }
}

const mapStateToProps = (state:{UI:IUIState,user:IUserState}) => ({
    UI:state.UI,
    authenticated:state.user.authenticated
})

export default connect(mapStateToProps, {addComment})(withStyles(styles)(CommentForm as any)) 
