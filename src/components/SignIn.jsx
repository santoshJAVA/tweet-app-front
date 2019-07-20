import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import Api  from '../lib/Api.js';

export default class SignIn extends React.Component {

  defaultState() {
    return {
      email: {
        value: '',
        error: 'Email is required.'
      },
      password: {
        value: '',
        error: 'Password is required.'
      },
      submit: {
        error: ''
      },
      formSubmitted: false
    }
  }


  constructor(props){
    super(props)

    this.state = this.defaultState()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setEmail = this.setEmail.bind(this)
  }

  getFormErrors() {
    let fields = ['email', 'password', 'submit']
    let errors = []
    fields.map(field => {
      let fieldError = this.state[field].error || ''
      if (fieldError.length > 0) {
        errors.push(fieldError)
      }
    })
    return errors
  }

  setEmail(event) {
    let newVal = event.target.value || ''
    let errorMessage = newVal.length === 0 ? 'Email is required.' : ''
    this.setState({
      email: {
        value: newVal,
        error: errorMessage
      },
      submit: {
        error: ''
      }
    })
  }

  setPassword(event) {
    let newVal = event.target.value || ''
    let errorMessage = newVal.length === 0 ? 'Password is required.' : ''
    this.setState({
      password: {
        value: newVal,
        error: errorMessage
      },
      submit: {
        error: ''
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      formSubmitted: true,
      submit: {
        error: ''
      }
    })

    if (this.getFormErrors().length > 0) {
      return false
    }

    Api.authenticateUser(this.state.email.value, this.state.password.value).then(jwt => {
      if (jwt) {
        this.props.propagateSignIn(jwt, this.props.history)
      }
      else {
        this.setState({
          submit: {
            error: 'Sorry, we could not log you in with the credentials provided. Please try again.'
          }
        })
      }
    })
  }
  render() {
    return (
      <div>
        <h2>SignIn</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>Email</label>
            <FormControl
              id="authEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              onChange={this.setEmail}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <FormControl
              id="authPassword"
              type="password"
              label="Password"
              placeholder="Enter password"
              onChange={this.setPassword}
            />
          </FormGroup>

          <Button type="submit">
            Log in
          </Button>

        </form>
      </div>
    );
  };
}