const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gen.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ GenBridge localhost server running at http://localhost:${PORT}`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});
