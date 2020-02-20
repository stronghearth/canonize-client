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
        this.context.handleOpenRegisterForm()
        this.context.handleCloseInstructions()
    }

    handleInstructionsClick = () => {
        this.context.handleOpenInstructions()
        this.context.handleCloseRegisterForm()
        this.context.handleCloseLoginForm()
    }

    renderRegisterForm = () => {
        return (
            <RegistrationForm onRegistrationSuccess={this.handleRegisterSuccess}/>
        )
    }

    renderDescription = () => {
        return (<>
            <p>Stories of all kinds start with those who live within your world. When you register with Canonize, you can make a record of all the characters who live in your story, whether they each have a full profile or just exist in a brief note. Once many characters become a part of your Canon, you can easily find individuals and expand your notes on them if you wish. Canonize is a great tool for fiction writers and tabletop role-playing game masters alike.</p>
            <h3>The magic of Canonize begins with you and your ideas.</h3>
            </>
        )
    }
    handleRegisterSuccess = () => {
        this.context.handleCloseRegisterForm()
        this.context.handleSuccessFullRegister()
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/myCanon'
        history.push(destination)
        this.context.changeToLoggedInState()
      }

    render() {
        const {logInFormOpen, openRegister, registerDone, instructionsOpen} = this.context

        return <><div className="landingContainer">
                    <section className="openingStatement"> 
                        <h1 className="canonize">Canonize (v)</h1>
                        <h3 className="pronounce">/ˈkanəˌnīz/</h3>
                        <p className="definition">to place in or regard as belonging to a canon of literary or artistic works</p>
                    </section>
                    <section className="canonizeDescription">
                        {instructionsOpen && !logInFormOpen && !registerDone &&! openRegister
                        ?this.renderDescription()
                        : <></>}
                        <button className="instructionButton" onClick={this.handleInstructionsClick}>Instructions</button>
                        <button className="startButton" onClick={this.handleStartClick}>Create Your Canon</button>
                    </section>
                    <section className="forms">
                        {openRegister && !logInFormOpen && !registerDone
                        ? this.renderRegisterForm()
                        : <></>}
                        {logInFormOpen && !openRegister && !registerDone
                        ? this.renderLogInForm()
                        : <></>}
                        {registerDone
                        ? <><h3>Success!</h3>{this.renderLogInForm()}</>
                        :<></>}
                    </section>
                    
                </div>
                </>
    }
}
