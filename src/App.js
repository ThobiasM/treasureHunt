import './normalize.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import {/*fetchAllHunts,*/ fetchHunt} from './Hunts.js';
import StartPage from './components/StartPage';
import LoadingPage from './components/LoadingPage';
import HuntPage from './components/HuntPage';
import CreatePage from './components/CreatePage';

const App = () => {
  const [state, setState] = useState({
    currentPostId: 1,
    hunt: {},
    infoBoxView: "looking",
    view: "loading",
    allHunts: [],
  })

  useEffect(() => {
    const fetchAllHunts = async () => {
      const res = await fetch(`${process.env.REACT_APP_HUNT_API_URL}/allhunts`);
      const allHunts = await res.json();
    
      setTimeout(() => {
        setState(prevState => {
          return {
            ...prevState,
            allHunts: allHunts,
            view: "start",
          }
        })
      }, 1500);
    }

    fetchAllHunts().catch(console.error);
  }, [])

  const startHunt = async (huntId) => {
    setState(prevState => {
      return {
        ...prevState,
        view: 'loading'
      }
    });

    const hunt = await fetchHunt(huntId);
    console.log(hunt);

    setState(prevState => {
      return {
        ...prevState,
        hunt: hunt,
        view: 'hunt',
      }
    })
  }

  const createHuntView = () => {
    setState(prevState => {
      return {
        ...prevState,
        view: 'create',
      }
    })
  }

  const startView = () => {
    setState(prevState => {
      return {
        ...prevState,
        view: 'start',
      }
    })
  }

  const updateHunt = (hunt) => {
    setState(prevState => {
      return {
        ...prevState,
        hunt: hunt,
        currentPostId: prevState.currentPostId + 1,
      }
    });

    if (state.hunt.locations.every(location => location.isFound)) {
      setState(prevState => {
        return {
          ...prevState,
          infoBoxView: "finished",
        }
      })
    } else {
      setState(prevState => {
        return {
          ...prevState,
          infoBoxView: "found",
        }
      })
    }
  }

  const nextPost = () => {
    if (state.hunt.locations.every(location => location.isFound)) {
      setState(prevState => {
        return {
          ...prevState,
          infoBoxView: "finished",
        }
      })
    } else {
      setState(prevState => {
        return {
          ...prevState,
          infoBoxView: "looking",
        }
      })
    }
  }

  const restartHunt = () => {
    let resetHunt = {...state.hunt};
    resetHunt.locations.forEach(post => post.isFound = false);

    setState(prevState => {
      return {
        ...prevState,
        currentPostId: 1,
        view: 'start',
        hunt: resetHunt,
        infoBoxView: "looking",
      }
    })
  }

  return (
    <div className='main-content'>
      <header className='main-header'>
        <h1>Treasure Hunt</h1>
      </header>

      {state.view === "loading" && <LoadingPage />}

      {state.view === "start" &&
        <StartPage
          startHunt={startHunt}
          allHunts={state.allHunts}
          createHuntView={createHuntView}
        />
      }

      {state.view === 'create' &&
        <CreatePage 
        startView={startView}
        />
      }

      {state.view === 'hunt' &&
        <HuntPage 
          currentPostId={state.currentPostId}
          hunt={state.hunt}
          infoBoxView={state.infoBoxView}
          updateHunt={updateHunt}
          nextPost={nextPost}
          restartHunt={restartHunt}
        />
      }
    </div>
  );
}

export default App;