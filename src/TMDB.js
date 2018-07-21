const API_KEY = '';

class TMDB{

  static MovieListingEndpoint(){
    return 'https://api.themoviedb.org/3/discover/tv?api_key='+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false';
  }

  static MovieDetailEndpoint( movieId ){
    return 'https://api.themoviedb.org/3/tv/'+movieId+'?api_key='+API_KEY+'&language=en-US';
  }
}

export default TMDB;
