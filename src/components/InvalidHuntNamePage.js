import React from "react";

function InvalidHuntNamePage(props) {
  return(
    <div className={'name-hunt-view'}>
      <h1>We're sorry, the hunt name you chose is already taken</h1>
      <h2>Name your new treasure hunt:</h2>
      <input onChange={(e) => props.handleInputChange(e)} name={'newHuntName'} placeholder={"E.g. 'My favorite benches'"}></input>
      <button onClick={() => props.handleSubmitNewHunt()}>Try again!</button>
    </div>
  )
}

export default InvalidHuntNamePage;