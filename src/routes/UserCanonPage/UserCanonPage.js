import React, { Component } from 'react';
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
import UserExpandedItem from '../../components/UserExpandedItem/UserExpandedItem';
import AddCharacterForm from '../../components/AddCharcterForm/AddCharacterForm';

export default class UserCanonPage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
        error: null,
        characters: [],
        character: {},
        formOpen: false,
    }
    }

    handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            formOpen: true
        })
    }

    handleClose = (e) => {
        e.preventDefault()
        this.setState({
            formOpen: false
        })
    }

    renderCharacterForm = () => {
        if (this.state.formOpen) {
            return(
                <>
                <AddCharacterForm/>
                <button onClick={(e) => this.handleClose(e)}>Close</button>
                </>
            )
        }
        return <></>
    }

    changeSelectedCharacter = (char) => {
        const characterIndex = this.state.characters.findIndex(character => character === char)
        this.setState({
            ...this.state,
            character: this.state.characters[characterIndex]
        })
    }

    componentDidMount() {
       CharacterApiService.getCharacters()
            .then(res => {
                this.setState({
                    characters: res || [],
                    character: res[0] || {}
                })
            })
            .catch(error => this.setState({
                error: error.message
            }))
    }

    render() {
        const { characters, character } = this.state
        return <>
        <section>
            <h2 className="userGreeting">Welcome, Canonizer!</h2>{/*implement user insert*/}
            <p className="characterCount">You currently have {characters.length} character(s) in your canon.</p>
        </section>
        <div className = "selectedCharacter">
            <UserExpandedItem currentCharacter={character}/>
        </div>
        <button onClick={(e) => this.handleOpen(e)}>Add Character</button>
        {this.renderCharacterForm()}
        {characters.length === 0 ? <></> :
        <ul className="characterList">
           <UserCanonItem 
           characters={characters}
           changeSelectedCharacter={this.changeSelectedCharacter}/>
        </ul>}
        </>
    }
}