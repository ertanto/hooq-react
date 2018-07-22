import React, { Component } from 'react';

class MovieSearch extends Component {


  render() {
    return(
      <div>Blah {this.props.match.params.query}</div>
    )
  }
}

export default MovieSearch;
