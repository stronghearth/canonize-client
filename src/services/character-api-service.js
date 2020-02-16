import config from '../config';
import TokenService from '../services/token-service'

const CharacterApiService = {
    getCharacters() {
        return fetch(`${config.API_ENDPOINT}/characters`, {
            method: 'GET',
            headers: {
                'content-type': 'applicaton/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json()
        })
    },
    getCharacterbyId (id) {
        return fetch(`${config.API_ENDPOINT}/characters/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'applicaton/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
    },
    postCharacter(newCharacter) {
        return fetch(`${config.API_ENDPOINT}/characters`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(
                newCharacter
            ),
        })
        .then(res => {
          if(!res.ok){
              throw new Error(res.statusText);
          }  
          return res.json()
        })
    },
    updateCharacter(characterToUpdate, id) {
        return fetch(`${config.API_ENDPOINT}/characters/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(characterToUpdate),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText);
                }
            })

    },
    deleteCharacter(id) {
        return fetch(`${config.API_ENDPOINT}/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
        })
    }
}

export default CharacterApiService