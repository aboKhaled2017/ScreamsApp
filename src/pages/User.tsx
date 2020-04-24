import React, { Component, ReactPropTypes } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../Redux/Actions/dataActions';
import { IDataState, ICredentials, IUSerCredentials, IUserState } from '../Redux/interfaces';
import PropTypes from 'prop-types';
import { Dispatch } from 'redux';
import axios from 'axios';
import Scream from '../components/Scream/Scream';
import { Grid } from '@material-ui/core';
import StaticProfile from './../components/Profile/StaticProfile'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
interface IProps {
    //classes:Record<string,string>
    data:IDataState
    getUserData:(handle:string)=>(dispatch:Dispatch)=>void
}
interface IState {
    profile: IUSerCredentials,
    screamIdParam: string
}

export class User extends Component<IProps, IState> {
    state = {profile: null as any as IUSerCredentials, screamIdParam: null as any as string}
    static propTypes={
        //classes:PropTypes.object.isRequired,
        data:PropTypes.object.isRequired,
        getUserData:PropTypes.func.isRequired,
    }
    componentDidMount(){
        const handle = (this.props as any).match.params.handle;
        const screamId =(this.props as any).match.params.screamId;
        if (screamId) 
        this.setState({ screamIdParam: screamId });
        this.props.getUserData(handle);
        axios
          .get(`/user/${handle}`)
          .then((res) => {
            this.setState({
              profile: res.data.user
            });
          })
          .catch((err) => console.log(err));
    }
    render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    const screamsMarkup = loading ? (
     <ScreamSkeleton/>
    ) : (!screams ||screams.length===0) ?(
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog={true} />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile===null?(
            <ProfileSkeleton/>
          ):(
            <StaticProfile profile={this.state.profile} />
          )}
         
          {/*{this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}*/}
        </Grid>
      </Grid>
    );
    }
}

const mapStateToProps = (state:{data:IDataState,user:IUserState}) => ({
    data:state.data
})

export default connect(mapStateToProps,{getUserData})(User as any)
