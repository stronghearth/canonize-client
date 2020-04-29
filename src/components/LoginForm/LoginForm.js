import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import CharacterContext from '../../context/CharacterContext';

export default class LoginForm extends Component {
    static contextType = CharacterContext
    state = { error: null }

    handleSubmitJWTAuth = e => {
        e.preventDefault()
        this.setState({ error: null})
        const { user_name, password} = e.target

        AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
        .then(res => {
          user_name.value = ''
          password.value= ''
          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess(res.authToken)
        })
        .catch(res => {
          this.setState({error: res.error})
        })
      }

    render() {
        const {error} = this.state
        return (
            <form className="login"
            onSubmit={this.handleSubmitJWTAuth}
            >
                <h3>Log In</h3>
                <div role='alert'>
                    {error && <p className='errorMessage'>{error}</p>}
                </div>
                <label className="userFormLabel" htmlFor='username'>Username</label>
                <input type='text' id='username' name='user_name' aria-label="username" placeholder="Username" required/>

                <label className="userFormLabel" htmlFor="password">Password</label>
                <input type='password' id='password' aria-label="password" placeholder="Password" name='password' required/>
                <button type="submit" className="loginButton">Log In</button>
            </form>
        )
    }
}