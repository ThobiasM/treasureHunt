import React from "react";

const LookingView = ({hunt, currentPostId}) => {
    const post = hunt.locations[currentPostId - 1];

    // console.log('CURRENT POST ID IN INFO', currentPostId);

    return (
        <div className="infobox-content">
            <h3>You are looking for post #{post.post_id}</h3>
            <h2>Hint: {post.hint}</h2>
        </div>
    )
}

export default LookingView;