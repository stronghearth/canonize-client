import React, { Component } from 'react';

export default class UserExpandedItem extends Component {

    render() {
        const currentCharacter = this.props.currentCharacter;

        return <>
                <h3>{currentCharacter.character_name}</h3>
                {!currentCharacter.art_img ? <></> : <img src={currentCharacter.art_img} alt={currentCharacter.character_name}/>}
                <ul className="expandedUlChar">
                    {!currentCharacter.age ? <></> : <li><p>Age: {currentCharacter.age}</p></li>}
                    {!currentCharacter.gender ? <></> : <li><p>Gender: {currentCharacter.gender}</p></li>}
                    {!currentCharacter.strongest_bonds ? <></> : <li><p>Strongest Bonds: {currentCharacter.strongest_bonds}</p></li>}
                    {!currentCharacter.antagonist ? <></> : <li><p>Antagonist: {currentCharacter.antagonist}</p></li>}
                    {!currentCharacter.appearance ? <></> : <li><p>Appearance: {currentCharacter.appearance}</p></li>}
                    {!currentCharacter.mannerisms ? <></> : <li><p>Mannerisms: {currentCharacter.mannerisms}</p></li>}
                    {!currentCharacter.general_desc ? <></> : <li><p>General Description: {currentCharacter.general_desc}</p></li>}
                </ul>
                
        </>
    }
}