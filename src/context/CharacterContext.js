import React, {Component} from 'react';


const CharacterContext = React.createContext({
    characters: [],
    character: {},
    error: null,
    logInFormOpen: false,
    registerFormOpen: false,
    loggedIn: false,
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    handleOpenLogInForm: () => {},
    handleOpenRegisterForm: () => {}
})

export default CharacterContext

export class CharacterProvider extends Component {
    state = {
        characters: [],
        character: {},
        error: null,
        loggedIn: false,
        logInFormOpen: false,
        registerFormOpen: false,
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
            logInFormOpen: true
        })
    }

    handleOpenRegisterForm = () => {
        console.log('yo!')
        this.setState({
            registerFormOpen: true
        })
    }

    render() {
        const value = {
            characters: this.state.characters,
            character: this.state.character,
            error: this.state.error,
            loggedIn: this.state.loggedIn,
            logInFormOpen: this.state.logInFormOpen,
            registerFormOpen: this.registerFormOpen,
            changeToLoggedInState: this.changeToLoggedInState,
            changeToLoggedOutState: this.changeToLoggedOutState,
            handleOpenLogInForm: this.handleOpenLogInForm,
            handleOpenRegisterForm: this.handleOpenRegisterForm
        }
        return(
            <CharacterContext.Provider value={value}>
                {this.props.children}
            </CharacterContext.Provider>
        )
    }
}