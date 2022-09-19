async function commentFormHandler(event) {
    event.preventDefault();
    
    const comment = document.querySelector('#commentInput').value.trim();
    console.log(comment);
  
    const postID = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            comment,
            postID,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  const commentBtn = document.querySelector('#commentBtn');
  // document.querySelector('#commentCard').addEventListener('submit', commentFormHandler);
 commentBtn.addEventListener('click', commentFormHandler) 