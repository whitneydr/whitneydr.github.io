// Get info from page
const searchQuery = document.querySelector('#search-query');
const searchResults = document.getElementById('search-results');


// GIPHY
const giphyKey = "2KrOLG5UOerioL3lH0sPbJqMyOuQhPpK";
const giphySearchBase = "https://api.giphy.com/v1/gifs/search";
const giphyTrendBase = "https://api.giphy.com/v1/gifs/trending";
const giphyGifBase = "https://api.giphy.com/v1/gifs/"
const requestParams = `api_key=${giphyKey}`;

// GIPHY search

async function searchGiphy(keyword) {
    return fetch(`${giphySearchBase}?q=${keyword}&${requestParams}&limit=15`).then(response => response.json());
}

async function findResult(searchKeyword) {
    searchResults.innerHTML = '';
    const result = await searchGiphy(searchKeyword);

    if (!document.getElementById('search-results-heading')) {
        let searchResultsHeading = document.createElement('h2');
        searchResultsHeading.id = 'search-results-heading';
        searchResultsHeading.innerText = 'Search results';
        document.getElementById('search-results-section').prepend(searchResultsHeading);
        document.getElementById('search-results-section').style.padding = "2%";
    }


    result.data.forEach(gif => {
        let img = new Image();
        img.src = gif.images.original.url;
        let imgDiv = document.createElement('div');
        imgDiv.className = 'gif-option';
        let imgLink = document.createElement('a');
        imgLink.href = `./gif-details.html?${gif.id}`;

        document.getElementById('search-results').appendChild(imgDiv).appendChild(imgLink).appendChild(img);
    });

    document.getElementById('trending').style.backgroundColor = "#343234";
}



function getSearchTerm() {
    let searchTerms = document.getElementById('search-query').value;
    searchQuery.addEventListener('submit', findResult(searchTerms));
}

// document.querySelector('form').addEventListener('submit', getSearchTerm);

/* searchQuery.addEventListener('submit', getSearchTerm); */

document.querySelector('form').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getSearchTerm();
    }
});


// GIPHY Trends

async function giphyTrends() {
    const requestParams = `?api_key=${giphyKey}`;
    const endpoint = `${giphyTrendBase}${requestParams}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const result = await response.json();
            result.data.forEach(gif => {
                let img = new Image();
                img.src = gif.images.original.url;
                let imgDiv = document.createElement('div');
                imgDiv.className = 'gif-option';
                let imgLink = document.createElement('a');
                imgLink.href = `./gif-details.html?${gif.id}`;
                document.getElementById('popular-gifs').appendChild(imgDiv).appendChild(imgLink).appendChild(img);
            });
        }

    } catch (error) {
        console.log(error);
    }
}

giphyTrends();

// GIF details


async function getGifDetails() {
    const gifId = document.location.search.slice(1);
    const requestParams = `?api_key=${giphyKey}`;
    const endpoint = `${giphyGifBase}${gifId}${requestParams}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const result = await response.json();
            let img = new Image();
            img.src = result.data.images.original.url;
            let imgData = document.createElement('div');
            imgData.id = "gif-data"
            imgData.innerHTML = `<p><strong>Title:</strong> ${result.data.title}</p><p><strong>Rated:</strong> ${result.data.rating}</p><p><strong>Username:</strong> ${result.data.username}</p><p><strong>Original source:</strong> <a href="${result.data.source}" title="Go to source" target="_blank">${result.data.source}</a></p>`;

            document.getElementById('gif-large').appendChild(img);
            document.getElementById('gif-expanded').appendChild(imgData);
        }
    } catch (error) {
        console.log(error);
    }

}

getGifDetails();



