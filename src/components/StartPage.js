import React, { useState } from "react";

const StartPage = ({allHunts, createHuntView, startHunt}) => {
  const [selectedHuntId, setSelectedHuntId] = useState(undefined);

  const checkSelectedHunt = () => {
    if(selectedHuntId !== undefined) {
      startHunt(selectedHuntId);
    } 
  }

  return (
    <div className="start-view">
      <div className="play-hunt">
        <h2>Pick a Treasure Hunt:</h2>
        <select onChange={(e) => setSelectedHuntId(e.target.value)} name="hunts">
          <option value="undefined">---</option>
          {allHunts.map(hunt => <option value={hunt.hunt_id} key={hunt.hunt_id}>{hunt.hunt_name}</option>)}
        </select>
        <button onClick={() => checkSelectedHunt()}>Start</button>
      </div>

      <div className="create-hunt">
        <h2>Create a Treasure Hunt</h2>
        <button onClick={() => createHuntView()}>Create New</button>
      </div>

      <img alt="" src="../android-chrome-512x512.png" className="start-page-img" />
    </div>
  )
}

export default StartPage;