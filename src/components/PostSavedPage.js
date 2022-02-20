import React from "react";

function PostSavedPage(props) {
  return(
    <div className="post-saved-view">
      <h2>Post saved!</h2>
      <button onClick={() => props.addNewPost()}>Add another post</button>
      <button>Finish and submit hunt</button>
    </div>
  )
}

export default PostSavedPage;