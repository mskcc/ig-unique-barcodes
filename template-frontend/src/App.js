import React from 'react';
import './App.css';
import HomePage from './home-page';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './assets/igo-icon.png';

function App() {
    return (<Router>
        <header className='app-header background-mskcc-dark-blue'>
            <p className={'mskcc-white em2'}>Something great coming...</p>
        </header>
        <div className={'background-mskcc-light-blue app-body'}>
            <div className={'app-container'}>
                <Switch>
                    <Route path='/' component={HomePage}/>
                </Switch>
            </div>
        </div>
        <footer className='background-mskcc-dark-blue'>
            <img alt='igo-logo' className='logo-footer' src={logo}></img>
        </footer>
    </Router>);
}

export default App;
