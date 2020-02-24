import React, {Component} from 'react';
import CanonContext from '../../context/CanonContext';
import CharacterApiService from '../../services/character-api-service';

export default class SearchBar extends Component {
    static contextType = CanonContext

    state = {
        error: null,
        term: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {searchTerm} = e.target
        if (searchTerm.value === " ") {
            this.setState({
                error: 'Please enter a valid search term'
            })
        }
        else {
        const {characters, refreshCharacterList, updateCharacter} = this.context
        const filteredCharacters = characters.filter(char => char.character_name.toLowerCase().includes(searchTerm.value.toLowerCase()))
                if (filteredCharacters.length === 0) {
                    this.setState({
                        error: `No results for ${searchTerm.value}`
                    })
                    this.clearSearch()
                }
                else{
                    refreshCharacterList(filteredCharacters)
                    updateCharacter(filteredCharacters[0])
                }
        }
    }

    clearError = () => {
        this.setState({
            error: null
        })
    }

    clearSearch = () => {
        const {getInitialCharacterList, errorCatch} = this.context
        CharacterApiService.getCharacters()
            .then(res => getInitialCharacterList(res))
            .catch(error => errorCatch(error))
        this.setState({
            term: ''
        })
    }

    render() {
        const {error} = this.state
        return (
            <form id="searchBar" className="searchBar" onSubmit={this.handleSubmit}>
                {error && <p className="errorMessage" onClick={this.clearError}>{error}</p>}
                    <label htmlFor="search">Search: </label>
                    <input type="text" name="searchTerm" value={this.state.term} placeholder="Search by Name" id="characterFinder" onChange={(e) => this.setState({term: e.target.value})}></input>
                <div className="characterButtons">
                    <button>Submit</button><button onClick={this.clearSearch}>Clear</button>
                </div>
            </form>
        )
    }
}