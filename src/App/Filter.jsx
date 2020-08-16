import React, { Component } from 'react';

export class Filter extends Component {

    handleMinChange = (e) => this.props.onMinChange(e.target.value);

    handleMaxChange = (e) => this.props.onMaxChange(e.target.value);

    render = () => (
        <form>
            <p>Filtrer par notes</p>
            <label htmlFor="min">Minimum :</label>
            <input className="ml-1" type="number" name="min" id="min" min="1" max="5"
            value={this.props.min} onChange={this.handleMinChange} /><br />
            <label htmlFor="max">Maximum : </label>
            <input className="ml-1" type="number" name="max" id="max" min="1" max="5"
            value={this.props.max} onChange={this.handleMaxChange} />
        </form>
    );
}