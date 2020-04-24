import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IUserState } from '../../Redux/interfaces';
import { likeScream, unLikeScream } from '../../Redux/Actions/dataActions';
import { Dispatch } from 'redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
interface Props {
    classes:{[key:string]:any}
    user:IUserState
    screamId:string
    likeScream:(screamId:string)=>(dispatch:Dispatch)=>void
    unLikeScream:(screamId:string)=>(dispatch:Dispatch)=>void
}
interface State {
    
}

export class LikeButton extends Component<Props, State> {
    state = {}
    static propTypes={
        user:PropTypes.object.isRequired,
        likeScream:PropTypes.func.isRequired,
        unLikeScream:PropTypes.func.isRequired,
        screamId:PropTypes.string.isRequired,
    }
    likesThisScream=()=>{
        return (this.props.user.likes &&
               this.props.user.likes
               .find(like=>like.screamId===this.props.screamId))?true:false;
      }
    render() {
        const {user:{authenticated},likeScream,unLikeScream,screamId}=this.props;
        const likeButton=!authenticated?(//user is authenticted
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
            </Link>            
         ):(//user not authenticated
         this.likesThisScream()?(//user liked this scream
             <MyButton tip="Undo like"  onClick={()=>unLikeScream(screamId)}>
                <FavoriteIcon color="primary"/>
             </MyButton>
         ):(//user not liked this
             <MyButton tip="like" onClick={()=>likeScream(screamId)}>
               <FavoriteBorderIcon color="primary"/>
             </MyButton>
         )
         );
        return likeButton;
    }
}

const mapStateToProps = (state:{user:IUserState}) => ({
    user:state.user
})

const mapDispatchToProps = {
    likeScream,unLikeScream
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton as any) as any
