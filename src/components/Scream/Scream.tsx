import React from 'react'; 
import { IScream, IUserState, IDataState } from '../../Redux/interfaces';
import { connect } from 'react-redux'
import { withStyles, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Dispatch } from 'redux'
import DeleteScream from '../Scream/DeleteScream'
import ScreamDialoge from '../Scream/ScreamDialoge'
import LikeButton from './LikeButton'
//MUI stuffport 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import { likeScream, unLikeScream } from '../../Redux/Actions/dataActions';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

//icons
import ChatIcon from '@material-ui/icons/Chat'
const styles={
    card:{
        position:'relative',
        display:'flex',
        marginBottom:20
    },
    image:{
        minWidth:200,  
    },
    content:{
        padding:25,
        objectFit: "cover"
    }
}
export interface IScreamProps {
    //screamId:string
    scream:IScream
    classes:{[key:string]:any}
    user:IUserState
    likeScream:(screamId:string)=>(dispatch:Dispatch)=>void
    unLikeScream:(screamId:string)=>(dispatch:Dispatch)=>void    
    openDialog:boolean
}

export interface IScreamState {}

class Scream extends React.Component<IScreamProps, IScreamState> {
  state = {}
  static propTypes={
      user:PropTypes.object.isRequired,
      classes:PropTypes.object.isRequired,
      likeScream:PropTypes.func.isRequired,
      unLikeScream:PropTypes.func.isRequired,
      scream:PropTypes.object.isRequired,
      openDialog:PropTypes.bool
  }
  render() {
    dayjs.extend(relativeTime);
    //const scream=this.props.screams.find(scream=>scream.screamId===this.props.screamId)as IScream;
    const {
        likeCount,
        commentCount,
        userHandle,
        body,
        createdAt,
        screamId,
        userImage,
      }=this.props.scream;
    const {classes,user:{authenticated,credentials:{handle}}}=this.props;
    const DeleteButton=authenticated && userHandle===handle?(
        <DeleteScream screamId={screamId}/>
    ):null;
   
    return (
        <Card className={classes.card}>
            <CardMedia 
             className={classes.image}
             image={userImage}
             title="profile image"/>
             <CardContent className={classes.content}>
                <Typography variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary">
                    {userHandle}                    
                </Typography>
                <br/>
                {DeleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                  <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialoge screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
             </CardContent>
        </Card>
    );
  }
}
const mapStateToProps = (state:{user:IUserState,data:IDataState}) => ({
    user:state.user,
})
export default connect(mapStateToProps, {likeScream,unLikeScream})(withStyles(styles as any)(Scream as any))
