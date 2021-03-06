import React, { Component } from 'react';
import EditCharacterForm from '../EditCharacterForm/EditCharacterForm';
import CanonContext from '../../context/CanonContext';
import CharacterService from '../../services/character-api-service';
import './UserExpandedItem.css'

export default class UserExpandedItem extends Component {
    static contextType = CanonContext

    handleDelete = (id) => {
        const {deleteSuccessMessage, errorCatch, removeCharacter} = this.context
        CharacterService.deleteCharacter(id)
            .then(
                deleteSuccessMessage()
            )
            .then(removeCharacter(id))
            .catch(error => errorCatch(error)
            )
    }

    render() {
        const {error, successMessage, character, editFormOpen, openEditForm}= this.context

        return <>
                {editFormOpen
                ? <EditCharacterForm />
                : <><div role='alert'>
                    {error && <p className='errorMessage'>{error}</p>}
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                </div>
                        {!character.character_name ? <></> : <h3 className="characterName">{character.character_name}</h3>}
                <div className="characterCard">
                    <div className="characterLeft">
                        {!character.art_img ? <></> : <img src={character.art_img} className="characterAvatar" alt={character.character_name}/>}
                    </div>
                <ul className="expandedUlChar">
                    {!character.age ? <></> : <li><p>Age: {character.age}</p></li>}
                    {!character.gender ? <></> : <li><p>Gender: {character.gender}</p></li>}
                    {!character.strongest_bonds ? <></> : <li><p>Strongest Bonds: {character.strongest_bonds}</p></li>}
                    {!character.antagonist ? <></> : <li><p>Antagonist: {character.antagonist}</p></li>}
                    {!character.appearance ? <></> : <li><p>Appearance: {character.appearance}</p></li>}
                    {!character.mannerisms ? <></> : <li><p>Mannerisms: {character.mannerisms}</p></li>}
                    {!character.general_desc ? <></> : <li><p>General Description: {character.general_desc}</p></li>}
                </ul>
                </div>
                <div className="characterButtons">
                    <button className="editButton" onClick={() => openEditForm()}>Edit</button>
                    <button className="deleteButton" onClick={() => this.handleDelete(character.id)}>Delete</button>
                </div></>}
                </>
    }
}