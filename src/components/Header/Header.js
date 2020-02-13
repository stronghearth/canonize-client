import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharacterContext from '../../context/CharacterContext'
import TokenService from '../../services/token-service'
import './header.css';

export default class Header extends Component {
    static contextType = CharacterContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.changeToLoggedOutState()
    }

    handleLoginClick = () => {
        this.context.handleOpenLogInForm()
    }
    handleRegisterClick = () => {
        this.context.handleOpenRegisterForm()
    }

    renderLogoutLink() {
        return (
            <div>
            <Link 
            onClick={this.handleLogoutClick}
            to='/'>
                Logout
            </Link>
            </div>
        )
    }

    renderLoginLink () {
        return (
            <>
            <div 
            onClick={this.handleLoginClick}>
          Log in
        </div>
        <div onClick={this.handleRegisterClick}>
          Register
        </div>
        </>
        )
    }
    render() {
        const { loggedIn } = this.context
        return <nav className='headerNav'>
            <Link className="navCanonizeLink"
                to='/'>
                <h4>
                Canonize
                </h4>
            </Link>
            {loggedIn
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
    }
}