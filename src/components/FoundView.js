import React from "react";

function FoundView(props) {
    return (
        <div className="infobox-content">
            <h2>You found post #{props.currentPostId - 1}</h2>
            <button onClick={() => props.nextPost()}>Next post</button>
        </div>
    )
}

export default FoundView;