import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import { CanonProvider } from './context/CanonContext';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
                    <CanonProvider>
                        <CharacterProvider>
                        <App />
                        </CharacterProvider>
                    </CanonProvider> 
                </BrowserRouter>
                , document.getElementById('root'));


serviceWorker.unregister();
