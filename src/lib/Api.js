import axios from 'axios';

let apiHost = 'http://localhost:3000'

const Api = {
  authenticateUser: function(email, password) {
    let data = {
      auth: {
        email: email,
        password: password
      }
    }
    return axios.post(apiHost + '/api/user/token', data)
      .then(function (response) {
        return response.data.jwt
      })
      .catch(function (error) {
        return undefined
      })
  },
  getCurrentUser: function(jwt) {
    var config = {
      headers: {}
    }
    if (jwt) {
      config['headers']['Authorization'] = 'Bearer ' + jwt
    }
    return axios.get(apiHost + '/api/users/current', config)
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  },
  getTweets: function() {
    return axios.get(apiHost + '/api/tweets')
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  },
  getTweet: function(jwt, id) {
    var config = {
      headers: {}
    }
    if (jwt) {
      config['headers']['Authorization'] = 'Bearer ' + jwt
    }
    return axios.get(apiHost + '/api/tweets/' + id, config)
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  }
}
export default Api;
