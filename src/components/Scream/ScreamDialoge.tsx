import React, { Component, Fragment } from 'react'
import {Dispatch} from 'redux'
import PropTypes from 'prop-types';
import { IUIState, IDataState, IScream } from '../../Redux/interfaces';
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import LikeButton from './LikeButton';
import Comments from './Comments'
import  CommentForm  from './CommentForm';

/**Material ui stuff */
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import  withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
/**icons */
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

/**Redux stuff */
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../Redux/Actions/dataActions';



const styles=(theme:any)=>({
    ...theme.spreadThis,
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
         textAlign:'center',
         marginTop:50,
         marginBottom:50
    },
})

interface Props {
    screamId:string
    userHandle:string
    openDialog:boolean
    classes:Record<string,string>
    getScream:(screamId:string)=>(dispatch:Dispatch)=>void
    clearErrors:()=>(dispatch:Dispatch)=>void
    UI:IUIState
    scream:IScream

}
interface State {
    open:boolean
    oldPath:string
    newPath:string
}
export class ScreamDialoge extends Component<Props, State> {
    state = {open:false,oldPath:'',newPath:''}
    static propTypes={
        classes:PropTypes.object.isRequired,
        getScream:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired,
        scream:PropTypes.object.isRequired,
        UI:PropTypes.object.isRequired,
        screamId:PropTypes.string.isRequired,
        userHandle:PropTypes.string.isRequired
    }
    componentDidMount(){
        if(this.props.openDialog)    
        this.handleOpen()
    }
    handleOpen=()=>{
        let oldPath=window.location.pathname;
        let {userHandle,screamId}=this.props;
        const newPath=`/users/${userHandle}/scream/${screamId}`;
        if(oldPath===newPath)oldPath=`/users/${userHandle}`;
        window.history.pushState(null,null as any,newPath);
        this.props.getScream(this.props.screamId)
        this.setState({open:true,newPath,oldPath})
    }
    handleClose=()=>{
        window.history.pushState(null,null as any,this.state.oldPath);
        this.setState({open:false})
        this.props.clearErrors()
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        
    }
    render() {
        const {classes,scream:{
                  body,userImage,
                  userHandle,commentCount,
                  likeCount,createdAt,
                  screamId,
                  comments
        },
        UI:{loading}}=this.props;
        const dialogMarkup=loading?(
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ):(
            <Grid container spacing={16 as 1}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography 
                                component={Link} 
                                color="primary"
                                variant="h5"                              
                                to={`/users/${userHandle}`}>
                       @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography 
                                color="textSecondary"
                                variant="body2">
                       {dayjs(createdAt).format('h:mm a,MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography  variant="body1">
                       {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                       <ChatIcon color="primary"/>
                    </MyButton>
                <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        );
        return (<Fragment>
                  <MyButton tip="Expand scream" onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMoreIcon color="primary"/>
                  </MyButton>
                  <Dialog 
                      open={this.state.open} 
                      fullWidth maxWidth="sm"
                      onClose={this.handleClose}>
                        <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                           <CloseIcon/>
                        </MyButton>
                        <DialogContent className={classes.dialogContent}>
                            {dialogMarkup}
                        </DialogContent>
                  </Dialog>
                </Fragment>)
    }
}

const mapStateToProps = (state:{UI:IUIState,data:IDataState}) => ({
    UI:state.UI,
    scream:state.data.scream
})

export default connect(mapStateToProps, {getScream,clearErrors})(withStyles(styles)(ScreamDialoge as any))
