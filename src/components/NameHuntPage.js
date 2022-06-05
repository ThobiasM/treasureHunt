import React from "react";

const NameHuntPage = ({handleInputChange, createPosts}) => {
  return (
    <div className={'name-hunt-view'}>
      <h2>Name your new treasure hunt:</h2>
      <input onChange={(e) => handleInputChange(e)} name={'newHuntName'} placeholder={"E.g. 'My favorite benches'"}></input>
      <button onClick={() => createPosts()}>Save and add posts</button>
    </div>
  )
}

export default NameHuntPage;