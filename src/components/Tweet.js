import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'

import Api  from '../lib/Api.js';

class Tweet extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tweet: {
        id: props.match.params.id,
        content: ''
      },
      loading: true,
      flashMessage: {
        message: undefined,
        style: 'success'
      }
    }
  }

  componentDidMount() {
    this.getTweet()
  }


  getTweet(tweetId = null) {
    tweetId = tweetId || this.state.tweet.id

    this.setState({
      loading: true,
      flashMessage: {
        message: undefined,
        style: 'success'
      }
    })

    let jwt = this.props.appState.jwt
    Api.getTweet(jwt, tweetId).then(response => {
      if (response) {
        this.setState({
          tweet: response,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false,
          flashMessage: {
            message: 'Access Denied.',
            style: 'danger'
          }
        })
      }
    })
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <Container>
        <Row>
          <Col xs={12} md={12}>

            {this.state.flashMessage.message &&
              <Container>
                <Row>
                  <Col xs={12} md={12}>
                    <Alert bsStyle={this.state.flashMessage.style}>
                      {this.state.flashMessage.message}
                    </Alert>
                  </Col>
                </Row>
              </Container>
            }
            <div>{this.state.tweet.id}</div>
            <div>{this.state.tweet.user_email}</div>
            <div>{this.state.tweet.content}</div>

          </Col>
        </Row>
      </Container>
    )
  }
}

export default Tweet
