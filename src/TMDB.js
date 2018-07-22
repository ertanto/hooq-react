const API_KEY = '';

class TMDB{

  // https://developers.themoviedb.org/3/discover/tv-discover
  static MovieListingEndpoint(){
    return 'https://api.themoviedb.org/3/discover/tv?api_key='+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false';
  }

  // https://developers.themoviedb.org/3/tv/get-tv-details
  static MovieDetailEndpoint( movieId ){
    return 'https://api.themoviedb.org/3/tv/'+movieId+'?api_key='+API_KEY+'&language=en-US';
  }

  // https://developers.themoviedb.org/3/tv-seasons/get-tv-season-details
  static MovieDetailSeasonsEndpoint( movieId, seasonNumber ){
    return 'https://api.themoviedb.org/3/tv/'+movieId+'/season/'+seasonNumber+'?api_key='+API_KEY+'&language=en-US';
  }

  // https://developers.themoviedb.org/3/tv/get-tv-videos
  static MovieTrailerEndpoint( movieId ){
    return 'https://api.themoviedb.org/3/tv/'+movieId+'/videos?api_key='+API_KEY+'&language=en-US';
  }


}

export default TMDB;
