import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TMDB from "./TMDB";
import './css/bootstrap.min.css';

const API_KEY = TMDB.API_KEY;

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/tv?api_key='+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.results
        });
        console.log(result);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row">
          {items.map(item => (
            <div key={item.id} className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link to={"/detail/" + item.id}>
                <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className="img-fluid"/>
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default MovieList;
