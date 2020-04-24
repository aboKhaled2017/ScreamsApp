import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { IUserState } from '../../Redux/interfaces';
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton';
import  PostScreamButtonIcon from '../Scream/PostScream';
import  Notifications from './Notifications';
import { connect } from 'react-redux'
/*Mui stuff*/
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/**Icons stuff */
import HomeIcon from '@material-ui/icons/Home'


interface Props {
    authenticated:boolean
    classes:Record<string,string>
}
interface State {
    
}
class Navbar extends Component<Props, State> {
    state = {}
    static propTypes={
        //classes:PropTypes.object.isRequired,
        authenticated:PropTypes.bool.isRequired
    }
    render() {
        return (
            <AppBar>
                <ToolBar className="nav-container">
                    {this.props.authenticated?(//authenticated links
                      <>
                        <PostScreamButtonIcon/>
                        <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon color="primary"/>
                        </MyButton>
                        </Link>
                        <Notifications/>             
                      </>
                    ):(//not authenticated links
                      <>
                         <Button color="inherit" component={Link} to={'/'}>Home</Button>
                         <Button color="inherit" component={Link} to={'/signup'}>SignUp</Button>
                         <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                      </>
                    )}
                </ToolBar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state:{user:IUserState}) => ({
    authenticated:state.user.authenticated
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar as any)

