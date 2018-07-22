import React, { Component } from 'react';
import TMDB from './TMDB';
import MovieSeasonDetail from './MovieSeasonDetail';
import MovieTrailer from './MovieTrailer';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      detail: {},
      seasonNumber: 1,
    };
  }
  loadSeason(seasonNumber) {
    this.setState({
      seasonNumber: seasonNumber
    });
  }
  componentDidMount() {
    /* Fetch Movie Detail */
    fetch( TMDB.MovieDetailEndpoint(this.props.match.params.movieId) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            detail: result
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
    const { error, isLoaded, detail} = this.state;

    if (isLoaded) {
      return (
        <div className="movie-detail">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-4">
              <img src={"https://image.tmdb.org/t/p/w500" + detail.poster_path} className="img-fluid" />
              <div className="movie-info">
                <div className="genre">
                  {detail.genres.map(genre => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-8">
              <h2>{detail.name}</h2>
              <div className="subdetail">
                {detail.number_of_seasons} Seasons, {detail.number_of_episodes} Episodes
              </div>
              <div className="separator"></div>
              <div className="overview">
                <div>{detail.overview}</div>
              </div>

              <div className="separator"></div>
              <h4>Trailers</h4>
              <MovieTrailer movieId={this.props.match.params.movieId}></MovieTrailer>

              <div className="separator"></div>

              <h4>Episodes</h4>
              <div className="seasons">
                <label>Seasons: </label>
                {detail.seasons.map(
                  (season) => {
                    if (season.season_number > 0) {
                      return <button key={season.season_number} className={this.state.seasonNumber == season.season_number ? 'active' : '' } onClick={(e) => this.loadSeason(season.season_number)}>{ season.season_number}</button>
                    }
                  }
                )}
              </div>
              <MovieSeasonDetail movieId={this.props.match.params.movieId} seasonNumber={this.state.seasonNumber}></MovieSeasonDetail>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>;
    }
  }
};

export default MovieDetail;
