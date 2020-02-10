import React, { Component } from 'react';
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
import UserExpandedItem from '../../components/UserExpandedItem/UserExpandedItem';

export default class UserCanonPage extends Component {
    state = {
        error: null,
        characters: [],
        character: {}
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
                    characters: res,
                    character: res[0]
                })
            })
            .catch(error => this.setState({
                error: error.message
            }))
    }
    render() {
        return <>
        <div className = "selectedCharacter">
            <UserExpandedItem currentCharacter={this.state.character}/>
        </div>
        <ul className="characterList">
           <UserCanonItem 
           characters={this.state.characters}
           changeSelectedCharacter={this.changeSelectedCharacter}/>
        </ul>
        </>
    }
}