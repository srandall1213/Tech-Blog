const postID = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  const editFormHandler = async function(event) {
    event.preventDefault();
  
    const titleEl = document.querySelector('#postTitle').value;
    const postEl = document.querySelector('#postText').value;
  
    await fetch(`/api/post/${postID}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postID,
        title: titleEl,
        contents: postEl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(postID)
  
    document.location.replace('/dashboard');
  };
  
  const deleteClickHandler = async function() {
    await fetch(`/api/post/${postID}`, {
      method: 'DELETE'
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#editPostForm')
    .addEventListener('submit', editFormHandler);
  document
    .querySelector('#deletePostBtn')
    .addEventListener('click', deleteClickHandler);