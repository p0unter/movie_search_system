document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    const apiKey = '461ea516a987601b0817bc1b0b3b5764'; // Add your TMDb API key here
    const resultsContainer = document.querySelector('#search-results .container #card-group');
    const searchResults = document.getElementById('search-results-h');

    // Check for empty input
    if (query.length < 3) {
        resultsContainer.innerHTML = '<p>Please enter at least 3 characters.</p>'; // Inform the user
        searchResults.style.display = 'none'; // Hide results container
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            resultsContainer.innerHTML = ''; // Clear previous results

            // Check if data.results is defined
            if (data && data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title} (${new Date(movie.release_date).getFullYear()})</h5>
                            <p class="card-text">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available'}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">IMDb Page: <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">Click Here</a></small>
                        </div>
                    `;
                    resultsContainer.appendChild(card);
                });
                searchResults.style.display = 'block'; // Show results container if there are results
            } else {
                resultsContainer.innerHTML = '<p>No movies found.</p>';
                searchResults.style.display = 'block'; // Show results container even if no movies found
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
            searchResults.style.display = 'block'; // Show results container on error
        });
});