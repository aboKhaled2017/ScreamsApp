import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { deleteScream } from '../Redux/Actions/dataActions';
import { Dispatch } from 'redux';
 

interface Props {
    screamId:string
    deleteScream:(screamId:string)=>(dispatch:Dispatch)=>void
    classes:Record<string,string>
}
const styles=(theme:any)=>({
    ...theme.spreadThis,
    deleteButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }
})
export class DeleteScream extends Component<Props,{open:boolean}> {
    state = {open:false}
    static propTypes={
        classes:PropTypes.object.isRequired,
        deleteScream:PropTypes.func.isRequired,
        screamId:PropTypes.string.isRequired
    }
    handleDelete=()=>{
        this.props.deleteScream(this.props.screamId)
        this.setState({open:false}) 
    }
    handleOpen=()=>{
       this.setState({open:true}) 
    }
    handleClose=()=>{
        this.setState({open:false}) 
     }
    render() {
        const {classes}=this.props;
        return (<>
        <MyButton tip="Delete Scream" onClick={this.handleOpen}  btnClassName={classes.deleteButton}>
           <DeleteOutlineIcon color="secondary"/>
        </MyButton>
        <Dialog open={this.state.open} 
                fullWidth maxWidth="sm"
                onClose={this.handleClose}>
            <DialogTitle>
                Are you sure to delete this scream?
            </DialogTitle>
            <DialogActions>
                <Button onClick={this.handleDelete} color="primary">
                    Delete
                </Button>
                <Button onClick={this.handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
        </>)
    }
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream as any))
