import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import React from 'react';
import InfoContainer from './components/InfoContainer';
import hunt from './Hunts.js';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentPostId: 1,
      hunt: hunt,
    }
  }

  nextPost() {
    this.setState({
      currentPostId: this.state.currentPostId + 1,
    });
  };

  updateHunt(hunt) {
    this.setState({
      hunt: hunt,
    })
  }

  render () {
    console.log('CURRENT POST ID IN APP', this.state.currentPostId);

    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>
        <Map 
          currentPostId={this.state.currentPostId}
          postFound={this.nextPost.bind(this)}
          hunt={this.state.hunt}
          updateHunt={this.updateHunt.bind(this)}
        />

        <InfoContainer
          currentPostId={this.state.currentPostId}
          hunt={this.state.hunt}
        />
      </div>
    );
  }
  
}

export default App;
