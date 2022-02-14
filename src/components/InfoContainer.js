import React from "react";

class InfoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPost: this.props.hunt.locations[this.props.currentPostId]
        }
    }
    render() {
        const post = this.state.currentPost;

        return (
            <div className="info-container">
                <h2>You are looking for post #{this.props.currentPostId + 1}</h2>
                <h3>Hint: {post.hint}</h3>
            </div>
        )
    }
}

// post_id: 1,
// post_name: "Nydalen Bryggeri",
// coordinates: {
//   lat: 59.950313170793166,
//   lng: 10.76434599639627,
// },
// radius: "",
// hint: "Lønningspils",

export default InfoContainer;