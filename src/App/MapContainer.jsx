import React, { Component } from 'react';
import { RestaurantMap } from './RestaurantMap';
import { UserMap } from './UserMap';
import { ListRestaurants } from './ListRestaurants';
import { Filter } from './Filter';
import GoogleMapReact  from 'google-map-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: null,
      zoom: 7,
      streetView: false,
      clickMarker: false,
      bounds: null,
      min: 1,
      max: 5   
    }
  }

  componentDidMount = () => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
          this.setState({
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          })
        });
  
    } else {
      console.error("Erreur : impossible de détemriner votre position.");
    }
  }

  onChange = ({ bounds }) => {
    this.setState({bounds: bounds});
  }

  handleMinChange = (minimum) => this.setState({min: minimum});

  handleMaxChange = (maximum) => this.setState({max: maximum});

  averageRatings = (ratings) => {
    let total = 0;
    for(let i = 0; i < ratings.length; i++) {
        total += ratings[i].stars;
    }
    return total / ratings.length;
  }

  render = () => {
    if(this.state.center === null) {
      return <p className="ml-2">Chargement en cours...</p>;
    }
    return (
      <>
        <Filter min={this.state.min} onMinChange={this.handleMinChange}
        max={this.state.max} onMaxChange={this.handleMaxChange} />
        <ListRestaurants restaurants={this.props.restaurants} mapBounds={this.state.bounds}
        min={this.state.min} max={this.state.max} />
        <div id="map" style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.apiKey }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onChange={this.onChange}>
            <UserMap lat={this.state.center.lat} lng={this.state.center.lng} />
            {this.props.restaurants.map((restaurant, i) => this.state.bounds !== null &&
            (this.averageRatings(restaurant.ratings) >= this.state.min || this.state.min === "") &&
            (this.averageRatings(restaurant.ratings) <= this.state.max || this.state.max === "") &&
              <RestaurantMap apiKey={this.props.apiKey} key={i} index={i}
                lat={restaurant.lat} lng={restaurant.lng}
                text={restaurant.restaurantName} mapBounds={this.state.bounds} />)}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}