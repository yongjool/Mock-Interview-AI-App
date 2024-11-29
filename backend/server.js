const express = require('express'); // Import Express for building the server
const cors = require('cors'); // Import CORS
const app = express(); // Initialize the Express app

// Middleware
app.use(cors()); // Enable CORS for all origins (you can configure this for specific domains later)
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Export the app (for testing)
module.exports = app;

// Set the port from environment variables or default to 4000
const PORT = process.env.PORT || 4000;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    }).on('error', (error) => {
        // Handle port-related errors
        if (error.code === 'EADDRINUSE') {
            console.error('Port is already in use');
        } else {
            console.error('Server Error:', error);
        }
    });
}
