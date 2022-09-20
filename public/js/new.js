const addPostBtn = document.querySelector('#addPostBtn');
const createPost = document.querySelector('#createPost');

function switcheroo(event) {
    createPost.classList.remove('hide');
    addPostBtn.classList.add('hide');
};

async function newPost(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('#postTitle').value;
    const postText = document.querySelector('#postText').value;
  
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title: postTitle,
        content: postText,
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
  
  document.querySelector('.newPostForm').addEventListener('submit', newPost);
  addPostBtn.addEventListener('click', switcheroo) 