import React, { Component } from 'react';
import TMDB from './TMDB';
import Modal from 'react-responsive-modal';

class MovieSeasonDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showModal: false,
      isModalLoaded: false,
      episodeDetail: {},
      episodes: {}
    };
  }

  onOpenModal( movieId, seasonNumber,episodeNumber ) {
    this.setState({ showModal: true, isModalLoaded:false });
    fetch( TMDB.MovieDetailEpisodeEndpoint( movieId, seasonNumber, episodeNumber ) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isModalLoaded: true,
            episodeDetail: result,
          });
        },
        (error) => {
          this.setState({
            isModalLoaded: false,
            error
          });
        }
      );
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  retrieveData(props){
    fetch( TMDB.MovieDetailSeasonsEndpoint( props.movieId, props.seasonNumber ) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            episodes: typeof result.episodes !== 'undefined' ? result.episodes : {},
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
    this.setState({ isLoaded: false });
    this.retrieveData(props);
  }
  componentDidMount(){
    this.retrieveData(this.props);
  }

  render() {
    const { error, isLoaded, episodes, showModal, episodeDetail} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (<div>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div>Loading...</div>
      </div>);
    } else {
      return (
        <div className="movie-season-detail table-responsive">
          <Modal open={showModal} onClose={this.onCloseModal} center>
            <div>
              { this.state.isModalLoaded ? (
                <div>
                  <h3>{episodeDetail.name}</h3>
                  <p>{episodeDetail.overview}</p>
                  <img src={"https://image.tmdb.org/t/p/w500" + episodeDetail.still_path} alt={episodeDetail.name} className="img-fluid" />

                </div>
              ) : (
                <div>
                  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                  <div>Loading...</div>
                </div>
              ) }
            </div>
          </Modal>
          { episodes.length > 0 ? (
            <table className="table">
              <tbody>
                {episodes.map(episode => (
                  <tr key={episode.id}>
                    <td>{episode.episode_number}</td>
                    <td>{episode.name}</td>
                    <td className="text-right"><a className="detail-button" onClick={(e) => this.onOpenModal(this.props.movieId,this.props.seasonNumber,episode.episode_number)}>Detail</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ''
          ) }

        </div>
      )
    }
  }
}

export default MovieSeasonDetail;
