import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux'
import configureStore from './store';
import UserList from './components/UserList';
import { connect } from 'react-redux';
import { fetchUsersRequest } from './redux/actions';
import PostList from './components/PostList';
import { withStyles } from '@material-ui/core/styles';
import UserCard from './components/UserCard';
import { Grid, Card, Typography, Snackbar } from '@material-ui/core';
import TodosList from './components/TodosList';


const ErrorMessage = ({ message }) => {
  return <div>
    <Typography color="error" style={{ fontWeight: "bold" }} align="center"> ERROR! {message}</Typography>
  </div>
};

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { classes, error } = this.props;
    return (

      <Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={error}
          message={<ErrorMessage message={error} />}
        />
        < main className={classes.root} >
          <Card style={{ gridArea: "userList" }}>
            <UserList />
          </Card>

          <Card style={{ gridArea: "userCard" }} >
            <UserCard />
          </Card>

          <Card style={{ gridArea: "postList" }}>
            <PostList />
          </Card>

          <Card style={{ gridArea: "todoList", overflowY: "auto" }}>
            <TodosList />
          </Card>
        </main >

      </Fragment>
    );
  }
}

const styles = {
  root: {
    height: "100vh",
    margin: 0,
    padding: 12,
    display: "grid",
    gridTemplateColumns: "200px 400px 1fr",
    gridTemplateRows: "150px 1fr",
    gridGap: "10px 10px",

    gridTemplateAreas: '"userList userCard todoList" "userList postList postList"'
  },
};


const mapStateToProps = (
  state,
  ownProps
) => {
  return {
    error: state.error.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: dispatch(fetchUsersRequest())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
