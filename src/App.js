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
      currentPostId: 0,
      hunt: hunt,
    }
  }
  render () {
    return (
      <div className='main-content'>
        <header className='main-header'>
          <h1>Treasure Hunt</h1>
        </header>
        <Map />
        <InfoContainer
          currentPostId={this.state.currentPostId}
          hunt={this.state.hunt}
        />
      </div>
    );
  }
  
}

export default App;
