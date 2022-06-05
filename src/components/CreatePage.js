import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MAPS_API_KEY from "../config";
import NameHuntPage from "./NameHuntPage";
import InvalidHuntNamePage from "./InvalidHuntNamePage";
import PostSavedPage from "./PostSavedPage";
import NewPostInfo from "./NewPostInfo";
const API_URL = process.env.REACT_APP_HUNT_API_URL;

const CreatePage = ({ startView }) => {
  const [state, setState] = useState({
    view: "name-hunt",
    newHuntName: "",
    newHuntLocations: [],
    creatorPosition: {},
    newMarkerPosition: {},
    newPostName: "",
    newPostIndex: 1,
    newHint: "",
    newFinalMessage: "",
    newPostRadius: 50,
  });

  useEffect(() => {
    let lat, lng;
    let currentLocationPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        resolve({ lat, lng: lng });
      });
    });

    currentLocationPromise.then((value) => {
      setState((prevState) => {
        return {
          ...prevState,
          creatorPosition: value,
        };
      });
    });
  }, []);

  const handleMapClick = (e) => {
    console.log("CLICKED MAP");
    let clickLat = parseFloat(e.latLng.lat().toFixed(6));
    let clickLng = parseFloat(e.latLng.lng().toFixed(6));
    let markerPosition = { lat: clickLat, lng: clickLng };
    console.log(markerPosition);

    setState(prevState => {
      return {
        ...prevState,
        newMarkerPosition: markerPosition,
      }
    });
  };

  const handleInputChange = (e) => {
    setState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value.replace(/[-[\]{}()*+;\\^$|#]/g, "\\$&"),
      }
    });
  };

  const createPosts = () => {
    if (state.newHuntName !== "") {
      setState(prevState => {
        return {
          ...prevState,
          view: "add-post",
        }
      });
    }
  };

  const handleSavePost = () => {
    console.log(state.newMarkerPosition, state.newPostName, state.newHint);

    if (state.newMarkerPosition.lat && state.newPostName && state.newHint) {
      const newPost = {
        post_name: state.newPostName,
        radius: state.newPostRadius,
        hint: state.newHint,
        coordinates: state.newMarkerPosition,
        index: state.newPostIndex,
      };

      console.log(newPost);

      setState(prevState => {
        return {
          ...prevState,
          view: "post-saved",
          newHuntLocations: [...prevState.newHuntLocations, newPost],
          newPostIndex: prevState.newPostIndex + 1,
          newMarkerPosition: {},
          newPostName: "",
          newHint: "",
          newPostRadius: 50,
        }
      });
    }
    console.log(state.newHuntLocations);
  };

  const handleSubmitNewHunt = async () => {
    let fetchStatus = "";

    try {
      await fetch(`${API_URL}/allhunts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newHuntName: state.newHuntName }),
      }).then((res) => (fetchStatus = res.status));

      if (fetchStatus !== 409 && state.newHuntLocations.length > 0) {
        let updateHunt = await fetch(`${API_URL}/locations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            huntName: state.newHuntName,
            createdAt: new Date().toString().slice(0, 23),
            huntLocations: state.newHuntLocations,
            finalMessage: state.newFinalMessage,
          }),
        });

        setState(prevState => {
          return {
            ...prevState,
            newHuntLocations: [],
            newPostIndex: 1,
            newMarkerPosition: {},
            newPostName: "",
            newHint: "",
            newPostRadius: 50,
          }
        });
      } else {
        return setState(prevState => {
          return {
            ...prevState,
            view: "new-name-hunt",
          }
        });
      }
    } catch (error) {
      console.log("Dette er consolen ", error);
    }
    startView();
  };

  const addNewPost = () => {
    setState(prevState => {
      return {
        ...prevState,
        view: "add-post",
      }
    });
  };

  const addFinalMessage = (finalMessage) => {
    setState(prevState => {
      return {
        ...prevState,
        newFinalMessage: finalMessage,
      }
    });
  };

  const containerStyle = {
    width: "100%",
    height: "50%",
  };

  let centerPosition = state.creatorPosition.lat
    ? state.creatorPosition
    : { lat: 59.911237964049626, lng: 10.750340656556627 };

  return (
    <section className="create-view">
      {state.view === "name-hunt" && (
        <NameHuntPage
          handleInputChange={handleInputChange}
          createPosts={createPosts}
        />
      )}

      {state.view === "add-post" && (
        <div className="add-post-view">
          <h3>Select a location for your post</h3>

          <LoadScript googleMapsApiKey={MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centerPosition}
              zoom={16}
              onClick={handleMapClick}
              clickableIcons={false}
            >
              {state.newMarkerPosition && (
                <Marker
                  position={state.newMarkerPosition}
                  // icon={"https://i.ibb.co/RTzGNSd/Star-skype.png"}
                  icon={"https://i.ibb.co/j8NcQ4C/Star-black-outline.png"}
                  // scaledSize={{width: 40, height: 40}}
                  // anchor={{x: 20, y: 20}}
                />
              )}

              {state.newHuntLocations.map((post) => {
                return (
                  <Marker
                    key={post.index}
                    position={post.coordinates}
                    // icon={"https://i.ibb.co/RTzGNSd/Star-skype.png"}
                    icon={"https://i.ibb.co/j8NcQ4C/Star-black-outline.png"}
                    label={`${post.index}`}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>

          <NewPostInfo
            handleInputChange={handleInputChange}
            handleSavePost={handleSavePost}
            newPostRadius={state.newPostRadius}
          />
        </div>
      )}

      {state.view === "post-saved" && (
        <PostSavedPage
          addNewPost={addNewPost}
          addFinalMessage={addFinalMessage}
          handleInputChange={handleInputChange}
          handleSubmitNewHunt={handleSubmitNewHunt}
        />
      )}

      {state.view === "new-name-hunt" && (
        <InvalidHuntNamePage
          handleInputChange={handleInputChange}
          handleSubmitNewHunt={handleSubmitNewHunt}
        />
      )}
    </section>
  );
};

export default CreatePage;
