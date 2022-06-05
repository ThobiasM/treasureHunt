import React, { useState } from 'react';

const PostSavedPage = ({addNewPost, handleInputChange, handleSubmitNewHunt}) => {
  const [showFinishMessage, setShowFinishMessage] = useState(false);

  return (
    <div className="post-saved-view">
      <h2>Post saved!</h2>
      {!showFinishMessage &&
      <div className='post-added-btn-container'>
        <button onClick={() => addNewPost()}>Add another post</button>
        <button onClick={() => setShowFinishMessage(true)}>Finish treasure hunt</button>
      </div>
      }

      {showFinishMessage &&
      <div className='final-message-and-submit'>
        <label htmlFor={'newFinalMessage'}>
          Do you want to give the player a final message when they finish your treasure hunt?
        </label>
        <input onChange={(e) => handleInputChange(e)} id={'newFinalMessage'} name={'newFinalMessage'} maxLength={500} placeholder={"Max 500 characters"}></input>
        <button onClick={() => handleSubmitNewHunt()}>Save treasure hunt</button>
      </div>
      }
    </div>
  )
}

export default PostSavedPage;