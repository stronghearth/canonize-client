import React, {Component} from 'react';

//context for state manipulation on the individual UserCanonPage route
const CanonContext = React.createContext({
    error: null,
    characters: [], //list of characters that are stored in user account
    character: {}, //item in characters array that is selected to render in expanded view
    addFormOpen: false,
    successMessage: null,
    editFormOpen: false,
    addButtonHidden: false,
    errorCatch: () => {},
    handleOpenAdd: () => {},
    handleCloseAddButton: () => {},
    handleCloseFormAfterAdd: () => {},
    hideAddButton: () => {},
    showAddButton: () => {},
    getInitialCharacterList: () => {},
    refreshCharacterList: () => {},
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



export class CanonProvider extends Component {
    state = {
        error: null,
        characters: [],
        character: {},
        addFormOpen: false,
        successMessage: null,
        editFormOpen: false,
        addButtonHidden: false
    }

    errorCatch = (error) => {
        this.setState({
            error: error.message
        })
    }

    //handles state conditions surrounding the Add Character Form component

    handleOpenAdd = (e) => {
        e.preventDefault()
        this.setState({
            addFormOpen: true,
        })
        this.closeEditForm()
        this.hideAddButton()
        this.nullifySuccessMessage()
    }

    handleCloseAddButton = (e) => {
        e.preventDefault()
        this.setState({
            addFormOpen: false
        })
        this.showAddButton()
    }

    handleCloseFormAfterAdd = () => {
        this.setState({
            addFormOpen: false
        })
        this.showAddButton()
    }

    hideAddButton = () => {
        this.setState ({
            addButtonHidden: true
        })
    }

    showAddButton = () => {
        this.setState({
            addButtonHidden: false
        })
    }

    //handles state conditions for what information is displayed in the UserCanonItem and UserExpandedItem components

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

    refreshCharacterList = (arr) => {
        this.setState({
            characters: arr
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
            character: char,
        })
    }

    //handles state conditions for displaying the EditCharacterForm component

    openEditForm = () => {
        this.setState({
            editFormOpen: true,
        })
        this.handleCloseFormAfterAdd()
        this.nullifySuccessMessage()
    }

    closeEditForm = () => {
        this.setState({
            editFormOpen: false
        })
    }

    //handles state conditions for displaying postive feedback when an action by the user is completed succesfully
    //positive feedback is cleared when user interacts with other components

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
            addButtonHidden: this.state.addButtonHidden,
            errorCatch: this.errorCatch,
            handleOpenAdd: this.handleOpenAdd,
            handleCloseAddButton: this.handleCloseAddButton,
            handleCloseFormAfterAdd: this.handleCloseFormAfterAdd,
            hideAddButton: this.hideAddButton,
            showAddButton: this.showAddButton,
            getInitialCharacterList: this.getInitialCharacterList,
            refreshCharacterList: this.refreshCharacterList,
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

export default CanonContext;