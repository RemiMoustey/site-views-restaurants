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
      max: 5,
      name: null,
      view: null,
      isDoingAddRestaurant: false,
      latitude: null,
      longitude: null,
      address: null,
      postalCode: null,
      town: null,
      restaurantName: null
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

  handleMinChange = minimum => this.setState({min: minimum});

  handleMaxChange = maximum => this.setState({max: maximum});

  handleNameChange = name => this.setState({name: name});

  handleViewChange = view => this.setState({view: view});

  handleLatitudeChange = latitude => this.setState({latitude: latitude});

  handleLongitudeChange = longitude => this.setState({longitude: longitude});

  handleRestaurantNameChange = restaurantName => {
    this.setState({restaurantName: restaurantName});
    this.verifyInput('restaurant-name', /./, "Format incorrect.");
    this.verifyAllForm();
  }

  handleAddressChange = address => {
    this.setState({address: address});
    this.verifyInput('address', /./, "Format incorrect.");
    this.verifyAllForm();
  }

  

  handlePostalCodeChange = postalCode => {
    this.setState({postalCode: postalCode});
    this.verifyInput('postal-code', /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/, "Veuillez saisir un code postal valide.");
    this.verifyAllForm();
  }

  handleTownChange = town => {
    this.setState({town: town});
    this.verifyInput('town', /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]*([-'\s]|[a-zA-ZéèîïÉÈÎÏ]|[a-zéèêàçîï])*$/, "Format incorrect. Caractères autorisées : lettres, espaces, apostrophes et tirets.");
    this.verifyAllForm();
  }

  averageRatings = ratings => {
    let total = 0;
    for(let i = 0; i < ratings.length; i++) {
        total += ratings[i].stars;
    }
    return total / ratings.length;
  }

  verifyAllForm = () => {
    if(document.querySelectorAll(".alert-danger").length === 0) {
      document.getElementById("button-form-addition").removeAttribute("disabled");
    } else {
      document.getElementById("button-form-addition").setAttribute("disabled", "");
    }
  }

  onClickAddition = () => {
    document.getElementById("button-addition").style.display = "none";
    document.getElementById("button-leave-addition").style.display = "block";
    document.getElementById("text-addition").style.visibility = "visible";
    this.setState({isDoingAddRestaurant: true});
  }

  onClickLeaveAddition = () => {
    document.getElementById("button-addition").style.display = "block";
    document.getElementById("button-leave-addition").style.display = "none";
    document.getElementById("text-addition").style.visibility = "hidden";
    document.getElementById("form-addition-restaurant").style.display = "none";
    document.getElementById("views").style.marginTop = "100px";
    this.setState({isDoingAddRestaurant: false});
  }

  onClickMap = e => {
    if(!this.state.isDoingAddRestaurant) {
      return;
    }
    let coordinates = {
      lat: e.lat,
      lng: e.lng
    }
    document.getElementById("latitude").value = coordinates.lat;
    document.getElementById("longitude").value = coordinates.lng;
    document.getElementById("form-addition-restaurant").style.display = "block";
    document.getElementById("views").style.marginTop = "420px";
    console.log(e)
  }

  verifyInput = (name, regex, message) => {
    this.verifyText(name, regex, message); /* Source : https://jsbin.com/juhako/194/edit?html,output */
  }

  verifyText = (id, regex, message) => {
    if (document.querySelectorAll('.' + id + '-alert').length !== 0) {
      document.querySelector('.' + id + '-alert').remove();
    }
    if (document.getElementById(id).required || document.getElementById(id).value !== "")
    {
        if (document.getElementById(id).validity.valueMissing) {   
            this.addError(id, "Élément manquant");
        } else if (regex.test((document.getElementById(id).value)) === false) {
            this.addError(id, message);
        }
    }
  }

  addError = (name, error) => {
    if (document.querySelector("." + name) !== null) {
        document.querySelector('.alert').remove();
    }
    let divError = document.createElement("div");
    divError.classList.add("current-error");
    document.querySelector('#group-' + name).append(divError);
    document.querySelector('.current-error').classList.add('alert');
    document.querySelector('.current-error').classList.add('alert-danger');
    document.querySelector('.current-error').classList.add(name + "-alert");
    document.querySelector('.current-error').textContent = error;
    document.querySelector('.current-error').classList.remove('current-error');
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render = () => {
    if(this.state.center === null) {
      return (<p className="ml-2">Chargement en cours...</p>);
    }
    return (
      <>
        <section id="list-restaurants">
          <Filter min={this.state.min} onMinChange={this.handleMinChange}
          max={this.state.max} onMaxChange={this.handleMaxChange}
          name={this.state.name} onNameChange={this.handleNameChange}
          view={this.state.view} onViewChange={this.handleViewChange} />
          
        </section>
        <section id="map-list" className="d-lg-flex text-center">
          <ListRestaurants restaurants={this.props.restaurants} mapBounds={this.state.bounds}
          min={this.state.min} max={this.state.max} />
          <div id="map" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: this.props.apiKey }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              onChange={this.onChange}
              onClick={this.onClickMap}>
              <UserMap lat={this.state.center.lat} lng={this.state.center.lng} />
              {this.props.restaurants.map((restaurant, i) => this.state.bounds !== null &&
              (this.averageRatings(restaurant.ratings) >= this.state.min || this.state.min === "") &&
              (this.averageRatings(restaurant.ratings) <= this.state.max || this.state.max === "") &&
                <RestaurantMap apiKey={this.props.apiKey} key={i} index={i}
                  lat={restaurant.lat} lng={restaurant.lng}
                  text={restaurant.restaurantName} mapBounds={this.state.bounds} />)}
            </GoogleMapReact>
            <div id="addition-restaurant" className="my-1">
              <button id="button-addition" type="button" onClick={this.onClickAddition}>Ajouter un restaurant</button>
              <button id="button-leave-addition" type="button" style={{display: "none"}} onClick={this.onClickLeaveAddition}>Quitter le mode d'ajout</button>
              <p id="text-addition" style={{color: "red", visibility: "hidden"}}>Cliquez sur la carte pour ajouter un restaurant.</p>
              <form method="post" action="#" id="form-addition-restaurant" style={{display: "none"}} onSubmit={this.handleSubmit}>
                <div className="form-group" id="group-latitude">
                  <label htmlFor="latitude" className="mr-1">Latitude :</label>
                  <input type="number" name="latitude" id="latitude" disabled required onChange={this.handleLatitudeChange} />
                </div>
                <div className="form-group" id="group-longitude">
                  <label htmlFor="longitude" className="mr-1">Longitude :</label>
                  <input type="number" name="longitude" id="longitude" disabled required onChange={this.handleLongitudeChange} />
                </div>
                <div className="form-group" id="group-restaurant-name">
                  <label htmlFor="restaurant-name" className="mr-1">Nom du restaurant :</label>
                  <input type="text" name="restaurant-name" id="restaurant-name" required onChange={this.handleRestaurantNameChange} />
                </div>
                <div className="form-group" id="group-address">
                  <label htmlFor="address" className="mr-1">Adresse :</label>
                  <input type="text" name="address" id="address" required onChange={this.handleAddressChange} />
                </div>
                <div className="form-group" id="group-postal-code">
                  <label htmlFor="postal-code" className="mr-1">Code postal :</label>
                  <input type="number" name="postal-code" id="postal-code" required onChange={this.handlePostalCodeChange} />
                </div>
                <div className="form-group" id="group-town">
                  <label htmlFor="town" className="mr-1">Ville :</label>
                  <input type="text" name="town" id="town" required onChange={this.handleTownChange} />
                </div>
                <input type="submit" id="button-form-addition" value="Ajouter le restaurant" />
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}