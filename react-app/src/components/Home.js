import React, { Component } from 'react';
import './App.css'
import Play from './Play';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to QuizNow</h1>
        </header>
        <header className="App-body">
          <div>
            <h1 className="App-title"><Link to={'/Play'}>Take Up a Challenge</Link></h1>
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
