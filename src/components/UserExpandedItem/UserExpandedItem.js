import React, { Component } from 'react';

export default class UserExpandedItem extends Component {
    render() {
        const currentCharacter = this.props.currentCharacter;
        return <>
                <h3>{currentCharacter.character_name}</h3>
                <img src={currentCharacter.art_img} alt={currentCharacter.character_name}/>
                <ul className="expandedUlChar">
                    <li><p>Age: {currentCharacter.age}</p></li>
                    <li><p>Gender: {currentCharacter.gender}</p></li>
                    <li><p>Strongest Bonds: {currentCharacter.strongest_bonds}</p></li>
                    <li><p>Antagonist: {currentCharacter.antagonist}</p></li>
                    <li><p>Appearance: {currentCharacter.appearance}</p></li>
                    <li><p>Mannerisms: {currentCharacter.mannerisms}</p></li>
                    <li><p>General Desc: {currentCharacter.general_desc}</p></li>
                </ul>

        </>
    }
}