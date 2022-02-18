import './normalize.css';
import './App.css';
import Map from './components/Map';
import React from 'react';
import {fetchHunt} from './Hunts.js';
import LookingView from './components/LookingView';
import FoundView from './components/FoundView';
import FinishedView from './components/FinishedView';
import StartPage from './components/StartPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPostId: 1,
      hunt: {locations: []},
      infoBoxView: "looking",
      view: "start",
      allHunts: [],
    }
  }

  // async componentDidMount() {
  //   const hunt = await fetchHunt();
  //   console.log(hunt);

  //   this.setState({
  //     hunt: hunt,
  //   })
  // }

  async componentDidMount() {
    const res = await fetch(`${process.env.REACT_APP_HUNT_API_URL}/allhunts`);
    const allHunts = res.json();
    console.log(allHunts);
    this.setState({
      allHunts: allHunts,
    })
  }

  updateHunt(hunt) {
    this.setState({
      hunt: hunt,
      currentPostId: this.state.currentPostId + 1,
    });

    if (this.state.hunt.locations.every(location => location.isFound)) {
      this.setState({
        infoBoxView: "finished",
      })
    } else {
      this.setState({
        infoBoxView: "found",
      })
    }
  }

  nextPost() {
    if (this.state.hunt.locations.every(location => location.isFound)) {
      this.setState({
        infoBoxView: "finished",
      })
    } else {
      this.setState({
        infoBoxView: "looking",
      })
    }
  }

  render() {
    console.log('CURRENT POST ID IN APP', this.state.currentPostId);

    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>

        {this.state.view === "start" && <StartPage allHunts={this.state.allHunts}/>}

        {/* <Map
          currentPostId={this.state.currentPostId}
          hunt={this.state.hunt}
          updateHunt={this.updateHunt.bind(this)}
        />

        <section className='infobox'>
          {this.state.infoBoxView === "looking" && this.state.hunt.locations.length > 0 &&
            <LookingView
              currentPostId={this.state.currentPostId}
              hunt={this.state.hunt}
            />
          }

          {this.state.infoBoxView === "found" &&
            <FoundView
              currentPostId={this.state.currentPostId}
              nextPost={this.nextPost.bind(this)}
            />
          }

          {this.state.infoBoxView === "finished" &&
            <FinishedView
              huntname={this.state.hunt.hunt_name}
              finalmessage={this.state.hunt.finalmessage}
            />
          }
        </section> */}
      </div>
    );
  }

}

export default App;
