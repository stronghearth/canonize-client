import React from 'react';
import {Switch} from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../utils/PrivateRoute'
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
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
      <Switch>
        <PublicOnlyRoute
          exact
          path={'/'}
          component={LandingPage}
        />
        <PrivateRoute
          path={'/myCanon'}
          component={UserCanonPage}
        />
      </Switch>
      </main>
    </div>
  );
}

export default App;
