const POSTS_URL = 'http://localhost:3000/posts';

// DOM Elements
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const editPostForm = document.getElementById('edit-post-form');
const editTitleInput = document.getElementById('edit-title');
const editContentInput = document.getElementById('edit-content');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentPostId = null;

// Core Functions
async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  return await res.json();
}

function displayPosts(posts) {
  postList.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-item';
    div.textContent = post.title;
    div.addEventListener('click', () => handlePostClick(post.id));
    postList.appendChild(div);
  });
}

async function handlePostClick(id) {
  const res = await fetch(`${POSTS_URL}/${id}`);
  const post = await res.json();

  currentPostId = id;

  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>By ${post.author}</strong></p>
    <img src="${post.image}" alt="Post Image" width="100%">
    <p>${post.content}</p>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
  `;

  // Attach event listeners after rendering
  document.getElementById('edit-btn').addEventListener('click', () => showEditForm(post));
  document.getElementById('delete-btn').addEventListener('click', () => deletePost(id));
}

function showEditForm(post) {
  editTitleInput.value = post.title;
  editContentInput.value = post.content;
  editPostForm.classList.remove('hidden');
  postDetail.style.display = 'none';
}

// Add new post from form
function addNewPostListener() {
  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById('new-title').value,
      content: document.getElementById('new-content').value,
      author: document.getElementById('new-author').value,
      image: document.getElementById('new-image-url').value || ''
    };

    const res = await fetch(POSTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });

    const createdPost = await res.json();
    displaySinglePost(createdPost);
    newPostForm.reset();
  });
}

// Display single post after creation
function displaySinglePost(post) {
  const div = document.createElement('div');
  div.className = 'post-item';
  div.textContent = post.title;
  div.addEventListener('click', () => handlePostClick(post.id));
  postList.appendChild(div);
}

// Delete post
async function deletePost(id) {
  await fetch(`${POSTS_URL}/${id}`, { method: 'DELETE' });
  // Remove the post item from the list by id
  const postItems = document.querySelectorAll('.post-item');
  postItems.forEach(item => {
    item.addEventListener('click', function handler() {
      if (item.textContent === postDetail.querySelector('h2').textContent) {
        item.remove();
      }
      item.removeEventListener('click', handler);
    });
  });
  postDetail.innerHTML = '<p>Post deleted.</p>';
}

// Initialize App
async function main() {
  const posts = await fetchPosts();
  displayPosts(posts);
  if (posts.length > 0) {
    handlePostClick(posts[0].id); // Show first post by default
  }
}

document.addEventListener('DOMContentLoaded', () => {
  main();
  addNewPostListener();
});