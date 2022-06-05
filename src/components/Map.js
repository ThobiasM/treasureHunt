import React, {useState, useEffect} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MAPS_API_KEY from "../config";

const containerStyle = {
  width: "100%",
  height: "65%",
};

const playerDistanceFromPost = (playerPosition, postPosition) => {
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

  return distanceToPost;
}

const Map = ({currentPostId, hunt, updateHunt}) => {
  const [currentPosition, setCurrentPosition] = useState({});
  let locationIntervalId = null;

  const getPlayerPosition = async () => {
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

    setCurrentPosition({
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
    });
  }

  useEffect(() => {
    locationIntervalId = setInterval(() => {
        getPlayerPosition();
    }, 500);
    // Cleanup function
    return () => {
      clearInterval(locationIntervalId);
    };
  }, []);

  useEffect(() => {
    if (currentPostId > hunt.locations.length) {
      clearInterval(locationIntervalId);
    } 
    else {
      const location = hunt.locations[currentPostId-1];
  
      const distanceToPost = playerDistanceFromPost(currentPosition, location.coordinates);
  
      let updatedHunt = {...hunt};
  
      if (distanceToPost < location.radius) {
        updatedHunt.locations[currentPostId - 1].isFound = true;
        updateHunt(updatedHunt);
      }
    }
  })

  let centerPosition = currentPosition.lat ? currentPosition : {lat: 59.911237964049626, lng: 10.750340656556627};

  return (
    <LoadScript googleMapsApiKey={MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPosition}
        zoom={16}
        clickableIcons={false}
      >

      {
        hunt.locations
          .filter(post => {
            return post.isFound;
          })
          .map(post => {
            return (
              <Marker
                key={post.post_id}
                position={post.coordinates}
                label={`${post.post_id}`}
                icon={"https://i.ibb.co/j8NcQ4C/Star-black-outline.png"}
              />
            )
          })   
      }

      <Marker
        position={currentPosition}
        label={"You"}
      />

      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
