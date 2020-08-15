import React from 'react';
 
export const ListRestaurants = ({restaurants}) => (
        <ul>{restaurants.map((listValue, i) => 
            <li key={i}>{listValue.restaurantName}</li>)}
        </ul>
    );