import React from 'react';

export const Views = ({ restaurants }) => 
    <>
        {restaurants.map((restaurant, i) => 
            <ul id={"views" + restaurant.restaurantName}
                className="views-restaurant"
                style={{display: "none"}} key={i}>
                {restaurant.ratings.map((rating, j) =>
                    <li key={j}>
                        {rating.comment}<br />
                        Note : {rating.stars}
                    </li>
                )}
            </ul>
        )}
    </>