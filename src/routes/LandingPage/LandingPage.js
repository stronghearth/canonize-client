import React, { Component } from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return <>
        <main>
            <section className="openingStatement"> 
                <h1 className="canonize">Canonize</h1>
                <h3 className="pronounce">/ˈkanəˌnīz/</h3>
                <p className="definition">verb, to place in or regard as belonging to a canon of literary or artistic works</p>
            </section>
            <section className="canonizeDescription">
            <p>Some convincing description of app and call to action here</p>
            <button class="startButton">Start Your Canon</button>
        </section>
        </main>
        </>
    }
}
