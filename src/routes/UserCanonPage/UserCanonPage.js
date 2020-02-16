import React, { Component } from 'react';
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
import UserExpandedItem from '../../components/UserExpandedItem/UserExpandedItem';
import AddCharacterForm from '../../components/AddCharcterForm/AddCharacterForm';
import CanonContext from '../../context/CanonContext'

export default class UserCanonPage extends Component {
    static contextType = CanonContext
    /*constructor(props) {
        super(props)
        this.state = {
            error: null,
            characters: [],
            character: {},
            formOpen: false,
        }
    }*/

    /*handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            formOpen: true
        })
    }*/

    

    renderCharacterForm = () => {
        if (this.context.addFormOpen) {
            return(
                <>
                <AddCharacterForm />
                <button onClick={(e) => this.context.handleCloseAddButton(e)}>Close</button>
                </>
            )
        }
        return <></>
    }

    /*updateCharacterList = (char) => {
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
    }

    updateCharacter = (char) => {
        this.setState({
            character: char
        })
    }*/

    componentDidMount() {
        const {getInitialCharacterList, errorCatch} = this.context
       CharacterApiService.getCharacters()
            .then(res => {
                getInitialCharacterList(res)
            })
            .catch(error => errorCatch(error))
    }
    
    render() {
        const { characters, handleOpenAdd } = this.context
        return <>
        <section>
            <h2 className="userGreeting">Welcome, Canonizer!</h2>{/*implement user insert*/}
            <p className="characterCount">You currently have {characters.length} character(s) in your canon.</p>
        </section>
        <div className = "selectedCharacter">
            <UserExpandedItem />
        </div>
        <button onClick={(e) => handleOpenAdd(e)}>Add Character</button>
        {this.renderCharacterForm()}
        {characters.length === 0 ? <></> :
        <ul className="characterList">
           <UserCanonItem />
        </ul>}
        </>
    }
}