import React, { Component } from 'react';
import TMDB from './TMDB';

class MovieSeasonDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      episodes: {}
    };
  }

  retrieveData(props){
    fetch( TMDB.MovieDetailSeasonsEndpoint( props.movieId, props.seasonNumber ) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            episodes: result.episodes,
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
  componentWillReceiveProps(props){
    this.retrieveData(props);
  }
  componentDidMount(){
    this.retrieveData(this.props);
  }

  render() {
    const { error, isLoaded, episodes} = this.state;
    if (isLoaded) {
      return (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {episodes.map(episode => (
                <tr key={episode.id}>
                  <th scope="row">{episode.episode_number}</th>
                  <td>{episode.name}</td>
                  <td><div className="play-button float-right"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default MovieSeasonDetail;
