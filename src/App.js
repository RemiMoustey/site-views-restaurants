import React, { Component } from 'react';
import { MapContainer } from './App/MapContainer';
import { Views } from './App/Views';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
      isLoading: true,
      error: null
    };
  }

  componentDidMount = () => {
    if(this.state.data === null) {
      let restaurants = null;
      this.setState({isLoading: true});
      fetch(this.props.apiURL)
      .then(response => {
          if(response.ok) {
              return response.json();
          } else {
              throw new Error("Erreur lors du chargement de la liste des restaurants");
          }
      })
      .then(data => {
        restaurants = data;
        console.log(restaurants)
        let initialLength = restaurants.length + 1;

        for(let i = initialLength; sessionStorage.getItem("restaurant" + i) !== null; i++) {
          let restaurant = JSON.parse(sessionStorage.getItem("restaurant" + i));
          restaurant.lat = parseFloat(restaurant.lat);
          restaurant.lng = parseFloat(restaurant.lng);
          console.log(restaurant)
          restaurants.push(restaurant);
        }
        this.setState({ data: restaurants, isLoading: false });
      })
      .catch(error => this.setState({ error }));
    }
  }

  handleChangeMapContainer = e => {
    console.log(e)
    this.setState({data: e})
  }
  
  render = () => {
    if(this.state.isLoading) {
      return(null);
    }

    return (
      <div className="container">
        <h1 className="text-center">Site d'avis de restaurants</h1>
        <div>
          <MapContainer apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} restaurants={this.state.data} onRestaurantsChange={this.handleChangeMapContainer} />
        </div>
        <div id="views" style={{display: "none"}}>
          <Views restaurants={this.state.data} />
        </div>
      </div>
    );
  }
}