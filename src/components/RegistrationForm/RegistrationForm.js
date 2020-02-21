import React, { Component } from 'react';
import CharacterContext from '../../context/CharacterContext';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    };

    static contextType = CharacterContext

    state= {
        error: null,
    };

    handleSumbit = e => {
        e.preventDefault()
        const {full_name, user_name, password} = e.target

        this.setState({error: null})
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            full_name: full_name.value
        })
            .then(user => {
                user_name.value = ''
                password.value = ''
                full_name.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    // passwordCheck = () => {
    //     const password = this.state.password
    //     const minimumLength = 8
    //     if(password.length < minimumLength) {
    //         this.setState ({
    //             error: 'Password must be at least 8 characters long'
    //         })
    //     }
    //     if(!password.hasNumber){
    //         this.setState({
    //             error: 'Password must contain a number'
    //         })
    //     }
    //     if(password.hasUpperCase){
    //         this.setState({
    //             error: 'Password must have at least one uppercase letter'
    //         })
    //     }
    //     if(password.length === 0) {(
    //         this.setState({
    //             error: null
    //         })
    //     )}
    // }

    render() {
        const {error} = this.state
        return (
            <form className="registration" onSubmit={this.handleSumbit}>
                <h3>Register</h3>
                <div role='alert'>
                    {error && <p className='errorMessage'>{error}</p>}
                </div>
                <label htmlFor='full_name'>Full Name: * </label>
                <input name='full_name' type='text' required id='full_name'/><br />

                <label htmlFor='user_name'>Username: * </label>
                <input name='user_name' type='text' required id='user_name'/><br />

                <label htmlFor='password'>Password: * </label>
                <input name='password' type='password' required id='password' /><br />
                <button type='Submit' className="registerButton">Register</button>
            </form>
        )
    }
}