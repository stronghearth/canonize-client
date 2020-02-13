import React, {Component} from 'react';


const CharacterContext = React.createContext({
    openRegister: false,
    logInFormOpen: false,
    loggedIn: false,
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    handleOpenLogInForm: () => {},
    handleCloseLoginForm: () => {},
    handleOpenRegisterForm: () => {},
    handleCloseRegisterForm: () => {}
})

export default CharacterContext

export class CharacterProvider extends Component {
    state = {
        loggedIn: false,
        logInFormOpen: false,
        openRegister: false,
    }
    changeToLoggedInState = () => {
        this.setState({
            loggedIn: true
        })
    }

    changeToLoggedOutState = () => {
        this.setState({
            loggedIn: false
        })
    }

    handleOpenLogInForm = () => {
        this.setState({
            logInFormOpen: true,
            openRegister: false
        })
    }

    handleCloseLoginForm= () => {
        this.setState({
            logInFormOpen: false
        })
    }

    handleOpenRegisterForm = () => {
        this.setState({
            openRegister: true,
            logInFormOpen: false
        })
    }

    handleCloseRegisterForm = () => {
        this.setState({
            openRegister: false
        })
    }
    render() {
        const value = {
            loggedIn: this.state.loggedIn,
            logInFormOpen: this.state.logInFormOpen,
            openRegister: this.state.openRegister,
            changeToLoggedInState: this.changeToLoggedInState,
            changeToLoggedOutState: this.changeToLoggedOutState,
            handleOpenLogInForm: this.handleOpenLogInForm,
            handleCloseLoginForm: this.handleCloseLoginForm,
            handleOpenRegisterForm: this.handleOpenRegisterForm,
            handleCloseRegisterForm: this.handleCloseRegisterForm
        }
        return(
            <CharacterContext.Provider value={value}>
                {this.props.children}
            </CharacterContext.Provider>
        )
    }
}