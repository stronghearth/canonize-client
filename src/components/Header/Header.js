import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default class Header extends Component {
    render() {
        return <nav className='headerNav'>
            <Link className="navCanonizeLink"
                to='/'>
                Canonize
            </Link>
            <Link 
                to='/login'>
                Log In
            </Link>
            <Link
                to='/register'>
                Register
            </Link>
        </nav>
    }
}