import React from 'react';

export const Views = ({ restaurants }) => 
    <>
        {restaurants.map((restaurant, i) => 
            <ul id={"views-restaurant" + i}
                className="views-restaurant"
                style={{display: "none"}} key={i}>
                {restaurant.ratings.map((rating, j) =>
                    <li key={j} className="mb-2">
                        {rating.comment}<br />
                        Note : {rating.stars}
                    </li>
                )}
            </ul>
        )}
    </>