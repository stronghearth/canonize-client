import config from '../config';

const CharacterApiService = {
    getCharacters() {
        return fetch(`${config.API_ENDPOINT}/characters`, {
            method: 'GET',
            headers: {
                'content-type': 'applicaton/json'
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
                'content-type': 'application/json'
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