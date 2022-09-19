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
            postID,
            comment
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
  
  document.querySelector('#commentCard').addEventListener('click', commentFormHandler);