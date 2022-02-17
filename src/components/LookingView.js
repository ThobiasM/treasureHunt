import React from "react";

class LookingView extends React.Component {
    render() {
        const hunt = this.props.hunt;
        const post = hunt.locations[this.props.currentPostId - 1];

        console.log('CURRENT POST ID IN INFO', this.props.currentPostId);

        return (
            <div className="infobox-content">
                <h3>You are looking for post #{post.post_id}</h3>
                <h2>Hint: {post.hint}</h2>
            </div>
        )
    }
}

export default LookingView;