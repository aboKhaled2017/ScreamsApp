import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IComment } from '../../Redux/interfaces';
import { withStyles, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
    comments:IComment[]
    classes:Record<string,string>
}
interface State {
    
}
const styles=(theme:any)=>({
    ...theme.spreadThis,
    commentImage:{
        maxWidth:100,
        borderRadius:'50%',
        height:100,
        objectFit:'cover'
    },
    commentData:{
        marginLeft:20
    }
}) ;
export class Comments extends Component<Props, State> {
    state = {}
    static propTypes={
        classes:PropTypes.object.isRequired,
        comments:PropTypes.array.isRequired
    }
    render() {
        const {comments,classes}=this.props;
        return (<Grid container>
                {comments.map(comment=>{
                  const {body,userHandle,userImage,screamId,createdAt}=comment;
                  return (<Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                        <Typography 
                                                    component={Link} 
                                                    color="primary"
                                                    variant="h5"                              
                                                    to={`/users/${userHandle}`}>
                                         {userHandle}
                                        </Typography>
                                        <Typography 
                                                    color="textSecondary"
                                                    variant="body2">
                                        {dayjs(createdAt).format('h:mm a,MMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator}/>
                                        <Typography  variant="body1">
                                        {body}
                                        </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>
                          </Fragment>)
                })}
                </Grid>)
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comments as any))
