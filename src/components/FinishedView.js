import React from "react";

function FinishedView(props) {
  return <div className="infobox-content">
    <div className="finished-view">
      <h3>YOU DID IT, YOU FINISHED {props.huntname}!</h3>
      {props.finalmessage && <p>{props.finalmessage}</p>}
      <button onClick={() => props.restartHunt()}>Back to main menu</button>
    </div>
  </div>
};

export default FinishedView;










