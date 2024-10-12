document.addEventListener('DOMContentLoaded', function () {
    fetchmovies();
});

function fetchmovies() {
    // omdb API key
    const apiKey = '9963d35d';

    // MoviesGrid element
    const MoviesGrid = document.getElementById('MoviesGrid');

    // Display loading message
    MoviesGrid.innerHTML = '<p>Loading movies...</p>';

    const pageType = window.location.pathname.includes('series.html') ? 'series' : 'movie';
    
    const searchTerm = pageType === 'series' ? 'series' : 'movies';
    
    // Fetch movie/series data from OMDB API
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=${pageType}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                moviestoshow(data.Search);
            } else {
                MoviesGrid.innerHTML = `<p>No ${pageType}s found!</p>`;
            }
        })
        .catch(error => {
            console.error(error);
            MoviesGrid.innerHTML = '<p>Failed to load. Please try again later.</p>';
        });
}

// Call the fetchmovies function to run on each page
document.addEventListener('DOMContentLoaded', fetchmovies);


function searchMovies() {
    // omdb API key
    const apiKey = '9963d35d';
    const searchInput = document.
        getElementById('searchInput').value;

    // MoviesGrid element
    const MoviesGrid = document.
        getElementById('MoviesGrid');

    // Search result validation
    if (searchInput.trim() !== '') {

        // Display loading message
        MoviesGrid.innerHTML = '<p>Loading movies...</p>';

        // Fetch movie data from OMDB API
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search && data.Search.length > 0) {
                    moviestoshow(data.Search);
                } else {
                    MoviesGrid.innerHTML =
             '<p>No movies found with the given name!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                MoviesGrid.innerHTML =
           '<p>Error fetching movies. Please try again later.</p>';
            });
    } else {
        alert('Enter a movie title then search!');
    }
}

function moviestoshow(movies) {
    const MoviesGrid = document.getElementById('MoviesGrid');

    // Clear previous results
    MoviesGrid.innerHTML = '';

    // Display each movie/series in the results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const type = movie.Type === 'series' ? 'series' : 'movie';

        movieCard.innerHTML = `
            <a href="streaming.html?imdbID=${movie.imdbID}&type=${type}">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
            </a>
        `;

        MoviesGrid.appendChild(movieCard);
    });
}


