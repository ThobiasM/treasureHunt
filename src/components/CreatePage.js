import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MAPS_API_KEY from "../config";
import NameHuntPage from "./NameHuntPage";
import PostSavedPage from "./PostSavedPage";
import NewPostInfo from "./NewPostInfo";
const API_URL = 'https://treasurehunt-backend.herokuapp.com'

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      view: 'name-hunt',
      newHuntName: '',
      newHuntLocations: [],
      creatorPosition: {},
      newMarkerPosition: {},
      newPostName: '',
      newPostIndex: 1,
      newHint: '',
      newFinalMessage: '',
    }
  }

  async componentDidMount() {
    const creatorPosition = await this.getCreatorPosition();

    this.setState({
      creatorPosition,
    })
  }

  async getCreatorPosition() {
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

    return {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude,
    }
  }

  handleMapClick(e) {
    console.log('CLICKED MAP');
    let clickLat = parseFloat(e.latLng.lat().toFixed(6));
    let clickLng = parseFloat(e.latLng.lng().toFixed(6));
    let markerPosition = {lat: clickLat, lng: clickLng};
    console.log(markerPosition);

    this.setState({
      newMarkerPosition: markerPosition,
    })
  }

  handleInputChange(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  async handleSaveNewHunt() {
    if (this.state.newHuntName) {
      const newHuntName = this.state.newHuntName;

      let newSubmittedHunt = await fetch(`${API_URL}/allhunts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newHuntName: this.state.newHuntName }),
      });

      this.setState({
        view: 'add-post',
      })
    }
  }

  handleSavePost() {
    console.log(this.state.newMarkerPosition, this.state.newPostName, this.state.newHint)
    if (this.state.newMarkerPosition.lat && this.state.newPostName && this.state.newHint) {
      const newPost = {
        post_name: this.state.newPostName,
        radius: 50,
        hint: this.state.newHint,
        coordinates: this.state.newMarkerPosition,
        index: this.state.newPostIndex,
      }

      console.log(newPost);

      

      this.setState({
        view: 'post-saved',
        newHuntLocations: [...this.state.newHuntLocations, newPost],
        newPostIndex: this.state.newPostIndex + 1,
        newMarkerPosition: {},
        newPostName: '',
        newHint: '',
      })
    }
  }

  async handleSubmitNewHunt() {
    if(this.state.newHuntLocations.length > 0) {
      await fetch(`${API_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          huntName: this.state.newHuntName,
          huntLocations: this.state.newHuntLocations 
        }),
      });

      this.setState({
        newHuntLocations: [],
        newPostIndex: 1,
        newMarkerPosition: {},
        newPostName: '',
        newHint: '',
        view: "start",
      })
    }
  }

  addNewPost() {
    this.setState({
      view: 'add-post',
    })
  }

  addFinalMessage(finalMessage) {
    this.setState({
      newFinalMessage: finalMessage,
    })
  }

  // post_id: location.post_id,
// post_name: location.post_name,
// radius: location.radius,
// hint: location.hint,
// isFound: false,
// coordinates: {
//   lat: parseFloat(location.lat),
//   lng: parseFloat(location.lng),
// }
  
  render() {
    const containerStyle = {
      width: "100%",
      height: "50%",
    };

    return (
      <section className='create-view'>
        {this.state.view === 'name-hunt' &&
          <NameHuntPage
            handleInputChange={this.handleInputChange.bind(this)}
            handleSaveNewHunt={this.handleSaveNewHunt.bind(this)}
          />
        }

        {this.state.view === 'add-post' &&
          <div className="add-post-view">
            <h3>Select a location for your post</h3>

            <LoadScript googleMapsApiKey={MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={this.state.creatorPosition}
                zoom={16}
                onClick={this.handleMapClick.bind(this)}
                clickableIcons={false}
              >

                {this.state.newMarkerPosition && <Marker
                  position={this.state.newMarkerPosition}
                  icon={"https://i.ibb.co/RTzGNSd/Star-skype.png"}
                  // scaledSize={{width: 40, height: 40}}
                  // anchor={{x: 20, y: 20}}
                /> }

                {this.state.newHuntLocations.map(post => {
                  return <Marker
                    key={post.index}
                    position={post.coordinates}
                    icon={"https://i.ibb.co/RTzGNSd/Star-skype.png"}
                    label={`${post.index}`}
                  />
                })}

              </GoogleMap>
            </LoadScript>

            <NewPostInfo
              handleInputChange={this.handleInputChange.bind(this)}
              handleSavePost={this.handleSavePost.bind(this)}
            />
          </div>
        }

        {this.state.view === 'post-saved' &&
          <PostSavedPage
            addNewPost={this.addNewPost.bind(this)}
            addFinalMessage={this.addFinalMessage.bind(this)}
            handleInputChange={this.handleInputChange.bind(this)}
            handleSubmitNewHunt={this.handleSubmitNewHunt.bind(this)}
          />
        }

      </section>
    )
  }
}

export default CreatePage;




