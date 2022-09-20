const postID = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];
  
const editPost = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value;
  const post = document.querySelector('#postText').value;

  await fetch(`/api/post/${postID}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: postID,
      title: title,
      content: post
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};
  
const deletePost = async function() {
  await fetch(`/api/post/${postID}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};
  
document.querySelector('#editPost').addEventListener('submit', editPost);
document.querySelector('#deletePostBtn').addEventListener('click', deletePost);