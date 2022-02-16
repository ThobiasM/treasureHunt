import './App.css';
import Map from './components/Map';
import React from 'react';
import InfoContainer from './components/InfoContainer';
import hunt from './Hunts.js';
import HuntFinished from './components/HuntFinished';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentPostId: 1,
      hunt: hunt,
    }
  }

  updateHunt(hunt) {
    const lastPost = this.state.hunt.locations.length;

    if (this.state.currentPostId < lastPost) {
      this.setState({
        hunt: hunt,
        currentPostId: this.state.currentPostId + 1,
      })
    }
  }

  finishHunt(hunt) {
    this.setState({
      hunt: hunt,
    })
  }

  render () {
    console.log('CURRENT POST ID IN APP', this.state.currentPostId);

    const lastPost = this.state.hunt.locations.length;

    

    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>
        <Map 
          currentPostId={this.state.currentPostId}
          hunt={this.state.hunt}
          updateHunt={this.updateHunt.bind(this)}
          lastPostFound={this.finishHunt.bind(this)}
        />

        {(this.state.currentPostId === lastPost && this.state.hunt.locations[this.state.currentPostId-1].isFound === true) &&
          <HuntFinished />
        }
        
        {(this.state.currentPostId <= lastPost) && 
          <InfoContainer
            currentPostId={this.state.currentPostId}
            hunt={this.state.hunt}
          />
        }


        
      </div>
    );
  }
  
}

export default App;
