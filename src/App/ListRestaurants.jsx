import React from 'react';

export const ListRestaurants = ({restaurants, mapBounds, min, max}) => {

    const averageRatings = (ratings, indexRestaurant) => {
        let ratingsSession = JSON.parse(sessionStorage.getItem("addedViews" + indexRestaurant));
        ratings = pushRating(ratingsSession, ratings);
        let total = 0;
        for(let i = 0; i < ratings.length; i++) {
            total += ratings[i].stars;
        }
        return total / ratings.length;
    }

    const isRatingAlreadyPresent = (ratingsSession, initialRatings) => {
        for(let presentRating of initialRatings) {
            if(JSON.parse(ratingsSession).comment === presentRating.comment) {
                return true;
            }
        }
        return false;
    }

    const pushRating = (ratingsSession, arrayRatings) => {
        for(let ratingSession of ratingsSession) {
            if(!isRatingAlreadyPresent(ratingSession, arrayRatings)) {
                arrayRatings.push(JSON.parse(ratingSession));
            }
        }
        return arrayRatings;
    }

    return ( 
        mapBounds !== null &&
        <div id="list" className="d-flex flex-column">
            <h2>Les restaurants</h2>
            <ul id="list" className="list-group list-group-flush">{restaurants.map((restaurant, i) => 
                restaurant.lat > mapBounds.se.lat && restaurant.lat > mapBounds.sw.lat &&
                restaurant.lat < mapBounds.ne.lat && restaurant.lat < mapBounds.nw.lat &&
                restaurant.lng > mapBounds.nw.lng && restaurant.lng > mapBounds.sw.lng &&
                restaurant.lng < mapBounds.ne.lng && restaurant.lng < mapBounds.se.lng &&
                (averageRatings(restaurant.ratings, i) >= min || min === "")
                && (averageRatings(restaurant.ratings, i) <= max || max === "") &&
                <li className="mr-2 list-group-item" key={i}>
                    <span id={"restaurant" + i} className="text-underline">
                        {restaurant.restaurantName}
                    </span>
                    <br />
                    Moyenne : <span id={"average" + i}>
                        {averageRatings(restaurant.ratings, i).toFixed(2)}
                    </span>
                </li>)}
            </ul>
        </div>
    );
}