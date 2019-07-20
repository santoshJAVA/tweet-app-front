import React from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthSignIn from './SignIn'
import Home from './Home'
import Tweet from './Tweet'

import Api  from '../lib/Api.js';

class TokenAuthComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = this.defaultState()

    this.propagateSignIn = this.propagateSignIn.bind(this)
  }

  propagateSignIn(jwt, history = undefined) {
    const { cookies } = this.props
    cookies.set(this.state.cookieName, jwt, { path: '/' })
    this.getUser(history)
  }


  getTweets() {
    Api.getTweets().then(response => {
      this.setState({
        tweets: response
      })
    })
  }

  getUser(history = undefined) {
    const { cookies } = this.props
    let jwt = cookies.get(this.state.cookieName)
    if (!jwt) return null

    Api.getCurrentUser(jwt).then(response => {
      if (response !== undefined) {
        this.setState({
          email: response.email,
          user_id: response.id,
          jwt: jwt
        })
        if (history) history.push('/')
      }
      else {
        // user has cookie but cannot load current user
        cookies.remove(this.state.cookieName)
        this.setState({
          email: undefined,
          user_id: undefined,
          jwt: undefined
        })
      }
    })
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />

          <Route
            exact path='/tweets/:id'
            render={(routeProps) => (
              <Tweet {...routeProps} appState={this.state} />
            )}
          />

          {!this.state.jwt &&
            <Route
              exact path="/sign-in"
              render={(routeProps) => (
                <AuthSignIn {...routeProps} propagateSignIn={this.propagateSignIn} />
              )}
            />
          }
        </div>
      </Router>
    )
  }

  componentDidMount() {
    this.getUser()
    this.getTweets()
  }

  defaultState() {
    return {
      cookieName: 'rails-react-token-auth-jwt',
      email: undefined,
      jwt: undefined,
      user_id: undefined,
      tweets: []
    }
  }

}

export default withCookies(TokenAuthComponent)
