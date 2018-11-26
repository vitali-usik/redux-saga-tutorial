import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsersRequest, createUserRequest, deleteUserRequest } from './../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName, lastName
    });
  };

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
  };

  render() {
    const { users } = this.props;
    console.log('users', users);

    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={users.items} onDeleteUser={this.handleDeleteUserClick} />
      </div>
    );
  }
}

export default connect(
  ({ users }) => ({ users }),
  {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
  }
)(App);
