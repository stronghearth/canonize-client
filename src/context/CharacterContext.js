import React, {Component} from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

//context for state manipulation concerning the LandingPage route and the LoginForm and RegistrationForm components
const CharacterContext = React.createContext({
    openRegister: false,
    logInFormOpen: false,
    loggedIn: TokenService.hasAuthToken(),
    registerDone: false,
    instructionsOpen: false,
    user: {},
    changeToLoggedInState: () => {},
    changeToLoggedOutState: () => {},
    setUser: () => {},
    handleOpenInstructions: () => {},
    handleCloseInstructions: () => {},
    handleOpenLogInForm: () => {},
    handleCloseLoginForm: () => {},
    handleOpenRegisterForm: () => {},
    handleCloseRegisterForm: () => {},
    handleSuccessFullRegister: () => {},
    handleFinishRegister: () => {}
})



export class CharacterProvider extends Component {
    constructor(props) {
    super(props)    

    const jwtPayload = TokenService.parseAuthToken()

    
    const state = {
        loggedIn: TokenService.hasAuthToken(), //validates if a user has a valid JWT token before myCanon page is loaded
        logInFormOpen: false,
        openRegister: false,
        registerDone: false,
        instructionsOpen: false,
        user: {}
    }

    if (jwtPayload) {
        state.user = {
            id: jwtPayload.user_id,
            full_name: jwtPayload.full_name,
            username: jwtPayload.sub
        }
    }

    this.state = state;
    IdleService.setIdleCallback(this.changeToLoggedOutState)
}

    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            IdleService.regiserIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
                this.fetchRefreshToken()
            })
        }
    }

    componentWillUnmount() {
        IdleService.unRegisterIdleResets()
        TokenService.clearCallbackBeforeExpiry()
    }

    setUser = (user) => {
        this.setState({ user })
    }

    //guides users between pages when they have logged in or out
    

    setUser = (user) => {
        this.setState({ user })
    }

    processLogin = (authToken) => {
        TokenService.saveAuthToken(authToken)
        const jwtPayload = TokenService.parseAuthToken()
        this.setUser({
            id: jwtPayload.user_id,
            full_name: jwtPayload.full_name,
            username: jwtPayload.sub
        })
        IdleService.regiserIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
            this.fetchRefreshToken()
        })
    }

    processLogout = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.setUser({})
      }
    
      logoutBecauseIdle = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.setUser({ idle: true })
      }
    
      fetchRefreshToken = () => {
        AuthApiService.refreshToken()
          .then(res => {
            TokenService.saveAuthToken(res.authToken)
            TokenService.queueCallbackBeforeExpiry(() => {
              this.fetchRefreshToken()
            })
          })
          .catch(err => {
            this.setError(err)
          })
      }

    changeToLoggedInState = (authToken) => {
        this.processLogin(authToken)
        this.setState({
            loggedIn: true
        })
    }

    

    changeToLoggedOutState = () => {
        this.processLogout()
        this.setState({
            loggedIn: false
        })
    }

    //handles state conditions for About secion
    handleOpenInstructions = () => {
        this.setState({
            instructionsOpen: true
        })
    }

    
    handleCloseInstructions = () => {
        this.setState({
            instructionsOpen: false
        })
    }

    //handles state dynamics around rendering and closing the LoginForm component
    handleOpenLogInForm = () => {
        this.setState({
            logInFormOpen: true,
            openRegister: false,
        })
    }

    handleCloseLoginForm= () => {
        this.setState({
            logInFormOpen: false
        })
    }

    //Handles conditions around rendering and closing the RegistrationForm component and showing positive feedback on successfull registration

    handleOpenRegisterForm = () => {
        this.setState({
            openRegister: true,
            logInFormOpen: false
        })
    }

    handleCloseRegisterForm = () => {
        this.setState({
            openRegister: false,
        })
    }

    handleSuccessFullRegister = () => {
        this.setState({
            registerDone: true
        })
    }

    handleFinishRegister = () => {
        this.setState({
            registerDone: false,
        })
    }

    render() {
        const value = {
            loggedIn: this.state.loggedIn,
            logInFormOpen: this.state.logInFormOpen,
            openRegister: this.state.openRegister,
            registerDone: this.state.registerDone,
            instructionsOpen: this.state.instructionsOpen,
            user: this.state.user,
            changeToLoggedInState: this.changeToLoggedInState,
            changeToLoggedOutState: this.changeToLoggedOutState,
            setUser: this.setUser,
            handleOpenInstructions: this.handleOpenInstructions,
            handleCloseInstructions: this.handleCloseInstructions,
            handleOpenLogInForm: this.handleOpenLogInForm,
            handleCloseLoginForm: this.handleCloseLoginForm,
            handleOpenRegisterForm: this.handleOpenRegisterForm,
            handleCloseRegisterForm: this.handleCloseRegisterForm,
            handleSuccessFullRegister: this.handleSuccessFullRegister,
            handleFinishRegister: this.handleFinishRegister,
        }
        return(
            <CharacterContext.Provider value={value}>
                {this.props.children}
            </CharacterContext.Provider>
        )
    }
}
export default CharacterContext