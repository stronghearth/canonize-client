import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import CharacterContext from '../../context/CharacterContext';
import './LandingPage.css';

export default class LandingPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }
    static contextType = CharacterContext;

    renderLogInForm = () => {
        return (
            <LoginForm onLoginSuccess={this.handleLoginSuccess} history={this.props.history}/>
        )
    }

    handleStartClick = () => {
        console.log('I am clicked')
        this.context.handleOpenRegisterForm()
    }

    renderRegisterForm = () => {
        console.log('hey!')
        return (
            <RegistrationForm />
        )
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/myCanon'
        history.push(destination)
        this.context.changeToLoggedInState()
      }

    render() {
        const {logInFormOpen, registerFormOpen} = this.context
        return <>
        <main>
            <section className="openingStatement"> 
                <h1 className="canonize">Canonize</h1>
                <h3 className="pronounce">/ˈkanəˌnīz/</h3>
                <p className="definition">verb, to place in or regard as belonging to a canon of literary or artistic works</p>
            </section>
            <section className="canonizeDescription">
            <p>Some convincing description of app and call to action here</p>
            <button className="startButton" onClick={this.handleStartClick}>Start Your Canon</button>
        </section>
        <section className="forms">
            {logInFormOpen 
            ? this.renderLogInForm()
            : <></>}
            {registerFormOpen
            ? this.renderRegisterForm()
            : <></>}
        </section>
        </main>
        </>
    }
}
