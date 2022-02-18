import React from "react";

class StartPage extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     allHunts: [],
  //   }
  // }

  // async componentDidMount() {
  //   const res = await fetch(`${process.env.REACT_APP_HUNT_API_URL}/allhunts`);
  //   const allHunts = res.json();
  //   console.log(allHunts);
  //   this.setState({
  //     allHunts: allHunts,
  //   })
  // }

  render() {
    return (
      <div>
        {this.props.allHunts}
      </div>
    )
  }
}

export default StartPage;