import React, { Component } from 'react';
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
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
        const { characters, handleOpenAdd } = this.context
        return <>
        <section>
            <h2 className="userGreeting">Welcome, Canonizer!</h2>{/*implement user insert*/}
            <p className="characterCount">You currently have {characters.length} character(s) in your canon.</p>
        </section>
        <section className="canonSection">
        <div className = "selectedCharacter">
            <UserExpandedItem />
        </div>
        <div className="addCharacterDiv">
        <button className="addButton" onClick={(e) => handleOpenAdd(e)}>Add Character</button>
        {this.renderCharacterForm()}
        </div>
        <div className="characterMenu">
        <h4>Characters in Your Canon</h4>
        {characters.length === 0 ? <></> :
        <ul className="characterList">
           <UserCanonItem />
        </ul>}
        </div>
        </section>
        </>
    }
}