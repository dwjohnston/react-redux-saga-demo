import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { Card, Typography } from '@material-ui/core';

const UserCard = ({ classes, user }) => {
    return (
        <Fragment>
            <Typography variant="h3" gutterBottom> User Profile</Typography>
            {user && <Fragment>
                <Typography variant="h4" gutterBottom>
                    {user.name}
                </Typography>
                <Typography gutterBottom>{user.email}</Typography>
                <Typography gutterBottom>{user.phone}</Typography>
            </Fragment>}
        </Fragment>
    );
};

const styles = {
    root: {
        minHeight: 150
    },
};

const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        user: state.users.users.find(user => user.id === state.selectedUser.id)
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(
    UserCard
));
