import React, {useState} from 'react';

const averageRatings = (ratings) => {
    let total = 0;
    for(let i = 0; i < ratings.length; i++) {
        total += ratings[i].stars;
    }
    return total / ratings.length;
}
 
export const ListRestaurants = ({restaurants}) => {

    const handleClick = (e) => {
        document.querySelectorAll(".views-restaurant").forEach((views) => {
            views.style.display = "none";
        });
        document.querySelector("#views" + e.target.id).style.display = "block";
    }

    return (
        <ul id="list">{restaurants.map((restaurant, i) => 
            <li className="mb-3" key={i}>
                <span id={restaurant.restaurantName} 
                style={{cursor: "pointer", textDecoration: "underline"}}
                className="text-underline" onClick={handleClick}>
                    {restaurant.restaurantName}
                </span>
                <br />
                Moyenne : {averageRatings(restaurant.ratings)}
            </li>)}
        </ul>
    );
}