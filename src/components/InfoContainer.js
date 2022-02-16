import React from "react";

class InfoContainer extends React.Component {
    render() {
        const hunt = this.props.hunt;
        const post = hunt.locations[this.props.currentPostId-1];

        console.log('CURRENT POST ID IN INFO', this.props.currentPostId);
        console.log('PROPS I INFOCONTAINER', this.props);

        return (
            <div className="info-container">
                <h2>You are looking for post #{post.post_id}</h2>
                <h3>Hint: {post.hint}</h3>
            </div>
        )
    }
}

    
// post_id: 1,
// post_name: "Nydalen Bryggeri",
// coordinates: {
// lat: 59.950313170793166,
// lng: 10.76434599639627,
// },
// radius: 50,
// hint: "Lønningspils",
// isFound: false,
    

export default InfoContainer;