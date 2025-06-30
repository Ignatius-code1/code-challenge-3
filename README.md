# My Blog App
Author: Ignatius Macharia Waweru .
A modern blog application to view, add, edit, and delete blog posts. Built with vanilla JavaScript, HTML, CSS, and powered by a mock REST API using `json-server`.

## Features
- View all blog post titles and images
- Click a post to see its details
- Add a new blog post (POST)
- Edit and update a post (PATCH)
- Delete a post (DELETE)
- Responsive and modern UI (two-column layout)
- Shows the first post's details on page load

## Setup Instructions

### 1. Clone or Download the Repository

```
git clone <your-repo-url>
cd code-challenge-3
```

### 2. Install Dependencies

Install `json-server` locally (already in devDependencies):

```
npm install
```

### 3. Start the Backend (Mock API)

```
npm run server
```

This will start the API at `http://localhost:3000`.

### 4. Start the Frontend

You can use [live-server](https://www.npmjs.com/package/live-server) or the VS Code Live Server extension:

```
live-server
```

Or simply open `index.html` in your browser.

## API Endpoints
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a single post
- `POST /posts` - Add a new post
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

## Technologies Used
- HTML5, CSS3
- JavaScript (ES6)
- [json-server](https://github.com/typicode/json-server)

## Author
- Your Name

---

Feel free to customize and extend this project!
