import React, {Component} from 'react';
import CharacterApiService from '../../services/character-api-service'

export default class AddCharacterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

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
            user_id: 1
        }

        CharacterApiService.postCharacter(newCharacter)
            .then(window.location.reload(false))
            .catch(error => this.setState({
                error: error.message
            }))
        
    }

    render() {
        return <form className="newCharacterForm" onSubmit={this.handleSubmit}>
            <legend>Add A New Character</legend>
            <div className="formLeft">
                <label htmlFor="characterName" className="newCharacter">Name *</label><br />
                <input type="text" id="character_name" placeholder="Ellandra Berevan" name="character_name" className="newCharacter" required/><br />

                <label htmlFor="age" className="newCharacter">Age</label><br />
                <input type="text" id="age" name="age" className="newCharacter" placeholder="109"/><br />

                <label htmlFor="age" className="newCharacter">Gender</label><br />
                <input type="text" if="gender" name="gender" className="newCharacter" placeholder="They/Them"/><br />

                <label htmlFor="age" name="bonds" className="newCharacter">Strongest Bonds</label><br />
                <input type="text" id="strongest_bonds" name="strongest_bonds" className="newCharacter" placeholder="Very close with her patron"/><br />

                <label htmlFor="age" name="antagonist" className="newCharacter">Antagonist</label><br />
                <input type="text" id="antagonist" name="antagonist" className="newCharacter" placeholder="Argan Berevan"/><br />  
            </div>
            <div className="formRight">
                <label htmlFor="appearance" className="newCharacter">Appearance</label><br />
                <textarea type="text" id="appearance" name="appearance" className="newCharacter" placeholder="e.g. blonde, curly hair, 6 ft tall, pointy ears, always sleepy eyes"></textarea><br />

                <label htmlFor="mannerisms" className="newCharacter">Mannerisms</label><br />
                <textarea type="text" id="mannerisms" name="mannerisms" className="newCharacter" placeholder="e.g. obsessively writes down all their dreams in a notebook"></textarea><br />

                <label htmlFor="description" className="newCharacter">General Description *</label><br />
                <textarea name="general_desc" id="general_desc" className="newCharacter" placeholder="e.g. an elf with a dark secret" required></textarea><br />

                <label htmlFor="age" name="artwork" className="newCharacter">Artwork</label><br />
                <input type="url" name="art_img" id="art_img" className="artwork newCharacter" pattern="https://.*" placeholder="https://example.com/exampleimg.jpg"/>
            </div>
        

        <button type="submit">Add to Your Cannon</button>
        
        </form>
    }
}