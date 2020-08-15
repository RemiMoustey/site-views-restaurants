import React, { Component } from 'react';
import GoogleMapReact  from 'google-map-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      zoom: 7
    }
  }

  componentDidMount = () => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setTimeout(() => {
          this.setState({
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          })
        }, 1000);
      });
    } else {
      console.error("Erreur : impossible de détemriner votre position.");
    }
  }

  render = () => {
    if(this.state.center === null) {
      return (
        <p className="ml-2">Chargement en cours...</p>
      );
    }
    return (
      <div id="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC7gHF4noGLTnBRfnHvQqmKU6GtK6D-ggM' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        />
      </div>
    );
  }
}