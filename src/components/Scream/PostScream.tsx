import React, { Component, Fragment } from 'react'
import {Dispatch} from 'redux'
import PropTypes from 'prop-types';
import { postScream, clearErrors } from '../../Redux/Actions/dataActions';
import { IUIState } from '../../Redux/interfaces';
/**Material ui stuff */
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import  withStyles from '@material-ui/core/styles/withStyles';
import { DialogTitle, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
/**Redux stuff */
import { connect } from 'react-redux'
import MyButton from '../../util/MyButton';
const styles=(theme:any)=>({
    ...theme.spreadThis,
    progressSpinner:{
      position:'absolute'
    },
    submitButton:{
      position:'relative',
      marginTop:15
    },
    closeButton:{
      position:'absolute',
      left:'90%',
      top:'10%'
    }
})
interface Props {
    classes:Record<string,string>
    postScream:({body}:{body:string})=>(dispatch:Dispatch)=>void
    clearErrors:()=>(dispatch:Dispatch)=>void
    UI:IUIState

}
interface State {
    open:boolean
    body:string 
    errors:{body:string}
    [key:string]:any
}

export class PostScream extends Component<Props, State> {
    state = {open:false,body:'',errors:null as any}
    static propTypes={
     classes:PropTypes.object.isRequired,
     postScream:PropTypes.func.isRequired,
     clearErrors:PropTypes.func.isRequired,
     UI:PropTypes.object.isRequired
    }
    componentWillReceiveProps(nextProps:Props){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors as any})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:'',open:false,errors:null as any})
        }
    }
    handleOpen=()=>{
        this.setState({open:true})
    }
    handleClose=()=>{
        this.props.clearErrors();
        this.setState({open:false,errors:null as any})
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
       e.preventDefault();
       this.props.postScream({body:this.state.body})
    }
    render() {
        const {errors}=this.state;
        const {classes,UI:{loading}}=this.props;
        return (
        <Fragment>
           <MyButton tip="Post a scream" onClick={this.handleOpen}>
                <AddIcon color="primary"/>
            </MyButton>
            <Dialog open={this.state.open} 
                fullWidth maxWidth="sm"
                onClose={this.handleClose}>
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                   <CloseIcon/>
                </MyButton>
                <DialogTitle>
                   Post new scream
                </DialogTitle>       
                <DialogContent>
                    <form>
                        <TextField name="body" type="text" label="Scream !!"
                                   multiline rows="3"
                                   fullWidth value={this.state.body}
                                   className={classes.textField}
                                   onChange={this.handleChange}
                                   error={errors?true:false}
                                   helperText={errors?.body}
                                   placeholder="Scream at your felow apes"/>  
                    <Button type="submit" variant="contained" 
                            className={classes.submitButton}
                            disabled={loading}
                            onClick={this.handleSubmit}
                            color="primary">
                          Submit {loading && <CircularProgress size={30} className={classes.progressSpinner}/> }     
                    </Button>                                        
                    </form>
                </DialogContent>     
           </Dialog>
        </Fragment>
        )
    }
}

const mapStateToProps = (state:{UI:IUIState}) => ({
    UI:state.UI
})
export default connect(mapStateToProps,{postScream,clearErrors})(withStyles(styles)(PostScream as any))
