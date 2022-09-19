async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment = document.querySelector('#commentText').value.trim();
  
    const postID = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            postID,
            content
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
  
  commentForm = document.querySelector("#commentForm")
  if (commentForm){commentForm.addEventListener("submit", commentFormHandler);}