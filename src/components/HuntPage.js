import React from "react";
import FinishedView from "./FinishedView";
import FoundView from "./FoundView";
import LookingView from "./LookingView";
import Map from "./Map";


class HuntPage extends React.Component {

  render() {
    const infoBoxView = this.props.infoBoxView;

    return(
      <div className='hunt-container'>
        <Map
          currentPostId={this.props.currentPostId}
          hunt={this.props.hunt}
          updateHunt={this.props.updateHunt}
        />

        <section className='infobox'>
          {infoBoxView === "looking" && this.props.hunt.locations.length > 0 &&
            <LookingView
              currentPostId={this.props.currentPostId}
              hunt={this.props.hunt}
            />
          }

          {infoBoxView === "found" &&
            <FoundView
              currentPostId={this.props.currentPostId}
              nextPost={this.props.nextPost}
            />
          }

          {infoBoxView === "finished" &&
            <FinishedView
              huntname={this.props.hunt.hunt_name}
              finalmessage={this.props.hunt.finalmessage}
              restartHunt={this.props.restartHunt}
            />
          }
        </section>
      </div>
    )
  }
}

export default HuntPage;