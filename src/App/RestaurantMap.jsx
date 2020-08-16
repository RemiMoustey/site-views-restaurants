import React, { useState, useEffect, useRef } from 'react';
import { StreetView } from './StreetView';

export const RestaurantMap = ({ apiKey, index, lat, lng, text }) => {
    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => document.addEventListener("click", handleClickOutside), []);

    const handleClick = () => {
        setIsVisible(b => !b);
        document.querySelectorAll(".views-restaurant").forEach((views) => {
            views.style.display = "none";
        });
        document.querySelector("#views-restaurant" + index).style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    }

    const handleClickOutside = (event) => {
        if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(() => false);
        }
    }

    return <>
        <p><span id={"restaurant" + index} className="marker" style={{backgroundColor: "green", color: "white", cursor: "pointer"}} onClick={handleClick} ref={wrapperRef}>{text}</span></p>
        { isVisible && <StreetView apiKey={apiKey} lat={lat} lng={lng} />}
    </>
}