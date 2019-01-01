import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import CheckBoxOutline from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBox from "@material-ui/icons/CheckBox"


import { connect } from 'react-redux';

const TodosList = ({ classes, todos }) => {
    return (
        <Fragment>
            <Typography variant="h3"> Todos</Typography>
            <List >
                {todos && todos.map(todo => (
                    <ListItem button key={todo.id} dense>
                        {todo.completed ? <CheckBox /> : <CheckBoxOutline />}
                        <ListItemText primary={todo.title}
                        />
                    </ListItem>
                ))}
            </List>
        </Fragment>
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
        todos: state.todos[state.selectedUser.id]
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
    TodosList
));
