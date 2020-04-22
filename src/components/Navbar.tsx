import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { IUserState } from '../Redux/interfaces';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import { connect } from 'react-redux'
/*Mui stuff*/
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/**Icons stuff */
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

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
                        <MyButton tip="Post a scream">
                        <AddIcon color="primary"/>
                        </MyButton>
                        <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon color="primary"/>
                        </MyButton>
                        </Link>
                        <MyButton tip="Notifications">
                        <NotificationsIcon color="primary"/>
                        </MyButton>
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

