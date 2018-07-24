import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TMDB from './TMDB';

class MovieSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoadMore: false,
      page: 1,
      items: []
    };
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        if (!this.state.isLoadMore){
          this.setState({ isLoadMore: true, page: this.state.page + 1 });
          this.retrieveData( this.state.page );
        }
      }
    })
  }
  componentDidMount() {
    this.retrieveData(1);
  }

  retrieveData( page ){
    fetch( TMDB.MovieSearch( this.props.match.params.query, page ) )
    .then(res => res.json())
    .then(
      (result) => {
        var items = result.results;
        this.setState({
          items: this.state.items.concat(items),
          isLoaded: true,
        });
        if (this.state.page > 1) {
          this.setState({ isLoadMore: false });
        }
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
    const { error, isLoaded, isLoadMore, items } = this.state;
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
                    <img src={"https://via.placeholder.com/500x750?text=No+Image"} alt={item.original_name} className="img-fluid"/>
                  ) : (
                    <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.original_name} className="img-fluid"/>
                  )}
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          { isLoadMore ? (
            <div className="text-center">
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <div>Loading...</div>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }
  }
}

export default MovieSearch;
