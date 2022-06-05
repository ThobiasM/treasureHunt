import React from "react";

const FinishedView = ({huntname, finalmessage, restartHunt}) => {
  return (
    <div className="infobox-content">
      <div className="finished-view">
        <h3>YOU DID IT, YOU FINISHED {huntname}!</h3>
        {finalmessage && <p>{finalmessage}</p>}
        <button onClick={() => restartHunt()}>Back to main menu</button>
      </div>
    </div>
  )
}

export default FinishedView;










