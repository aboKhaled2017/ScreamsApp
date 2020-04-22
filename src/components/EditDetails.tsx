import React, { Component } from 'react'
import {Dispatch} from 'redux'
import { editUserDetails } from '../Redux/Actions/userActions';
import PropTypes from 'prop-types';
import { IUserState, ICredentials, IUSerDetails } from '../Redux/interfaces';
/**Material ui stuff */
import withStyles from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles';
import  Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { DialogTitle, TextField } from '@material-ui/core';
/**redux stuff */
import { connect } from 'react-redux'

const styles=(theme:any)=>({
     ...theme.spreadThis,
     button:{
         float:'right'
     }
})
interface Props {
    editUserDetails:(data:IUSerDetails)=>(dispatch:Dispatch)=>void
    credentials:ICredentials
    classes:Record<string,string>
}
interface State {
    bio:string|''
    website:string|''
    location:string|''
    open:boolean
    [key:string]:any
}
export class EditDetails extends Component<Props, State> {
    constructor(props:any){
        super(props)
        this.state={
            bio:this.props.credentials.bio,
            website:this.props.credentials.website,
            location:this.props.credentials.location,
            open:false
        }
    }   
    mapUserDetailsToState=({bio='',website='',location=''}:{bio:string,website:string,location:string})=>{
        this.setState({
            bio:bio,
            website:website,
            location:location
        })
    }
    static propTypes={
        editUserDetails:PropTypes.func.isRequired,
        classes:PropTypes.object.isRequired,
        credentials:PropTypes.object.isRequired
    }
    handleOpen=(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      this.setState({open:true})
      //this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
       const {bio,website,location}=this.state;
       this.props.editUserDetails({bio,website,location})
       this.handleClose()
    }
    render() {
        const {classes}=this.props;
        return (
            <>
              <Tooltip title="Edit user details" placement="top">
                <IconButton className={classes.button} onClick={this.handleOpen}>
                   <EditIcon color="primary"/>
                </IconButton>
              </Tooltip>
              <Dialog open={this.state.open} fullWidth onClose={this.handleClose} maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name="bio" type="text" label="Bio"
                                   multiline rows="3"
                                   fullWidth value={this.state.bio}
                                   className={classes.textField}
                                   onChange={this.handleChange}
                                   placeholder="A short bio about yourself"/>
                        <TextField name="website" type="text" label="Website"
                                   fullWidth value={this.state.website}
                                   className={classes.textField}
                                   onChange={this.handleChange}
                                   placeholder="Your professional/personal website"/>
                        <TextField name="location" type="text" label="Location"
                                   fullWidth value={this.state.location}
                                   className={classes.textField}
                                   onChange={this.handleChange}
                                   placeholder="Where you live"/>                      
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} color="secondary" onClick={this.handleClose}>Close</Button>
                    <Button className={classes.button} color="primary" onClick={this.handleSubmit}>Save</Button>
                </DialogActions>
              </Dialog>
            </>
        )
    }
}
const mapStateToProps = (state:{user:IUserState}) => ({
    credentials:state.user.credentials
})

const mapDispatchToProps = {
     editUserDetails
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(EditDetails as any)) 
