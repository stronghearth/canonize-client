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

    render() {
        const {error} = this.state
        const { handleCloseRegisterForm } = this.context
        return (
            <form className="registration" onSubmit={this.handleSumbit}>
                <h3>Register</h3>
                <div role='alert'>
                    {error && <p className='errorMessage'>{error}</p>}
                </div>
                <label className="userFormLabel" htmlFor='full_name'>Full Name</label>
                <input name='full_name' type='text' required id='full_name' aria-label="Full Name" placeholder="Full Name"/>

                <label className="userFormLabel" htmlFor='user_name'>Username</label>
                <input name='user_name' type='text' required id='user_name' aria-label="Username" placeholder="Username"/>

                <label className="userFormLabel" htmlFor='password'>Password</label>
                <input name='password' type='password' required id='password' aria-label="Password" placeholder="Password"/>
                <div className="charcterButtons">
                <button type='Submit' className="registerButton">Register</button>
                <button type="cancel" onClick={e => handleCloseRegisterForm()} className="registerButton">Cancel</button>
                </div>
            </form>
        )
    }
}