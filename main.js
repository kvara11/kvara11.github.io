document.addEventListener('DOMContentLoaded', () => {

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }

        .container {
            padding: 100px;
            text-align: center;
            background-image: url('bg.webp');
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
        }

        h1 {
            margin-bottom: 20px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 20px;
        }

        .movie {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            opacity: 0.7;
        }
    `;

    // Append the <style> element to the <head> of the document
    document.head.appendChild(styleElement);
    fetch('fav.json')
        .then(response => response.json())
        .then(movies => {
            const movieGrid = document.getElementById('movieGrid');
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.eng;

                const year = document.createElement('p');
                year.textContent = `Year: ${movie.year}`;

                const geo = document.createElement('p');
                geo.textContent = `${movie.geo}`;

                const imdb = document.createElement('p');
                imdb.textContent = `IMDB: ${movie.imdb}`;

                movieCard.appendChild(title);
                movieCard.appendChild(geo);
                movieCard.appendChild(year);
                movieCard.appendChild(imdb);

                movieGrid.appendChild(movieCard);

            });
        })
        .catch(error => console.error('Error fetching movies:', error));
});



