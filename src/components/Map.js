import React from "react";
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import hunt from "../Hunts";
import MaterialIcon, {colorPalette} from 'material-icons-react';
// import MAPS_API_KEY from "../../config";

const containerStyle = {
    width: '500px',
    height: '800px'
};
  
const center = {
    lat: 59.94960397066376,
    lng: 10.765730007626226
};


class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            location: hunt.locations[0].coordinates,
            currentPosition: undefined,
        }
    }
    async componentDidMount(){
        let currentPosition = await new Promise(function (resolve, reject) {
            navigator
            .geolocation
            .getCurrentPosition(function (position) {
              resolve(position);
            }, function (error) {
              reject(error);
            });
          })

        this.setState({
            currentPosition: {
                lat: currentPosition.coords.latitude, 
                lng: currentPosition.coords.longitude
            }
        })
    }
    

    render() {
        return (
          <LoadScript
            // googleMapsApiKey={MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
            {
                hunt.locations.map((post) => {
                    return (
                        <Marker 
                            key={post.post_id}
                            position={post.coordinates}
                            label={`${post.post_id}`}
                        />
                    )
                })
            }
                {/* <OverlayView
                position={this.state.position}
                mapPaneName={OverlayView.MARKER_LAYER}>
                <img className='userPositionMarker'src='https://img.icons8.com/doodle/344/homer-simpson.png' alt='homer'/>
                </OverlayView> */}

            </GoogleMap>
          </LoadScript>
        )
    }
}

export default Map;