import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../utils/PrivateRoute'
import AppError from '../../AppError'
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import LandingPage from '../../routes/LandingPage/LandingPage';
import UserCanonPage from '../../routes/UserCanonPage/UserCanonPage';
import CharacterContext from '../../context/CharacterContext'
import './App.css';

class App extends Component {
  static contextType = CharacterContext
  render() {
    const {user} = this.context
    return (
      <div className="App">
        <header className='App_header'>
          <Header />
        </header>
        <AppError>
      <main>
        <Switch>
          <PublicOnlyRoute
            exact
            path={'/'}
            component={LandingPage}
          />
          <PrivateRoute
            path={'/myCanon'}
            component={props => <UserCanonPage {...props} currentUser={user} />}
          />
        </Switch>
        </main>
      </AppError>
      </div>
    );
  }
}

export default App;
