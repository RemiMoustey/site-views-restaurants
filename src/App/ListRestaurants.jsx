import React from 'react';

const averageRatings = (ratings) => {
    let total = 0;
    for(let i = 0; i < ratings.length; i++) {
        total += ratings[i].stars;
    }
    return total / ratings.length;
}
 
export const ListRestaurants = ({restaurants}) => (
        <ul>{restaurants.map((restaurant, i) => 
            <li className="mb-3" key={i}>
                {restaurant.restaurantName}<br />
                Moyenne : {averageRatings(restaurant.ratings)}
            </li>)}
        </ul>
    );