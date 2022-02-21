import React from "react";

function NewPostInfo(props) {
  return (
    <div className="new-post-info">
      <label>
        Post name:
        <input onChange={(e) => props.handleInputChange(e)} name={'newPostName'} placeholder="E.g. 'Bakery'"></input>
      </label>

      <label>
        Hint:
        <input onChange={(e) => props.handleInputChange(e)} name={'newHint'} maxLength={500} placeholder={"Max 500 characters"}></input>
      </label>

      <label>
        Radius: <span id="demo">{props.newPostRadius}m</span>
        <input onChange={(e) => props.handleInputChange(e)} name={"newPostRadius"} type="range" min="5" max="100" step="5" className="slider" id="myRange"/>
      </label>

      <button onClick={() => props.handleSavePost()}>Save post</button>
    </div>
  )
}

export default NewPostInfo;