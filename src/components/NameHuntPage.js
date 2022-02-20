import React from "react";

function NameHuntPage(props) {
  return(
    <div className={'name-hunt-view'}>
      <h2>Name your new treasure hunt:</h2>
      <input onChange={(e) => props.handleInputChange(e)} name={'newHuntName'} placeholder={"E.g. 'My favorite benches'"}></input>
      <button onClick={() => props.handleSaveNewHunt()}>Save and add posts</button>
    </div>
  )
}

export default NameHuntPage;