import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IDataState } from '../Redux/interfaces';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile'
import ScreamSkeleton from '../util/ScreamSkeleton'
import { connect } from 'react-redux'
import { getScreams } from '../Redux/Actions/dataActions';
import { Dispatch } from 'redux';
import PropTypes from 'prop-types';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
 
const styles=(theme:any): StyleRules<string, {}>=>({
  ...theme.spreadThis,})
export interface  IHomeState{}

export interface  IHomeProps{
  data:IDataState
  getScreams:()=>(dispatch:Dispatch)=>void
}

class Home extends React.Component<IHomeProps, IHomeState> {
  static propTypes={
   data:PropTypes.object.isRequired,
  }
  componentDidMount(){
   this.props.getScreams();
  }
  render() {
    const {screams,loading}=this.props.data;
    let recentScreamsMarkup=!loading?
    screams.map(scream=><Scream  key={scream.screamId} scream={scream}/>):
    <ScreamSkeleton/>
    return (
      <Grid container spacing={10}>
         <Grid item sm={8} xs={12}>
           {recentScreamsMarkup}
         </Grid>
         <Grid item sm={4} xs={12}>
           <Profile/>
         </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state:{data:IDataState}) => ({
  data:state.data,
})

const mapDispatchToProps = {
   getScreams
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home as any))
