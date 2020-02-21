import React, {Component} from 'react';
import TokenService from '../services/token-service'

//context for state manipulation concerning the LandingPage route and the LoginForm and RegistrationForm components
const CharacterContext = React.createContext({
    openRegister: false,
    logInFormOpen: false,
    loggedIn: TokenService.hasAuthToken(),
    registerDone: false,
    instructionsOpen: false,
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    handleOpenInstructions: () => {},
    handleCloseInstructions: () => {},
    handleOpenLogInForm: () => {},
    handleCloseLoginForm: () => {},
    handleOpenRegisterForm: () => {},
    handleCloseRegisterForm: () => {},
    handleSuccessFullRegister: () => {},
    handleFinishRegister: () => {}
})



export class CharacterProvider extends Component {
    state = {
        loggedIn: TokenService.hasAuthToken(), //validates if a user has a valid JWT token before myCanon page is loaded
        logInFormOpen: false,
        openRegister: false,
        registerDone: false,
        instructionsOpen: false,
    }

    //guides users between pages when they have logged in or out
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

    //handles state conditions for About secion
    handleOpenInstructions = () => {
        this.setState({
            instructionsOpen: true
        })
    }

    
    handleCloseInstructions = () => {
        this.setState({
            instructionsOpen: false
        })
    }

    //handles state dynamics around rendering and closing the LoginForm component
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

    //Handles conditions around rendering and closing the RegistrationForm component and showing positive feedback on successfull registration

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
            instructionsOpen: this.state.instructionsOpen,
            changeToLoggedInState: this.changeToLoggedInState,
            changeToLoggedOutState: this.changeToLoggedOutState,
            handleOpenInstructions: this.handleOpenInstructions,
            handleCloseInstructions: this.handleCloseInstructions,
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