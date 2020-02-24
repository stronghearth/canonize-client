import React, { Component } from 'react';
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

    handleAboutClick = () => {
        this.context.handleOpenInstructions()
        this.context.handleCloseRegisterForm()
        this.context.handleCloseLoginForm()
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
                <a className="navLink"
                onClick={this.handleLogoutClick}
                href='/'>
                    Logout
                </a>
            </div>
            </>
        )
    }

    renderLoginLink () {
        return (
        <div className ="loginRegister">
            <p className="navLink" 
               onClick={this.handleAboutClick}>
                About
            </p>
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
        const { loggedIn } = this.context
        return <nav className='headerNav'>
            {loggedIn
            ? <h4 className="canonizeDormant">Canonize</h4>
            : <a className="navCanonizeLink"
                onClick={this.closeForms}
                href='/'>
                    <h4>
                    Canonize
                    </h4>
               </a>}
            {loggedIn
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
    }
}