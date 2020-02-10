import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import UserCanonPage from '../../routes/UserCanonPage/UserCanonPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='App_header'>
        <Header />
      </header>
    <main>
        <Route
          exact
          path={'/'}
          component={LandingPage}
        />
        {/*<Route
          path={'/myCanon'}
          component={UserCanonPage}
        />*/}
      </main>
    </div>
  );
}

export default App;
