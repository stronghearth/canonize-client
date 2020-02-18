import React, {Component} from 'react';
import TokenService from '../services/token-service'


const CharacterContext = React.createContext({
    openRegister: false,
    logInFormOpen: false,
    loggedIn: TokenService.hasAuthToken(),
    registerDone: false,
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    handleOpenLogInForm: () => {},
    handleCloseLoginForm: () => {},
    handleOpenRegisterForm: () => {},
    handleCloseRegisterForm: () => {},
    handleSuccessFullRegister: () => {},
    handleFinishRegister: () => {}
})



export class CharacterProvider extends Component {
    state = {
        loggedIn: TokenService.hasAuthToken(),
        logInFormOpen: false,
        openRegister: false,
        registerDone: false,
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
            openRegister: false,
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
            openRegister: false,
        })
    }

    handleSuccessFullRegister = () => {
        this.setState({
            registerDone: true
        })
    }

    handleFinishRegister = () => {
        this.setState({
            registerDone: false,
        })
    }
    render() {
        const value = {
            loggedIn: this.state.loggedIn,
            logInFormOpen: this.state.logInFormOpen,
            openRegister: this.state.openRegister,
            registerDone: this.state.registerDone,
            changeToLoggedInState: this.changeToLoggedInState,
            changeToLoggedOutState: this.changeToLoggedOutState,
            handleOpenLogInForm: this.handleOpenLogInForm,
            handleCloseLoginForm: this.handleCloseLoginForm,
            handleOpenRegisterForm: this.handleOpenRegisterForm,
            handleCloseRegisterForm: this.handleCloseRegisterForm,
            handleSuccessFullRegister: this.handleSuccessFullRegister,
            handleFinishRegister: this.handleFinishRegister,
        }
        return(
            <CharacterContext.Provider value={value}>
                {this.props.children}
            </CharacterContext.Provider>
        )
    }
}
export default CharacterContext