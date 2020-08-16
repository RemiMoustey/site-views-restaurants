import React from 'react';

const averageRatings = (ratings) => {
    let total = 0;
    for(let i = 0; i < ratings.length; i++) {
        total += ratings[i].stars;
    }
    return total / ratings.length;
}

export const ListRestaurants = ({restaurants, mapBounds, min, max}) => ( 
    mapBounds !== null &&
    <ul id="list" className="mr-3">{restaurants.map((restaurant, i) => 
        restaurant.lat > mapBounds.se.lat && restaurant.lat > mapBounds.sw.lat &&
        restaurant.lat < mapBounds.ne.lat && restaurant.lat < mapBounds.nw.lat &&
        restaurant.lng > mapBounds.nw.lng && restaurant.lng > mapBounds.sw.lng &&
        restaurant.lng < mapBounds.ne.lng && restaurant.lng < mapBounds.se.lng &&
        (averageRatings(restaurant.ratings) >= min || min === "")
        && (averageRatings(restaurant.ratings) <= max || max === "") &&
        <li className="mb-3" key={i}>
            <span id={"restaurant" + i} className="text-underline">
                {restaurant.restaurantName}
            </span>
            <br />
            Moyenne : {averageRatings(restaurant.ratings).toFixed(2)}
        </li>)}
    </ul>
);