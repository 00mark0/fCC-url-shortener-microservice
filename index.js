const express = require("express");
const bodyParser = require("body-parser");
const dns = require("dns");
const shortid = require("shortid");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database for URL mapping
const urlDatabase = {};

// Route to handle root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route to handle URL shortening
app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  // Validate URL format
  try {
    new URL(url); // Will throw an error if invalid
  } catch (e) {
    return res.json({ error: "invalid url" });
  }

  // Check if URL is valid using DNS
  dns.lookup(new URL(url).hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid url" });
    }

    // Create short URL and store it in the database
    const shortUrl = shortid.generate();
    urlDatabase[shortUrl] = url;

    res.json({
      original_url: url,
      short_url: shortUrl,
    });
  });
});

// Route to handle redirection
app.get("/api/shorturl/:shorturl", (req, res) => {
  const { shorturl } = req.params;
  const originalUrl = urlDatabase[shorturl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "No short URL found for the given input" });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
