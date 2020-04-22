import React  from 'react';
import {Route,Redirect} from 'react-router-dom'
/**Redux stuff */
import { connect } from 'react-redux';
import { IUserState } from '../Redux/interfaces';
import PropTypes from 'prop-types';
interface IAuthRouteProps {
    component:any
    authenticated:boolean
    [key:string]:any
}
const AuthRoute: React.FC<IAuthRouteProps> = ({component:TragetComponent,authenticated,...rest}) => {
    return (
    <Route {...rest} 
           render={props=>authenticated===true
                  ?<Redirect to="/"/>
                  :<TragetComponent {...props}/>}/>
    )
}
const mapStateToProps = (state:{user:IUserState}) => ({
    authenticated:state.user.authenticated
})
AuthRoute.propTypes={
    authenticated:PropTypes.bool.isRequired
}
export default connect(mapStateToProps)(AuthRoute);
