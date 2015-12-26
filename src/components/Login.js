import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Helmet from 'react-helmet';
import helper from '../RestHelper';

const Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  handleLogin() {
    helper.post('/login', {username: this.state.username, password: this.state.password})
  },

  handleUserData(e) {
    this.setState({
      username: e.target.value
    });
  },

  handlePasswordData(e) {
    this.setState({
      password: e.target.value
    });
  },

  render() {
    return (
      <div>
        <Helmet title="Login"/>
        <Paper style={{width: '60%', margin: '100px auto', padding: '30px 0'}}>
          <div style={{textAlign: 'center'}}>
            <TextField hintText="Username" onChange={this.handleUserData}/>
            <br/>
            <TextField hintText="Password" floatingLabelText="Password" type="password" onChange={this.handlePasswordData} />
            <br/>
            <RaisedButton style={{marginTop: 30}} label="Login!" onClick={this.handleLogin}/>
          </div>
        </Paper>
        if(messages) {
          <p>{messages}</p>
        }

      </div>
    )
  }
})

export default Login
