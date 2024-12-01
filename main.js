document.addEventListener('DOMContentLoaded', () => {

    // scrap from html
    // ____________ start
    // const movieContainers = document.querySelectorAll('.movie-content'); // Replace with the correct container class
    // const arrayForJson = [];
    // movieContainers.forEach((movieContainer) => {

    //     const geoTitleElement = movieContainer.querySelector('.movie-title-geo');
    //     const geoTitle = geoTitleElement ? geoTitleElement.textContent.replace(/\s+/g, ' ').trim() : null;

    //     const origTitleElement = movieContainer.querySelector('.movie-title-orig').textContent.replace(/\s+/g, ' ').trim();
    //     const yearStartIndex = origTitleElement.lastIndexOf('(');

    //     const engName = origTitleElement.slice(0, yearStartIndex).trim();
    //     const year = origTitleElement.slice(yearStartIndex + 1, -1);
    //     const imdb = movieContainer.querySelector('.imdb-rating-score').textContent.trim();

    //     mov = {
    //         "eng": engName,
    //         "year": year,
    //         "geo": geoTitle,
    //         "imdb": imdb
    //     };

    //     arrayForJson.push(mov);

    // });

    // let jsonString = JSON.stringify(arrayForJson);

    // console.log(jsonString);
    // ________________ end


    // style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }


        body {
        font-family: Arial, sans-serif;
        background-color: #121212;
        color: #ffffff;
        width: 100vw;
        height: calc(100vh - 10px);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        }


        header {
        text-align: center;
        background-color: #1e1e1e;
        padding: 10px 0;
        color: #f4c10f;
        flex-shrink: 0;
        cursor: pointer;
        }
        

        .category-list {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
        }

        .category {
        background-color: #f4c10f;
        color: #121212;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .category:hover {
        background-color: #cba007;
        transform: scale(1.1);
        }

        .category.selected {
        background-color: #f3940d;
        }

        .movie-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(200px, 1fr));
        grid-template-rows: repeat(2, 200px);
        gap: 15px;
        padding: 10px;
        overflow: auto;
        flex-grow: 1;
        }

        .movie {
        background-color: #1e1e1e;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        transition: transform 0.2s, background-color 0.2s;
        }

        .movie:hover {
        transform: scale(1.05);
        background-color: #f4c10f;
        color: #121212;
        }

        .movie h2 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        }

        .movie p {
        margin: 5px 0;
        }

        .movie span {
        font-size: 2rem;
        }

    `;

    document.head.appendChild(styleElement);


    const categories = document.querySelectorAll('.category');

    // events
    categories.forEach(category => {
        category.addEventListener('click', function () {
            categories.forEach(cat => cat.classList.remove('selected'));
            this.classList.add('selected');
        });
    });


    // buttons
    document.querySelector('.title').addEventListener('click', function() {
        location.reload();
    });

    document.querySelector('.cat-favorite').addEventListener('click', () => {
        main("data/fav.json");
    });

    document.querySelector('.cat-series').addEventListener('click', () => {
        main("data/series.json");
    });

    document.querySelector('.cat-comedy').addEventListener('click', () => {
        main("data/comedy.json");
    });

    document.querySelector('.cat-documentary').addEventListener('click', () => {
        main("data/doc.json");
    });

    document.getElementById('search').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const word = document.getElementById('search').value ?? null;
            console.log(word);
            main("", word);
        }
    });
    
});


function render(movieList) {

    const movieGrid = document.getElementById('movie-grid');

    movieGrid.innerHTML = '';

    if (movieList && movieList.length > 0) {

        movieList.forEach(movie => {

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

            const logo = document.createElement('span');
            logo.innerHTML = "🎥";

            movieCard.appendChild(logo);
            movieCard.appendChild(title);
            movieCard.appendChild(geo);
            movieCard.appendChild(year);
            movieCard.appendChild(imdb);

            movieGrid.appendChild(movieCard);
        });
    }
}


async function fetchMovies(jsonFile) {
    try {
        const response = await fetch(jsonFile);

        if (!response.ok) {
            throw new Error('JSON file not found');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}


async function search(word) {

    if (!word) {
        return [];
    }
    
    const jsonFiles = [
        'data/fav.json',
        'data/series.json',
        'data/comedy.json',
        'data/doc.json',
    ];

    const searchedData = [];

    for (const fileName of jsonFiles) {
        const res = await fetchMovies(fileName);
        searchedData.push(res);
    }
    
    const json = searchedData.flat();
    let filter = [];


    if (word.includes('imdb')) {

        const ratingMatch = word.match(/\d+(\.\d+)?/);

        if (ratingMatch) {

            const searchImdb = parseFloat(ratingMatch[0]);

            filter = json.filter((movie) => {
                return movie.imdb && parseFloat(movie.imdb) >= searchImdb;
            });

            return filter;
        }
    }


    if (word.includes('year')) {

        const yearMatch = word.match(/\d+(\.\d+)?/);

        if (yearMatch) {

            const searchYear = parseInt(yearMatch[0]);

            filter = json.filter((movie) => {
                return movie.year && parseFloat(movie.year) >= searchYear;
            });

            return filter;
        }
    }
    

    filter = json.filter(function(movie) {
        if (movie.eng.toLowerCase().includes(word.toLowerCase()) || 
            movie.geo.toLowerCase().includes(word.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    })
    
    return filter;
}


async function main(file, searchWord = null) {

    if (searchWord !== null) {
        res = await search(searchWord);
    } else {
        res = await fetchMovies(file);
    }

    render(res);
    return;
}