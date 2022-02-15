import React, { useState } from "react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import MAPS_API_KEY from "../config";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";

const containerStyle = {
  width: "500px",
  height: "800px",
};

const center = {
  lat: 59.94960397066376,
  lng: 10.765730007626226,
};


// // Starting attempt at Hooks
// async function Map(props) {
//   const [hunt, setHunt] = useState(props.hunt);
//   const [postLocation, setPostLocation] = useState(hunt.locations[props.currentPostId-1].coordinates);
//   const [currentPosition, setCurrentPosition] = useState({ lat: 59.9500780677004, lng: 10.764548937677302 });
//   const [distanceToPost, setDistanceToPost] = useState(undefined);
//   const [locationIntervalId, setLocationIntervalId] = useState(undefined);
//   const [maxDistanceToPost, setMaxDistanceToPost] = useState(50);
//   const [currentPostId, setCurrentPostId] = useState(props.currentPostId);
//   const [lastFoundPost, setLastFoundPost] = useState(0);
// }



class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postLocation: this.props.hunt.locations[this.props.currentPostId-1].coordinates,
      currentPosition: { lat: 59.9500780677004, lng: 10.764548937677302 },
      currentPosition2: { lat: 59.94908032738213, lng: 10.768550431173 },
      distanceToPost: undefined,
      locationIntervalId: undefined,
      maxDistanceToPost: 50,
      currentPostId: this.props.currentPostId,
      hunt: this.props.hunt,
      lastFoundPost: 0,
    };
  }



  playerDistanceFromPost(playerPosition, postPosition) {
    let playerLat = playerPosition.lat;
    let playerLng = playerPosition.lng;
    let postLat = postPosition.lat;
    let postLng = postPosition.lng;

    const radius = 6371e3; // metres
    const φ1 = (playerLat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (postLat * Math.PI) / 180;
    const Δφ = ((postLat - playerLat) * Math.PI) / 180;
    const Δλ = ((postLng - playerLng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceToPost = radius * c; // in metres

    this.setState({
      distanceToPost,
    });
  }

  async getPlayerPosition() {
    let currentPosition = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position);
        },
        function (error) {
          reject(error);
        }
      );
    });

    // console.log('INTERVAL ID', this.state.locationIntervalId);
    // console.log('CURRENT POSITION', this.state.currentPosition);

    this.setState({
      currentPosition: {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      },
    });

    this.playerDistanceFromPost(
      this.state.currentPosition,
      this.state.postLocation
    );
  }

  async componentDidMount() {
    this.playerDistanceFromPost(
      this.state.currentPosition,
      this.state.postLocation
    );
    // const locationIntervalId =  setInterval(() => {
    //     this.getPlayerPosition();
    // }, 1000);

    // this.setState({
    //     locationIntervalId: locationIntervalId,
    // })
  }

  componentWillUnmount() {
    clearInterval(this.state.locationIntervalId);
  }

  componentDidUpdate() {
    console.log('UPDATED');

    if (this.state.distanceToPost < this.state.maxDistanceToPost) {
        this.state.hunt.locations[this.state.currentPostId-1].isFound = true;

        if (this.state.currentPostId !== this.state.lastFoundPost) {
            this.props.postFound();
            this.props.updateHunt(this.state.hunt);
            this.setState({
                lastFoundPost: this.state.currentPostId,
            })
        }
    }
  }

  render() {
    console.log("my position", this.state.currentPosition);
    console.log("distance to post", this.state.distanceToPost);

    console.log('CURRENT POST ID IN MAP', this.props.currentPostId);

    console.log('HUNT', this.state.hunt);

    // console.log('HUNT LOCATIONS', this.state.hunt.locations);

    return (
      <LoadScript googleMapsApiKey={MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>

        {this.state.hunt.locations
        .filter(post => {
            return post.isFound;
        })
        .map(post => {
            return (
                <Marker
                key={post.post_id}
                position={post.coordinates}
                label={`${post.post_id}`}
            />
            )
        })
            
        }

        <Marker
        // key={post.post_id}
        position={this.state.currentPosition}
        label={"You"}
        />

          {/* LAGER MARKØR FOR ALLE POSTER */}
          {/* {
                hunt.locations.map((post) => {
                    return (
                        <Marker 
                            key={post.post_id}
                            position={post.coordinates}
                            label={`${post.post_id}`}
                        />
                    )
                })
            } */}
          {/* <OverlayView
                position={this.state.position}
                mapPaneName={OverlayView.MARKER_LAYER}>
                <img className='userPositionMarker'src='https://img.icons8.com/doodle/344/homer-simpson.png' alt='homer'/>
                </OverlayView> */}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
