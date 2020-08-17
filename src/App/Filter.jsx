import React, { Component } from 'react';

export class Filter extends Component {

    handleMinChange = (e) => this.props.onMinChange(e.target.value);

    handleMaxChange = (e) => this.props.onMaxChange(e.target.value);

    render = () => (
        <form className="text-center">
            <h2>Filtrer par notes</h2>
            <div className="form-group">
                <label htmlFor="min" className="mr-1">Minimum :</label>
                <input type="number" name="min" id="min" min="1" max="5"
                value={this.props.min} onChange={this.handleMinChange} />
            </div>
            <div className="form-group">
                <label htmlFor="max" className="mr-1">Maximum : </label>
                <input type="number" name="max" id="max" min="1" max="5"
                value={this.props.max} onChange={this.handleMaxChange} />
            </div>
        </form>
    );
}