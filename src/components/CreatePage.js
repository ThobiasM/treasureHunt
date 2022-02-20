import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MAPS_API_KEY from "../config";

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
      newHint: ''
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
    let clickLat = parseFloat(e.latLng.lat().toFixed(14));
    let clickLng = parseFloat(e.latLng.lng().toFixed(14));
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

  handleSaveNewHunt() {
    if (this.state.newHuntName) {
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

  addNewPost() {
    this.setState({
      view: 'add-post',
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
    if (this.state.newHuntLocations.length > 0) {
      console.log('NEW HUNT LOCATIONS', this.state.newHuntLocations);
    }

    const containerStyle = {
      width: "100%",
      height: "70%",
    };

    return (
      <section className='create-view'>
        {this.state.view === 'name-hunt' &&
          <div className={'name-hunt-view'}>
            <h2>Name your new treasure hunt:</h2>
            <input onChange={(e) => this.handleInputChange(e)} name={'newHuntName'} placeholder={"E.g. 'My favorite benches'"}></input>
            <button onClick={() => this.handleSaveNewHunt()}>Save and add posts</button>
          </div>
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

            <div className="new-post-info">
              <label>
                Post name: 
                <input onChange={(e) => this.handleInputChange(e)} name={'newPostName'} placeholder="E.g. 'Bakery'"></input>
              </label>
              
              <label>
                Hint: 
                <input onChange={(e) => this.handleInputChange(e)} name={'newHint'} maxLength={500} placeholder={"Max 500 characters"}></input>
              </label>

              <button onClick={() => this.handleSavePost()}>Save post</button>
            </div>
          </div>
        }

        {this.state.view === 'post-saved' &&
          <div className="post-saved-view">
            <h2>Post saved!</h2>
            <button onClick={() => this.addNewPost()}>Add another post</button>
            <button>Finish and submit hunt</button>
          </div>
        }

      </section>
    )
  }
}

export default CreatePage;




