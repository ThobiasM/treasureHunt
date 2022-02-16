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
    this.setState({
      hunt: hunt,
      currentPostId: this.state.currentPostId + 1,
    });
  }


  getHuntFinished() {
    if (this.state.hunt.locations.every(location => location.isFound)) {
      console.log('ALL POSTS FOUND');
      return <HuntFinished />;
    } else {
      console.log('STILL POSTS LEFT');
    }
  }

  render () {
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
        
        { this.getHuntFinished() }
        
        {(this.state.currentPostId <= lastPost && this.state.hunt.locations[this.state.currentPostId-1].isFound === false) && 
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
