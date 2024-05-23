import express from 'express'; // Import the Express framework
import path from 'path'; // Import path module for working with file and directory paths
import { fileURLToPath } from 'url'; // Import fileURLToPath function to convert file URL to file path
import fetch from 'node-fetch'; // Import fetch for making HTTP requests
import { APIKey } from './prod.env.js'; // Import API key from prod.env.js

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Set the port for the server

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory path of the current file

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to fetch data from RAWG API
app.get('/api/games', async (req, res) => {
    const { search, dates, ordering } = req.query; // Extract query parameters
    let apiUrl = `https://api.rawg.io/api/games?key=${APIKey}`; // Construct API URL with API key

    // Append query parameters to the API URL if they exist
    if (search) {
        apiUrl += `&search=${encodeURIComponent(search)}`;
    }
    if (dates) {
        apiUrl += `&dates=${dates}`;
    }
    if (ordering) {
        apiUrl += `&ordering=${ordering}`;
    }

    try {
        const response = await fetch(apiUrl); // Fetch data from RAWG API
        if (!response.ok) {
            console.error(`Error fetching data from RAWG API: ${response.statusText}`);
            return res.status(response.status).json({ error: 'Failed to fetch data from RAWG API' });
        }
        const data = await response.json(); // Parse response data as JSON
        res.json(data); // Send JSON response to the client
    } catch (error) {
        console.error('An error occurred while fetching data from RAWG API:', error);
        res.status(500).json({ error: 'Failed to fetch data from RAWG API' });
    }
});

// Serve your index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send the index.html file to the client
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});