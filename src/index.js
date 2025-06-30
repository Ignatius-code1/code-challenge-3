const POSTS_URL = 'http://localhost:3000/posts';

const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const editPostForm = document.getElementById('edit-post-form');
const editTitleInput = document.getElementById('edit-title');
const editContentInput = document.getElementById('edit-content');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentPostId = null;


async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  return await res.json();
}

function displayPosts(posts, highlightId = null) {
  postList.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-item' + (post.id === highlightId ? ' active' : '');
    div.textContent = post.title;
    div.addEventListener('click', () => handlePostClick(post.id));
    postList.appendChild(div);
  });
}

async function handlePostClick(id) {
  const res = await fetch(`${POSTS_URL}/${id}`);
  const post = await res.json();
  currentPostId = id;
  renderPostDetail(post);
  const posts = await fetchPosts();
  displayPosts(posts, id);
}

function renderPostDetail(post) {
  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>By ${post.author}</strong></p>
    <img src="${post.image}" alt="Post Image" width="100%">
    <p>${post.content}</p>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
  `;
  document.getElementById('edit-btn').addEventListener('click', () => showEditForm(post));
  document.getElementById('delete-btn').addEventListener('click', async () => {
    await fetch(`${POSTS_URL}/${post.id}`, { method: 'DELETE' });
    const posts = await fetchPosts();
    displayPosts(posts);
    postDetail.innerHTML = '<p>Select a post to see details.</p>';
  });
}

function showEditForm(post) {
  editTitleInput.value = post.title;
  editContentInput.value = post.content;
  editPostForm.classList.remove('hidden');
  postDetail.style.display = 'none';
}

function addNewPostListener() {
  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById('new-title').value,
      content: document.getElementById('new-content').value,
      author: document.getElementById('new-author').value,
      image: document.getElementById('new-image-url').value
    };
    const res = await fetch(POSTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    const post = await res.json();
    const posts = await fetchPosts();
    displayPosts(posts, post.id);
    handlePostClick(post.id);
    newPostForm.reset();
  });
}

function addEditPostListener() {
  editPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updatedPost = {
      title: editTitleInput.value,
      content: editContentInput.value
    };
    await fetch(`${POSTS_URL}/${currentPostId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    });
    const posts = await fetchPosts();
    displayPosts(posts, currentPostId);
    handlePostClick(currentPostId);
    editPostForm.classList.add('hidden');
    postDetail.style.display = '';
  });
  cancelEditBtn.addEventListener('click', () => {
    editPostForm.classList.add('hidden');
    postDetail.style.display = '';
  });
}

async function main() {
  const posts = await fetchPosts();
  displayPosts(posts);
  if (posts.length > 0) {
    handlePostClick(posts[0].id); 
  }
  addNewPostListener();
  addEditPostListener();
}

document.addEventListener('DOMContentLoaded', main);