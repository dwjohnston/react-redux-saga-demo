import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Card, ListItem, List, ListItemText, Typography } from '@material-ui/core';
import { fetchPostsForUserRequest, selectUser } from '../redux/actions';

const UserList = ({ classes, users, selectUser }) => {
    return (
        <Fragment>
            <Typography variant="h2">Users </Typography>
            <List component="nav">
                {users.map(user => (
                    <ListItem 
                        button 
                        key={user.id}
                        onClick={() => selectUser(user.id)} >
                        <ListItemText primary={user.name} />
                    </ListItem>
                ))}
            </List>
        </Fragment >
    );
};

const styles = {
    root: {},
};



const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        users: state.users.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectUser: (id) => dispatch(selectUser(id))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(
    UserList
));
