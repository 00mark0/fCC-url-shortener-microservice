# URL Shortener Microservice

## Overview

This project is a URL Shortener Microservice built using Node.js and Express. It provides an endpoint to shorten URLs and redirect short URLs to the original URLs. The application also includes a simple web interface to interact with the API.

## Features

- **Shorten URL**: POST a URL to `/api/shorturl` and receive a shortened URL.
- **Redirect Short URL**: Access `/api/shorturl/<short_url>` to be redirected to the original URL.
- **URL Validation**: Checks if the provided URL is valid.

## Endpoints

### `/api/shorturl`

- **Method**: POST
- **Description**: Accepts a URL and returns a JSON object with the original URL and its shortened version.
- **Request Body**:
  ```json
  {
    "url": "https://example.com"
  }
  ```

## Response

```json
{
  "original_url": "https://example.com",
  "short_url": "shortId"
}
```
