# My Blog App
Author : Ignatius Macharia Waweru 
A simple blog application to view, add, edit, and delete blog posts. Built with vanilla JavaScript, HTML, CSS, and powered by a mock REST API using `json-server`.

## Features
- View all blog post titles and images
- Click a post to see its details
- Add a new blog post
- Edit and update a post
- Delete a post
- Responsive and modern UI

## Setup Instructions

### 1. Clone or Download the Repository

```
git clone <your-repo-url>
cd code-challenge-3
```

### 2. Install Dependencies

Install `json-server` globally if you haven't:

```
npm install -g json-server@0.17.4
```

### 3. Start the Backend (Mock API)

```
json-server db.json
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
- Ignatius Macharia Waweru .❤
