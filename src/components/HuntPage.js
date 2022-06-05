import React from "react";
import FinishedView from "./FinishedView";
import FoundView from "./FoundView";
import LookingView from "./LookingView";
import Map from "./Map";

const HuntPage = ({infoBoxView, currentPostId, hunt, updateHunt, nextPost, restartHunt}) => {
  return (
    <div className='hunt-container'>
      <Map
        currentPostId={currentPostId}
        hunt={hunt}
        updateHunt={updateHunt}
      />

      <section className='infobox'>
        {infoBoxView === "looking" && hunt.locations.length > 0 &&
          <LookingView
            currentPostId={currentPostId}
            hunt={hunt}
          />
        }

        {infoBoxView === "found" &&
          <FoundView
            currentPostId={currentPostId}
            nextPost={nextPost}
          />
        }

        {infoBoxView === "finished" &&
          <FinishedView
            huntname={hunt.hunt_name}
            finalmessage={hunt.finalmessage}
            restartHunt={restartHunt}
          />
        }
      </section>
    </div>
  )
}

export default HuntPage;