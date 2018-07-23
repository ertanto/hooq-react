import React, { Component } from 'react';
import TMDB from './TMDB';
import ModalVideo from 'react-modal-video';

class MovieTrailer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      videos: {}
    };
  }
  componentDidMount() {
    fetch( TMDB.MovieTrailerEndpoint(this.props.movieId) )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            videos: result.results
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
    const { error, isLoaded, videos} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (<div>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div>Loading...</div>
      </div>);
    } else {
      return(
        <div className="video-trailer">
          {videos.map(
            video => (
              <button key={video.id} onClick={(e) => { this.setState({ isOpen: true, videoId: video.key}); }}>
                <img key={video.id} src={'https://img.youtube.com/vi/'+video.key+'/default.jpg'} alt="Trailer video"/>
              </button>
            )
          )}
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.videoId} onClose={() => this.setState({ isOpen:false, videoId: '' })} />
        </div>
      )
    }
  }
}

export default MovieTrailer;
