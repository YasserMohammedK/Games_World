**Games World**

Games World is a web application that allows users to browse and
discover information about various games. The application fetches data
from the RAWG Video Games Database API to display details such as game
name, release date, rating, and platforms.

<img src="media/image1.png" style="width:6.5in;height:3.03681in" />

**Methodology:**

1.  **User Interface**:

    -   The website presents a user-friendly interface with a clean
        design, making it easy for users to navigate and interact with.

2.  **API Integration**:

    -   Integration with the RAWG Video Games Database API allows the
        website to fetch information about various games.

    -   Upon loading, the website sends requests to the API to retrieve
        a list of recently released games.

3.  **Displaying Game Cards**:

    -   Dynamically generates HTML cards for each game, containing
        details such as the game's name, cover image, release date,
        rating, and supported platforms.

4.  **Search Functionality**:

    -   Users can utilize the search bar to search for specific games by
        entering keywords.

    -   Automatic searches trigger real-time updates to the displayed
        game list based on the search query.

    -   Search queries are sent to the API, which returns relevant
        results matching the entered keywords.

5.  **Load More Feature**:

    -   Implements a "Load More" button at the bottom of the game list
        for seamless browsing.

    -   Clicking the button dynamically fetches additional game data
        from the API and appends it to the existing list without
        reloading the entire page.

6.  **Responsive Design**:

    -   Designed to be responsive, adapting seamlessly to different
        screen sizes and devices.

    -   Ensures optimal viewing and interaction across desktops,
        laptops, tablets, and smartphones.

7.  **Custom Styling**:

    -   Applies custom CSS styles to enhance the visual appearance of
        the website, providing a polished and cohesive look.

    -   Adjustments to fonts, colors, spacing, and button appearances
        contribute to a visually appealing user experience.

**Technologies Used:**

-   **Frontend**: HTML, CSS, JavaScript

-   **Backend**: Node.js, Express.js

-   **API**: RAWG Video Games Database API

-   **Dependency Management**: npm

**Getting Started:**

To run the project locally, follow these steps:

1.  Clone the repository: git clone
    https://github.com/your-username/games-world.git

2.  Navigate to the project directory: cd games-world

3.  Install dependencies: npm install

4.  Start the server: npm start

5.  Open your web browser and visit
    [<u>http://localhost:3000</u>](http://localhost:3000) to view the
    application.
