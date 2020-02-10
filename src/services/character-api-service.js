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
    }
}

export default CharacterApiService