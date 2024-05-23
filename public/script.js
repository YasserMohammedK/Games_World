const gameList = document.querySelector(".gameList"); // Select the container for game items
const loadMoreGamesBtn = document.querySelector(".main-button"); // Select the button to load more games
let nextGameListUrl = null; // Initialize variable to store URL for loading more games
let defaultUrl = null; // Initialize variable to store the default URL
const APIKey = ""; // Initialize variable to store the API key

// Define the default URL with the API key and date parameters
defaultUrl = `http://localhost:3000/api/games?key=${APIKey}&dates=2022-01-01,2022-12-31&ordering=-added`;

// Set the initial URL to the default URL
let url = defaultUrl;

// Function to format platform string
const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
};

// Function to load games from the API
function loadGames(url) {
    // Fetch recently released games from RAWG API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            nextGameListUrl = data.next ? data.next : null;
            const games = data.results;

            games.forEach(game => {
                // Generate HTML for each game item
                const gameItemEl = `
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="item">
                            <img src="${game.background_image}" alt="${game.name} image">
                            <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                            <ul>
                                <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                                <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                            </ul>
                        </div>
                    </div>
                `;
                gameList.insertAdjacentHTML("beforeend", gameItemEl); // Insert game HTML into the container
            });
            // Show or hide the load more button based on availability of next page URL
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove("hidden");
            } else {
                loadMoreGamesBtn.classList.add("hidden");
            }
        })
        .catch(error => {
            console.log("An error occurred:", error); // Log any errors that occur during fetching
        });
}

// Load initial games when the page loads
loadGames(url);

// Add event listener to load more games when the button is clicked
loadMoreGamesBtn.addEventListener("click", () => {
    if (nextGameListUrl) {
        loadGames(nextGameListUrl);
    }
});

// Trigger search automatically as user types
searchInput.addEventListener("input", () => {
    performSearch();
});

// Function to perform search based on user input
function performSearch() {
    const searchQuery = searchInput.value;
    if (searchQuery) {
        // Construct search URL with encoded search query and API key
        const searchUrl = `http://localhost:3000/api/games?search=${encodeURIComponent(searchQuery)}&key=${APIKey}`;
        gameList.innerHTML = ''; // Clear the current game list
        loadGames(searchUrl); // Load games based on search URL
    } else {
        // If search input is empty, load the default set of games
        gameList.innerHTML = ''; // Clear the current game list
        url = defaultUrl; // Reset the URL to default
        loadGames(defaultUrl); // Load games based on default URL
    }
}

// Clear search input on page refresh
window.addEventListener('load', () => {
    searchInput.value = ''; // Clear the search input field
});