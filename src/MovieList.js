import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TMDB from "./TMDB";
import './css/bootstrap.min.css';
import './css/modal-video.min.css';

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
    fetch( TMDB.MovieListingEndpoint() )
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.results
        });
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
      return (<div className="text-center">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div>Loading...</div>
      </div>);
    } else {
      return (
        <div className="movie-list">
          <div className="row">
            {items.map(item => (
              <div key={item.id} className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 movie">
                <Link to={"/movie/detail/" + item.id}>
                  <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className="img-fluid"/>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default MovieList;
