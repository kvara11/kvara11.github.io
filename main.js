document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        'Movie 1',
        'Movie 2',
        'Movie 3',
        'Movie 4',
        'Movie 5',
        'Movie 6',
        'Movie 7',
        'Movie 8',
        'Movie 9',
        'Movie 10',
        'Movie 11',
        'Movie 12',
        'Movie 13',
        'Movie 14',
        'Movie 15',
        'Movie 16'
    ];

    const movieGrid = document.getElementById('movieGrid');

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.textContent = movie;
        movieGrid.appendChild(movieDiv);
    });
});
