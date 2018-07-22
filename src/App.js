import React, { Component } from 'react';
import MovieList from './MovieList';
import logo from './images/logo.svg';
import './css/App.css';
import { Route } from "react-router-dom";
import MovieDetail from './MovieDetail';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <Route exact path='/' component={MovieList}/>
          <Route path='/movie-detail/:movieId' component={MovieDetail}/>
        </div>
      </div>
    );
  }
}

export default App;
