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
      <>
        <div className="d-lg-flex justify-content-around">
          <MapContainer apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} restaurants={this.state.data} />
        </div>
        <div id="views">
          <Views restaurants={this.state.data} />
        </div>
      </>
    );
  }
}