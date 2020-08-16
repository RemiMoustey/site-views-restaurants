import React, { useState, useEffect, useRef } from 'react';
import { StreetView } from './StreetView';

export const RestaurantMap = ({ apiKey, lat, lng, text }) => {
    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => document.addEventListener("click", handleClickOutside), []);

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    const handleClickOutside = (event) => {
        if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    }

    return <>
        <p><span style={{backgroundColor: "green", color: "white", cursor: "pointer"}} onClick={handleClick} ref={wrapperRef}>{text}</span></p>
        { isVisible && <StreetView apiKey={apiKey} lat={lat} lng={lng} />}
    </>
}