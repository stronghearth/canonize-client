import config from '../config'
import TokenService from './token-service'
const AuthApiService = {
  postLogin({user_name, password}) {
    return fetch(`${config.API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user_name, password}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUser(newUser) {
    return fetch(`${config.API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res =>
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
        )
  },
  refreshToken() {
    return fetch(`${config.API_BASE_URL}/api/auth/login`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  }
}

export default AuthApiService