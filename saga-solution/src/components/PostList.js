import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Card, ListItem, List, ListItemText, Typography } from '@material-ui/core';
import { fetchPostsForUserRequest } from '../redux/actions';
import { postIsSpecial } from "../util/isSpecial";

const UserList = ({ classes, posts }) => {
    return (
        <Fragment >

            <Typography variant="h3">Posts</Typography>
            <List component="nav">
                {posts && posts.map(post => (
                    <ListItem key={post.id} >
                        <ListItemText
                            primary={post.title}
                            primaryTypographyProps={{
                                color: postIsSpecial(post) ? "error" : "default"
                            }}
                            secondary={post.body}
                        />
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
        posts: state.posts[state.selectedUser.id]
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
    UserList
));
