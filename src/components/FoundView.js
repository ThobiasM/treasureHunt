import React from "react";

const FoundView = ({currentPostId, nextPost}) => {
    return (
        <div className="infobox-content">
            <div className="found-view">
                <h2>You found post #{currentPostId - 1}!</h2>
                <button onClick={() => nextPost()}>Next post</button>
            </div>
        </div>
    )
}

export default FoundView;