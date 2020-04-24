import React, { Component, createRef } from 'react'
import {Link} from 'react-router-dom'
import { IUserState } from '../../Redux/interfaces';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'
/**Mui stuff */
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link';

/**Icons */
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboarReturnIcon from '@material-ui/icons/KeyboardReturn'
/**redux stuff */
import { connect } from 'react-redux'
import { uploadUserImage, logoutUser } from '../../Redux/Actions/userActions';

interface Props {
    user:IUserState
    classes:Record<string,string>
    uploadImage:(data:FormData)=>void
    logoutUser:()=>void
}
interface State {
    
}
const styles=(theme:any)=>({
    ...theme.spreadThis,
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
})
export class Profile extends Component<Props, State> {
    private _imageInputButton:React.RefObject<HTMLInputElement>
    constructor(props:any){
      super(props);
      this._imageInputButton=createRef()
    }
    state = {}
    static propTypes={
        classes:PropTypes.object.isRequired,
        user:PropTypes.object.isRequired,
        uploadImage:PropTypes.func.isRequired,
        logoutUser:PropTypes.func.isRequired
    }
    handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const imgFile=e.target.files?e.target.files[0]:null as any as File;
      if(!imgFile)return;
      const formData=new FormData();
      formData.append('image',imgFile,imgFile.name);
      this.props.uploadImage(formData)
    }
    handleEditPicture=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        this._imageInputButton.current?.click()
    }
    handleLogout=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        this.props.logoutUser();
    }
    render() {
        const {classes,user:{authenticated,credentials:{createdAt,handle,imgUrl,location,bio,website},loading}}=this.props;
        const profileMarkUp=!loading?
        (authenticated?
        (
         <Paper className={classes.paper}>
              <div className={classes.profile}>
                  <div className="image-wrapper">
                      <img src={imgUrl} alt="profile" className="profile-image"/>
                      <input accept="image/*" hidden type="file" ref={this._imageInputButton} onChange={this.handleImageChange}/>
                      <MyButton tip="Edit profile picture" btnClassName="button" onClick={this.handleEditPicture}>
                        <EditIcon color="primary"/>
                      </MyButton>
                  </div>
                  <hr/>
                  <div className="profile-details">
                     <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                         @{handle}
                     </MuiLink>
                     <hr/>
                     {bio && <Typography variant="body2">{bio}</Typography>}
                     {location && <>
                      <LocationOn color="primary"/> 
                      <span>{location}</span>
                      <hr/> 
                     </>}
                     {website && <>
                      <LinkIcon color="primary"/> 
                      <a href={website} target="_blank" rel="noopener noreferer">{` ${website}`}</a>
                      <hr/> 
                     </>}
                     <CalendarToday color="primary"/>{' '}
                     <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                  </div>
                  <MyButton tip="Logout" btnClassName="button" onClick={this.handleLogout}>
                        <KeyboarReturnIcon color="primary"/>
                  </MyButton>
                  <EditDetails/>
              </div>
            </Paper>
        ):
        (<Paper className={classes.paper}>
          <Typography variant="body2" align="center">No profile found, please login again</Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">SignUp</Button>
          </div>
        </Paper>
        ))
        :(<ProfileSkeleton/>);
        return profileMarkUp;
    }
}
const mapStateToProps = (state:{user:IUserState}) => ({
    user:state.user
})

const mapDispatchToProps = {
    uploadImage:uploadUserImage,
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(Profile as any))
