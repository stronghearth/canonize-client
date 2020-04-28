import React, { Component } from 'react';
import FadeIn from "react-fade-in";
import ReactLoading from "react-loading";
import CharacterApiService from '../../services/character-api-service';
import UserCanonItem from '../../components/UserCanonItem/UserCanonItem';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserExpandedItem from '../../components/UserExpandedItem/UserExpandedItem';
import AddCharacterForm from '../../components/AddCharcterForm/AddCharacterForm';
import CanonContext from '../../context/CanonContext';
import './UserCanonPage.css'

export default class UserCanonPage extends Component {
    static contextType = CanonContext

    constructor(props) {
        super(props)
        this.state = {
            done: undefined
        }
    }
  
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
       setTimeout(() => { 
       CharacterApiService.getCharacters()
            .then(res => {
                getInitialCharacterList(res)
                setTimeout(() => {  
                    this.setState({ done: true})
                }, 2000);
            })
            .catch(error => errorCatch(error))
       }, 1200)
    }
    
    render() {
        const { characters, character, handleOpenAdd, addButtonHidden, addFormOpen } = this.context
        const { done } = this.state
        const {currentUser} = this.props
        return <>
         { !done ? <FadeIn><section className="loadingSection"><h1>Loading Your Canon</h1><ReactLoading type={"balls"} color={"#4A093E"} height={'60%'} width={'60%'}/></section></FadeIn> : <><section>
            <h2 className="userGreeting">Welcome, {currentUser.full_name}!</h2>
        </section>
        <section className="canonSection">
            
            {!character ? <></> : <div className = "selectedCharacter"><UserExpandedItem /></div> }
                
            <div className="characterMenu">
                {characters.length === 0 && !addButtonHidden ? <h2 className="ohNo">Oh No! You don't have characters in your Canon yet!</h2> : <></>}
                {addButtonHidden ? <></> : <button className="addButton" onClick={(e) => handleOpenAdd(e)}>Add Character</button>}
                {this.renderCharacterForm()}
                
                {characters.length === 0 || addFormOpen ? <></> : 
                <>
                    <h4>Characters in Your Canon</h4>
                    <p className="characterCount">{characters.length} character(s)</p>
                    <SearchBar />
                    <ul className="characterList">
                    <UserCanonItem />
                    </ul>
                </>}
            </div>
                </section></> }
        </>
    }
}