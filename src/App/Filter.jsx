import React, { Component } from 'react';

export class Filter extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onMinChange(parseInt(e.target.elements.min.value));
        this.props.onMaxChange(parseInt(e.target.elements.max.value));
    }

    handleMinChange = (e) => this.props.onMinChange(e.target.value);

    handleMaxChange = (e) => this.props.onMaxChange(e.target.value);

    render = () => (
        <form method="post" action="#" onSubmit={this.handleSubmit}>
            <p>Filtrer par notes</p>
            <label htmlFor="min">Minimum : </label>
            <input type="number" name="min" id="min" min="1" max="5"
            value={this.props.min} onChange={this.handleMinChange} />
            <label htmlFor="max">Maximum : </label>
            <input type="number" name="max" id="max" min="1" max="5"
            value={this.props.max} onChange={this.handleMaxChange} />
            <button type="submit" style={{cursor: "pointer"}}>Filtrer</button>
        </form>
    );
}