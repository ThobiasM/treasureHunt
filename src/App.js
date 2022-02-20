import './normalize.css';
import './App.css';
import React from 'react';
import {fetchAllHunts, fetchHunt} from './Hunts.js';
import StartPage from './components/StartPage';
import LoadingPage from './components/LoadingPage';
import HuntPage from './components/HuntPage';
import CreatePage from './components/CreatePage';

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

  createHuntView() {
    this.setState({
      view: 'create',
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
    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>

        {this.state.view === "loading" && <LoadingPage />}

        {this.state.view === "start" &&
          <StartPage
            startHunt={this.startHunt.bind(this)}
            allHunts={this.state.allHunts}
            createHuntView={this.createHuntView.bind(this)}
          />
        }

        {this.state.view === 'create' &&
          <CreatePage />
        }

        {this.state.view === 'hunt' &&
          <HuntPage 
            currentPostId={this.state.currentPostId}
            hunt={this.state.hunt}
            infoBoxView={this.state.infoBoxView}
            updateHunt={this.updateHunt.bind(this)}
            nextPost={this.nextPost.bind(this)}
            restartHunt={this.restartHunt.bind(this)}
          />
        }
      </div>
    );
  }
}

export default App;
