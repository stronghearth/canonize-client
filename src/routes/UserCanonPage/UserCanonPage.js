import React, { Component } from 'react';
import config from  '../../config';

export default class UserCanonPage extends Component {
    state = {
        error: null,
        characters: []
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/characters`, {
                method: 'GET',
                headers: {
                    'content-type': 'applicaton/json'
                },
            })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    characters: res
                })
            })
            .catch(error => this.setState({
                error: error.message
            }))
    }
    render() {
        const characters = this.state.characters;
        return <ul className="characterList">
           {characters.map(character => {
               const characterId = character.id
               const characterName = character.character_name
               return <li key={characterId}>{characterName}</li>
           })}
        </ul>
    }
}