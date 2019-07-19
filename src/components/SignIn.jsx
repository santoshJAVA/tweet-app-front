import React from 'react';


export default class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(e) {
    e.preventDefault();
    let that = this
    fetch('http://localhost:3000/auth/sign_in', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
    })
    .then(function(response){
      console.log("Success")
      // that.props.changePage("delete");
      // that.props.updateCurrentUser(email);
    })
    .catch(function(error){
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        <h2>SignIn</h2>
        <form>
          <input id="email" placeholder="email"/>
          <input id="password" placeholder="password" type="password"/>
          <button onClick={this.handleSignup}>Submit</button>
        </form>
      </div>
    );
  };
}