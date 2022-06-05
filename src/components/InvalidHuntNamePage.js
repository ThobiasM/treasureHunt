import React from "react";

const InvalidHuntNamePage = ({handleInputChange, handleSubmitNewHunt}) => {
  return(
    <div className={'name-hunt-view'}>
      <h2 className="invalid-hunt-name">Oops! The hunt name you chose is already taken - please pick a new name.</h2>
      <h3>Name your new treasure hunt:</h3>
      <input onChange={(e) => handleInputChange(e)} name={'newHuntName'} placeholder={"E.g. 'My favorite benches'"}></input>
      <button onClick={() => handleSubmitNewHunt()}>Save Hunt!</button>
    </div>
  )
}

export default InvalidHuntNamePage;