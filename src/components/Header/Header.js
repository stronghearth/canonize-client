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
        this.closeForms()
        this.context.handleFinishRegister()
    }

    handleLoginClick = () => {
        this.context.handleOpenLogInForm()
    }

    handleRegisterClick = () => {
        this.context.handleOpenRegisterForm()
    }
    
    closeForms= () => {
       if (this.context.logInFormOpen) {
           this.context.handleCloseLoginForm()
       }
       if (this.context.openRegister) {
           this.context.handleCloseRegisterForm()
       }
       if(this.context.registerDone) {
           this.context.handleFinishRegister()
       }
    }
    

    renderLogoutLink() {
        return (
            <>
            <div className="loginRegister">
            <Link 
            onClick={this.handleLogoutClick}
            to='/'>
                Logout
            </Link>
            </div>
            </>
        )
    }

    renderLoginLink () {
        return (
        <div className ="loginRegister">
            <p className="navLink"
               onClick={this.handleLoginClick}>
                Log in
            </p> 
            <p className="navLink" 
                onClick={this.handleRegisterClick}>
                Register
            </p>
        </div>
        )
    }
    render() {
        console.log(this.context)
        const { loggedIn } = this.context
        return <nav className='headerNav'>
            {loggedIn
            ? <h4 className="canonizeDormant">Canonize</h4>
            : <Link className="navCanonizeLink"
            onClick={this.closeForms}
            to='/'>
            <h4>
            Canonize
            </h4>
            </Link>}
            {loggedIn
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
    }
}