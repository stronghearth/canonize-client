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
    }
}

export default CharacterApiService