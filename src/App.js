import './App.css';
import Map from './components/Map';
import React from 'react';
import hunt from './Hunts.js';
import LookingView from './components/LookingView';
import FoundView from './components/FoundView';
import FinishedView from './components/FinishedView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPostId: 1,
      hunt: hunt,
      infoBoxView: "looking",
    }
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

    const lastPost = this.state.hunt.locations.length;

    console.log("last post is found", this.state.hunt.locations.filter(location => !location.isFound).length);

    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>

        <Map
          currentPostId={this.state.currentPostId}
          hunt={this.state.hunt}
          updateHunt={this.updateHunt.bind(this)}
        />

        <section className='infobox'>
          {this.state.infoBoxView === "looking" &&
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
              currentPostId={this.state.currentPostId}
              hunt={this.state.hunt}
            />
          }
        </section>
      </div>
    );
  }

}

export default App;
