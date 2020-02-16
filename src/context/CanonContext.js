import React, {Component} from 'react';

const CanonContext = React.createContext({
    error: null,
    characters: [],
    character: {},
    addFormOpen: false,
    successMessage: null,
    editFormOpen: false,
    errorCatch: () => {},
    handleOpenAdd: () => {},
    handleCloseAddButton: () => {},
    handleCloseFormAfterAdd: () => {},
    getInitialCharacterList: () => {},
    updateCharacterList: () => {},
    removeCharacter: () => {},
    changeSelectedCharacter: () => {},
    updateCharacter: () => {},
    openEditForm: () => {},
    closeEditForm: () => {},
    addSuccessMessage: () => {},
    deleteSuccessMessage: () => {},
    editSuccessMessage: () => {},
    nullifySuccessMessage: () => {},
})

export default CanonContext

export class CanonProvider extends Component {
    state = {
        error: null,
        characters: [],
        character: {},
        addFormOpen: false,
        successMessage: null,
        editFormOpen: false,
    }

    errorCatch = (error) => {
        this.setState({
            error: error.message
        })
    }

    handleOpenAdd = (e) => {
        e.preventDefault()
        this.setState({
            addFormOpen: true,
        })
        this.nullifySuccessMessage()
    }

    handleCloseAddButton = (e) => {
        e.preventDefault()
        this.setState({
            addFormOpen: false
        })
    }

    handleCloseFormAfterAdd = () => {
        this.setState({
            addFormOpen: false
        })
    }

    getInitialCharacterList = (res) => {
        this.setState({
            characters: res,
            character: res[0]
        })
    }

    updateCharacterList = (char) => {
        this.setState({
            characters: [
                char,
                ...this.state.characters
            ]
        })
    }

    removeCharacter = (id) => {
        const newCharacters = this.state.characters.filter(char => char.id !== id)
        this.setState({
            characters: newCharacters,
            character: newCharacters[0]
        })
    }

    changeSelectedCharacter = (char) => {
        const characterIndex = this.state.characters.findIndex(character => character === char)
        this.setState({
            ...this.state,
            character: this.state.characters[characterIndex]
        })
        this.nullifySuccessMessage()
    }

    updateCharacter = (char) => {
        this.setState({
            character: char
        })
    }

    openEditForm = () => {
        this.setState({
            editFormOpen: true,
        })
        this.nullifySuccessMessage()
    }

    closeEditForm = () => {
        this.setState({
            editFormOpen: false
        })
    }

    addSuccessMessage = () => {
        this.setState({
            successMessage: 'Character Sucessfully Added!'
        })
    }
    deleteSuccessMessage = () => {
        this.setState({
            successMessage: 'Character Successfully Deleted!'
        })
    }

    editSuccessMessage = () => {
        this.setState({
            successMessage: 'Character Successfully Saved!'
        })
    }
    
    nullifySuccessMessage = () => {
        this.setState({
            successMessage: null
        })
    }
    render() {
        const value = {
            error: this.state.error,
            characters: this.state.characters,
            character: this.state.character,
            addFormOpen: this.state.addFormOpen,
            successMessage: this.state.successMessage,
            editFormOpen: this.state.editFormOpen,
            errorCatch: this.errorCatch,
            handleOpenAdd: this.handleOpenAdd,
            handleCloseAddButton: this.handleCloseAddButton,
            handleCloseFormAfterAdd: this.handleCloseFormAfterAdd,
            getInitialCharacterList: this.getInitialCharacterList,
            updateCharacterList: this.updateCharacterList,
            removeCharacter: this.removeCharacter,
            changeSelectedCharacter: this.changeSelectedCharacter,
            updateCharacter: this.updateCharacter,
            openEditForm: this.openEditForm,
            closeEditForm: this.closeEditForm,
            addSuccessMessage: this.addSuccessMessage,
            deleteSuccessMessage: this.deleteSuccessMessage,
            editSuccessMessage: this.editSuccessMessage,
            nullifySuccessMessage: this.nullifySuccessMessage
        }
        return (
            <CanonContext.Provider value={value}>
                {this.props.children}
            </CanonContext.Provider>
        )
    }
}