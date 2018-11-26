import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class NewUserForm extends Component {

  state = {
    firstName: '',
    lastName: '',
  };

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    })
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit({ ...this.state });

    this.setState({
      firstName: '',
      lastName: '',
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <label>
            First name
          </label>
          <Input placeholder="First name" onChange={this.handleFirstNameChange} value={this.state.firstName} required />
        </FormGroup>
        <FormGroup>
          <label>
            Last name
          </label>
          <Input placeholder="Last name" onChange={this.handleLastNameChange} value={this.state.lastName} required />
        </FormGroup>
        <FormGroup>
          <Button block outline type="submit" color="primary">
            Create
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default NewUserForm;
