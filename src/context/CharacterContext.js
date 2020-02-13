import React, {Component} from 'react';


const CharacterContext = React.createContext({
    characters: [],
    character: {},
    error: null,
    openRegister: false,
    logInFormOpen: false,
    loggedIn: false,
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    handleOpenLogInForm: () => {},
    handleOpenRegisterForm: () => {}
})

export default CharacterContext

export class CharacterProvider extends Component {
    state = {
        loggedIn: false,
        logInFormOpen: false,
        openRegister: false,
        characters: [],
        character: {},
        error: null,
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

    handleOpenRegisterForm = () => {
        this.setState({
            openRegister: true,
            logInFormOpen: false
        })
    }
    render() {
        const value = {
            characters: this.state.characters,
            character: this.state.character,
            error: this.state.error,
            loggedIn: this.state.loggedIn,
            logInFormOpen: this.state.logInFormOpen,
            openRegister: this.state.openRegister,
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