import React, {Component} from 'react';
import CharacterApiService from '../../services/character-api-service';
import CanonContext from '../../context/CanonContext';
import './EditCharacterForm.css'

export default class EditCharacterForm extends Component {
    static contextType = CanonContext
    constructor(props){
        super(props)
        this.state = {
            characterName: '',
            age: '',
            gender: '',
            strongest_bonds: '',
            antagonist: '',
            appearance: '',
            mannerisms: '',
            general_desc: '',
            art_img: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {character, updateCharacter, editSuccessMessage, closeEditForm, errorCatch} = this.context
        const id = character.id
        const {character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img} = e.target
        const characterToUpdate = {
            id: character.id,
            character_name: character_name.value,
            age: age.value || '',
            gender: gender.value || '',
            strongest_bonds: strongest_bonds.value || '',
            antagonist: antagonist.value || '',
            appearance: appearance.value || '',
            mannerisms: mannerisms.value || '',
            general_desc: general_desc.value,
            art_img: art_img.value || ''
        }
        CharacterApiService.updateCharacter(characterToUpdate, id)
            .catch(error => errorCatch(error))
        
        updateCharacter(characterToUpdate)
        editSuccessMessage()
        closeEditForm()
        setTimeout(function(){window.location.reload(true)}, 2000)
    }

    componentDidMount() {
        const {character} = this.context
        const id = character.id
        CharacterApiService.getCharacterbyId(id)
        .then(res => {
            this.setState({
                characterName: res.character_name,
                age: res.age || '',
                gender: res.gender || '',
                strongest_bonds: res.strongest_bonds || '',
                antagonist: res.antagonist || '',
                appearance: res.appearance || '',
                mannerisms: res.mannerisms || '',
                general_desc: res.general_desc,
                art_img: res.art_img || ''
            })
        })
        
    }
    render() {
        const {characterName, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img} = this.state
        const {error, successMessage, closeEditForm} = this.context
        return (<>
                {successMessage && <p className="successMessage">{successMessage}</p>}
                <form className="editCharacterForm" onSubmit={this.handleSubmit}>
                    {error && <p className="errorMessage">{error}</p>}
                    <legend>Edit Your Character</legend>
                    <div className="formFields">
                        <div className="formLeft">
                            <label htmlFor="characterName" className="newCharacter" >Name *</label><br />
                            <input type="text" id="character_name" placeholder="Ellandra Berevan" value={characterName} onChange={e => this.setState({characterName: e.target.value})}name="character_name" className="newCharacter" required/><br />

                            <label htmlFor="age" className="newCharacter" >Age</label><br />
                            <input type="text" id="age" name="age" className="newCharacter" value={age} onChange={e => this.setState({age: e.target.value})} placeholder="109"/><br />

                            <label htmlFor="gender" className="newCharacter" >Gender</label><br />
                            <input type="text" id="gender" name="gender" className="newCharacter" value={gender} onChange={e => this.setState({gender: e.target.value})} placeholder="They/Them"/><br />

                            <label htmlFor="art_img" name="artwork" className="newCharacter" >Artwork</label><br />
                            <input type="url" name="art_img" id="art_img" value={art_img} onChange={e => this.setState({art_img: e.target.value})} className="artwork newCharacter" pattern="https://.*" placeholder="https://example.com/exampleimg.jpg"/><br />

                            <label htmlFor="strongest_bonds" name="bonds" className="newCharacter">Strongest Bonds</label><br />
                            <textarea type="text" id="strongest_bonds" name="strongest_bonds" className="newCharacter" value={strongest_bonds} onChange={e => this.setState({strongest_bonds: e.target.value})}placeholder="Very close with her patron"/><br />  
                        </div>
                        <div className="formRight">
                            <label htmlFor="antagonist" name="antagonist" className="newCharacter">Antagonist</label><br />
                            <textarea type="text" id="antagonist" name="antagonist" className="newCharacter" value={antagonist} onChange={e => this.setState({antagonist: e.target.value})} placeholder="Argan Berevan"/><br />

                            <label htmlFor="appearance" className="newCharacter" >Appearance</label><br />
                            <textarea type="text" id="appearance" name="appearance" className="newCharacter" value={appearance} onChange={e => this.setState({appearance: e.target.value})} placeholder="e.g. blonde, curly hair, 6 ft tall, pointy ears, always sleepy eyes"></textarea><br />

                            <label htmlFor="mannerisms" className="newCharacter" >Mannerisms</label><br />
                            <textarea type="text" id="mannerisms" name="mannerisms" value={mannerisms} onChange={e => this.setState({mannerisms: e.target.value})} className="newCharacter" placeholder="e.g. obsessively writes down all their dreams in a notebook"></textarea><br />

                            <label htmlFor="description" className="newCharacter" >General Description *</label><br />
                            <textarea name="general_desc" id="general_desc" value={general_desc} onChange={e => this.setState({general_desc: e.target.value})} className="newCharacter" placeholder="e.g. an elf with a dark secret" required></textarea><br />
                            
                        </div>
                    </div>
                    <div className="characterButtons">
                        <button type="submit">Save</button>
                        <button onClick={() => closeEditForm()}>Close</button>
                    </div>
            </form>
            </>
        )
    }
}