import React from 'react';
import ReactStreetview from 'react-streetview';

export const StreetView = ({ apiKey, lat, lng }) => {
    const options = {
        position: {lat: lat, lng: lng},
        pov: {heading: 100, pitch: 0},
		zoom: 1
    };
    return(
        <div style={{
            width: '310px',
            height: '240px',
            backgroundColor: '#eeeeee',
            position: 'relative',
            right: "150px"
        }}>
            <ReactStreetview
                apiKey={apiKey}
                streetViewPanoramaOptions={options}
            />
        </div>
    );
};