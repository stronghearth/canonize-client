import React, { Component } from 'react';
import CanonContext from '../../context/CanonContext'

export default class UserCanonItem extends Component {
    static contextType = CanonContext
    render() {
    const {characters, changeSelectedCharacter} = this.context
    return characters.map(character => {
        const characterId = character.id
        const characterName = character.character_name
        return <li key={characterId} 
                   className="navCharacter" 
                   onClick={() => {changeSelectedCharacter(character)}}>
                            {characterName}
                </li>
    })
    }
}