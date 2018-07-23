import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import MovieSearch from './MovieSearch';
import './css/App.css';
import { Route, Redirect } from "react-router-dom";


const SearchForm = function({match}) {
  var onSubmit = function(e){
    var searchValue = document.querySelector('input[name="search"]').value;
    window.location.href="/search/" + encodeURIComponent(searchValue);
    e.preventDefault();
  }
  var value = '';
  if (typeof match !== 'undefined' && typeof match.params !== 'undefined' && typeof match.params.query !== 'undefined' ) value = match.params.query; else value='';
  return <form onSubmit={onSubmit}>
    <input type="search" name="search" placeholder="Search" defaultValue={value}  />
  </form>
}


class App extends Component {
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
              <Route path='/search/:query' component={SearchForm}/>
              <Route path='/movie/*' component={SearchForm}/>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <Route exact path="/" render={() =>
              <Redirect to="/movie/list"/>
            }/>
            <Route path='/movie/list' component={MovieList}/>
            <Route path='/movie/detail/:movieId' component={MovieDetail}/>
            <Route path='/search/:query' component={MovieSearch}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
