import React, { Component,Fragment } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

//import CurrentLocation from './Map';
export const GetInfoWindowString = (props) => {
  debugger;
  return(
    <Fragment>
      <div style={{ fontSize: '16px' }}>
        {props.info.name}
      </div>
      <div style={{ fontSize: '18px' }}>
        <span style={{ color: 'grey' }}>
        {props.info.rating}
        </span>        
        <span style={{ color: 'orange' }}>{String.fromCharCode(9733).repeat(Math.floor(props.info.rating))}</span><span style={{ color: 'lightgrey' }}>{String.fromCharCode(9733).repeat(5 - Math.floor(props.info.rating))}</span>
      </div>      
    </Fragment>
  )
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {
      name:'',
      rating:0,
    },
    markers:[],
    initialCenter:{
      lat: 34.091158,
      lng: -118.2795188
     }
  };

  onMarkerClick = (props, marker, e) =>{
    debugger;
    return(
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  )};

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  componentDidMount(){
    this.setState({markers: 
      [
        {
          "formatted_address": "3818 Sunset Blvd, Los Angeles, CA 90026, USA",
          "userType": "TS",
          "name": "Flore Vegan",
          "rating": 4.6,
          "location": {
            "lat": 34.091158,
            "lng": -118.2795188
          }
        },
        {
          "formatted_address": "1700 Sunset Blvd, Los Angeles, CA 90026, USA",
          "userType": "TS",
          "name": "Sage Plant Based Bistro and Brewery Echo Park",
          "rating": 4.6,
          "location": {
            "lat": 34.0771192,
            "lng": -118.2587199
          }
        },
        {
          "formatted_address": "8284 Melrose Ave, Los Angeles, CA 90046, USA",
          "userType": "S",
          "name": "Sage Plant Based Bistro and Brewery Echo Park",
          "rating": 4.6,
          "location": {
            "lat": 34.083527,
            "lng": -118.370157
          }
        },
        {
          "formatted_address": "4319 Sunset Blvd, Los Angeles, CA 90029, USA",
          "userType": "S",
          "name": "Sage Plant Based Bistro and Brewery Echo Park",
          "rating": 4.6,
          "location": {
            "lat": 34.0951843,
            "lng": -118.283107
          }
        }
      ]
});


  const directionsService = this.props.google.maps.DirectionsService();

  const origin = { lat: 40.756795, lng: -73.954298 };
  const destination = { lat: 41.756795, lng: -78.954298 };

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: this.props.google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === this.props.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    }
  );
}
  
  render() {
    const TSMarker ="http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
    const SupplierMarker ="http://maps.google.com/mapfiles/kml/paddle/blu-blank.png";
    return (
      <div style={{ height: '100vh', width: '100%' }}>
      <Map google={this.props.google} zoom={12}  initialCenter={{
         lat: this.state.initialCenter.lat,
         lng:this.state.initialCenter.lng
        }}>
          {this.state.markers.map((marker,i) => {
              debugger;
              return(
              <Marker
              key={i}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
              icon={marker.userType ==='TS' ? TSMarker : SupplierMarker }
              onClick={this.onMarkerClick}
              label={marker.userType}             
              name={marker.name}
              rating={marker.rating}            
             /> 
           ) })
         }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
        <GetInfoWindowString info={this.state.selectedPlace} />
        
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDZSVnT-Oaft2Stx72a_OG0DN8_Z-9-d48'
})(MapContainer);