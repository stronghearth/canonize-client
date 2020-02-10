import React, { Component } from 'react';

export default class UserCanonItem extends Component {
    render() {
    const characters = this.props.characters
    return characters.map(character => {
        const characterId = character.id
        const characterName = character.character_name
        return <li key={characterId} 
                   className="navCharacter" 
                   onClick={() => {this.props.changeSelectedCharacter(character)}}>
                            {characterName}
                </li>
    })
    }
}