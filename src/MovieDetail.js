import React, { Component } from 'react';
import TMDB from './TMDB';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {}
    };
  }
  componentDidMount() {
    fetch( TMDB.MovieDetailEndpoint(this.props.match.params.movieId) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result
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
    const { error, isLoaded, item } = this.state;
    var dislayedSeason = 1;

    if (isLoaded) {
      return (
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className="img-fluid" />
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <h2>{item.name}</h2>
            <div className="subdetail">
              {item.number_of_seasons} Seasons, {item.number_of_episodes} Episodes
            </div>

            <div className="separator"></div>

            <h4>EPISODES</h4>
            <div className="seasons">
              <label>Seasons: </label>
              {item.seasons.map(
                function(season){
                  if (season.season_number > 0) {
                    return <a key={season.season_number}>{ season.season_number}</a>
                  }
                }
              )}
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
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
