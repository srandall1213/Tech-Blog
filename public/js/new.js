const addPostBtn = document.querySelector('#addPostBtn');
const createPost = document.querySelector('#createPost');

function toggleHide(event) {
    createPost.classList.remove('hide');
    addPostBtn.classList.add('hide');
};

async function newFormHandler(event) {
    event.preventDefault();
  
    const titleEl = document.querySelector('#postTitle').value;
    const postEl = document.querySelector('#postText').value;
  
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title:titleEl,
        contents:postEl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      addPostBtn.classList.remove('hide');
      createPost.classList.add('hide');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);
  addPostBtn.addEventListener('click', toggleHide) 