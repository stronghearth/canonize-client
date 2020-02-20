import React, { Component } from 'react';
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserExpandedItem from '../../components/UserExpandedItem/UserExpandedItem';
import AddCharacterForm from '../../components/AddCharcterForm/AddCharacterForm';
import CanonContext from '../../context/CanonContext';
import './UserCanonPage.css'

export default class UserCanonPage extends Component {
    static contextType = CanonContext
  
    renderCharacterForm = () => {
        if (this.context.addFormOpen) {
            return(
                <AddCharacterForm />
            )
        }
        return <></>
    }

    componentDidMount() {
        const {getInitialCharacterList, errorCatch} = this.context
       CharacterApiService.getCharacters()
            .then(res => {
                getInitialCharacterList(res)
            })
            .catch(error => errorCatch(error))
    }
    
    render() {
        const { characters, handleOpenAdd, character, addButtonHidden } = this.context
        return <>
        <section>
            <h2 className="userGreeting">Welcome, Canonizer!</h2>
        </section>
        <section className="canonSection">
            
            {!character ? <></> : <div className = "selectedCharacter"><UserExpandedItem /></div> }
                
            <div className="characterMenu">

                {addButtonHidden ? <></> : <button className="addButton" onClick={(e) => handleOpenAdd(e)}>Add Character</button>}
                {this.renderCharacterForm()}
                
                {characters.length === 0 || this.context.addFormOpen ? <></> : 
                <>
                    <h4>Characters in Your Canon</h4>
                    <p className="characterCount">{characters.length} character(s)</p>
                    <SearchBar />
                    <ul className="characterList">
                    <UserCanonItem />
                    </ul>
                </>}
            </div>
        </section>
        </>
    }
}