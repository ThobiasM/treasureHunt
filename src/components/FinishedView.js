import React from "react";

function FinishedView() {
  return <div className="infobox-content">
    <p>YOU DID IT, YOU FINISHED {props.huntname}!</p>
    {props.finalmessage && <p>{props.finalmessage}</p>}
    <button>Back to main menu</button>
  </div>
};

export default FinishedView;
