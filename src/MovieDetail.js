import React, { Component } from 'react';

class MovieDetail extends Component {
  render() {
    console.log(this.props.match.params.movieId);
    return (
      <div className="row">
        Movie Detail
      </div>
    )
  }
};

export default MovieDetail;
