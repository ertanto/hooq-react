import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TMDB from './TMDB';

class MovieSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch( TMDB.MovieSearch( this.props.match.params.query ) )
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
        <div className="movie-search">
          <div className="row">
            {items.map(item => (
              <div key={item.id} className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 movie">
                <Link to={"/movie/detail/" + item.id}>
                  { item.poster_path == null ? (
                    <img src={"http://via.placeholder.com/500x750?text=No+Image"} alt={item.original_name} className="img-fluid"/>
                  ) : (
                    <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.original_name} className="img-fluid"/>
                  )}
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

export default MovieSearch;
