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
    console.log(this.props.movieId);
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
    if (isLoaded) {
      return(
        <div className="video-trailer">
          {videos.map(
            video => (
              <button onClick={(e) => { this.setState({ isOpen: true, videoId: video.key}); }}>
                <img key={video.id} src={'https://img.youtube.com/vi/'+video.key+'/default.jpg'}/>
              </button>
            )
          )}
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.videoId} onClose={() => this.setState({ isOpen:false, videoId: '' })} />

        </div>
      )
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default MovieTrailer;
