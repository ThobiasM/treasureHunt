import './normalize.css';
import './App.css';
import Map from './components/Map';
import React from 'react';
import {fetchAllHunts, fetchHunt} from './Hunts.js';
import LookingView from './components/LookingView';
import FoundView from './components/FoundView';
import FinishedView from './components/FinishedView';
import StartPage from './components/StartPage';
import LoadingPage from './components/LoadingPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPostId: 1,
      hunt: {},
      infoBoxView: "looking",
      view: "loading",
      allHunts: undefined,
    }
  }

  async componentDidMount() {
    const allHunts = await fetchAllHunts();
    console.log(allHunts);

    setTimeout(() => {
      this.setState({
        allHunts: allHunts,
        view: "start",
      })
    }, 1500);
  }

  async startHunt(huntId) {
    this.setState({
      view: 'loading'
    });

    const hunt = await fetchHunt(huntId);
    console.log(hunt);

    this.setState({
      hunt: hunt,
      view: 'hunt',
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

  restartHunt() {
    let resetHunt = {...this.state.hunt};
    resetHunt.locations.forEach(post => post.isFound = false);

    this.setState({
      currentPostId: 1,
      view: 'start',
      hunt: resetHunt,
      infoBoxView: "looking",
    })
  }

  render() {
    console.log('CURRENT POST ID IN APP', this.state.currentPostId);

    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>

        {this.state.view === "loading" && <LoadingPage />}

        {this.state.view === "start" && <StartPage startHunt={this.startHunt.bind(this)} allHunts={this.state.allHunts}/>}

        {this.state.view === 'hunt' &&
          // <HuntPage />

        <div className='hunt-container'>
          <Map
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
                restartHunt={this.restartHunt.bind(this)}
              />
            }
          </section>
        </div>
        }

      </div>
    );
  }

}

export default App;
