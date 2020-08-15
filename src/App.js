import React, { Component } from 'react';
import { MapContainer } from './App/MapContainer';
import { ListRestaurants } from './App/ListRestaurants';
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
    this.setState({isLoading: true});
    fetch(this.props.apiURL)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Erreur lors du chargement de la liste des restaurants");
        }
    })
    .then(data => this.setState({ data: data, isLoading: false }))
    .catch(error => this.setState({ error }));
  }
  
  render = () => {
    if(this.state.isLoading) {
      return(null);
    }
    return (
      <div className="d-lg-flex justify-content-around">
        <ListRestaurants restaurants={this.state.data} />
        <MapContainer apiKey="AIzaSyC7gHF4noGLTnBRfnHvQqmKU6GtK6D-ggM" restaurants={this.state.data} />
      </div>
    );
  }
}