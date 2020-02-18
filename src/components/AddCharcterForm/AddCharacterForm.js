import React, {Component} from 'react';
import CharacterApiService from '../../services/character-api-service';
import CanonContext from '../../context/CanonContext'
import './AddCharacterForm.css'

export default class AddCharacterForm extends Component {
    static contextType = CanonContext

    handleSubmit = (e) => {
        e.preventDefault()
        const {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img} = e.target
        const newCharacter = {
            character_name: character_name.value,
            age: age.value,
            gender: gender.value,
            strongest_bonds: strongest_bonds.value,
            antagonist: antagonist.value,
            appearance: appearance.value,
            mannerisms: mannerisms.value,
            general_desc: general_desc.value,
            art_img: art_img.value,
        }

        const {updateCharacterList, changeSelectedCharacter, addSuccessMessage, handleCloseFormAfterAdd, errorCatch} = this.context;
        CharacterApiService.postCharacter(newCharacter)
            .then(char => {
                updateCharacterList(char)
                changeSelectedCharacter(char)
                addSuccessMessage()
                handleCloseFormAfterAdd()
            })
            .catch(error => errorCatch(error))
    }

    render() {
        const {error, successMessage} = this.context
        return <>
            {successMessage && <p>{successMessage}</p>}
            <form className="newCharacterForm" onSubmit={this.handleSubmit}>
                {error && <p>{error}</p>}
            <legend>Add A New Character</legend>
            <div className="formLeft">
                <label htmlFor="characterName" className="newCharacter">Name *</label><br />
                <input type="text" id="character_name" placeholder="Ellandra Berevan" name="character_name" className="newCharacter" required/><br />

                <label htmlFor="age" className="newCharacter">Age</label><br />
                <input type="text" id="age" name="age" className="newCharacter" placeholder="109"/><br />

                <label htmlFor="gender" className="newCharacter">Gender</label><br />
                <input type="text" if="gender" name="gender" className="newCharacter" placeholder="They/Them"/><br />

                <label htmlFor="strongest_bonds" name="bonds" className="newCharacter">Strongest Bonds</label><br />
                <input type="text" id="strongest_bonds" name="strongest_bonds" className="newCharacter" placeholder="Very close with her patron"/><br />

                <label htmlFor="antagonist" name="antagonist" className="newCharacter">Antagonist</label><br />
                <input type="text" id="antagonist" name="antagonist" className="newCharacter" placeholder="Argan Berevan"/><br />  
            </div>
            <div className="formRight">
                <label htmlFor="appearance" className="newCharacter">Appearance</label><br />
                <textarea type="text" id="appearance" name="appearance" className="newCharacter" placeholder="e.g. blonde, curly hair, 6 ft tall, pointy ears, always sleepy eyes"></textarea><br />

                <label htmlFor="mannerisms" className="newCharacter">Mannerisms</label><br />
                <textarea type="text" id="mannerisms" name="mannerisms" className="newCharacter" placeholder="e.g. obsessively writes down all their dreams in a notebook"></textarea><br />

                <label htmlFor="description" className="newCharacter">General Description *</label><br />
                <textarea name="general_desc" id="general_desc" className="newCharacter" placeholder="e.g. an elf with a dark secret" required></textarea><br />

                <label htmlFor="art_img" name="artwork" className="newCharacter">Artwork</label><br />
                <input type="url" name="art_img" id="art_img" className="artwork newCharacter" pattern="https://.*" placeholder="https://example.com/exampleimg.jpg"/>
            </div>
        <div className="characterButtons">
        <button className="addToCanonButton" type="submit">Add to Your Cannon</button>
        <button onClick={(e) => this.context.handleCloseAddButton(e)}>Close</button>
        </div>
        </form>
        </>
    }
}