import React, { Component } from 'react';
import { RestaurantMap } from './RestaurantMap';
import { UserMap } from './UserMap';
import GoogleMapReact  from 'google-map-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: null,
      zoom: 7,
      streetView: false,
      clickMarker: false
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
      return <p className="ml-2">Chargement en cours...</p>;
    }
    return (
      <div id="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}>
          <UserMap lat={this.state.center.lat} lng={this.state.center.lng} />
          {this.props.restaurants.map((restaurant, i) =>
            <RestaurantMap apiKey={this.props.apiKey} key={i}
              lat={restaurant.lat} lng={restaurant.lng}
              text={restaurant.restaurantName}/>)}
        </GoogleMapReact>
      </div>
    );
  }
}