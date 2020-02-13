import React, { Component } from 'react';

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    };

    state= {error: null};

    render() {
        const {error} = this.state
        return (
            <form className="registration">
                <h2>Register</h2>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <label htmlFor='full_name'>Full Name: * </label>
                <input name='full_name' type='text' required id='full_name'/><br />

                <label htmlFor='user_name'>Username: * </label>
                <input name='user_name' type='text' required id='user_name'/><br />

                <label htmlFor='password'>Password: * </label>
                <input name='password' type='password' required id='password'/><br />
                <button type='Submit'>Register</button>
            </form>
        )
    }
}