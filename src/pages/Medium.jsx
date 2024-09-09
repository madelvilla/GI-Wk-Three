import React, { Component } from "react";
import './Medium.css'; // Import the CSS file

class Movie extends Component {
  render() {
    const { title, movie_poster } = this.props;
    return (
      <div className="movie-container">
        <img src={movie_poster} alt="movie poster" className="movie-poster" />
        <div className="movie-details">
          <h2>{title}</h2>
        </div>
      </div>
    );
  }
}

class Medium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: "",
    };
    this.apiKey = "f47334eb99259c04bba1086c64c4a25a";
  }

  handleSearch = async () => {
    const { searchTerm } = this.state;
    if (searchTerm.trim()) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${searchTerm}`);
        const data = await response.json();
        this.setState({ movies: data.results });
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    }
  };

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { movies, searchTerm } = this.state;

    return (
      <div className="medium-container">
        <h2>Search for a Movie</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search title"
            value={searchTerm}
            onChange={this.handleInputChange}
            className="search-input"
          />
          <button onClick={this.handleSearch} className="search-button">
            Search
          </button>
        </div>
        <div className="movie-list">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              movie_poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Medium;
