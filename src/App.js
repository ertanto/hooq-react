import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import MovieSearch from './MovieSearch';
import './css/App.css';
import { Route } from "react-router-dom";


class App extends Component {

  onSearch = (e) => {
    if(e) e.preventDefault();
    window.location.href="/movie-search/" + encodeURIComponent(this.input.value);
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <a href="/">
              <div className="logo"></div>
              <div className="title">TV Show</div>
            </a>
            <div className="search-container float-right">
              <form onSubmit={this.onSearch}>
                <input type="search" name="search" placeholder="Search" ref={(element) => { this.input = element }}/>
              </form>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <Route exact path='/' component={MovieList}/>
            <Route path='/movie-detail/:movieId' component={MovieDetail}/>
            <Route path='/movie-search/:query' component={MovieSearch}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
