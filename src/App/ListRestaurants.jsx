import React from 'react';

export const ListRestaurants = ({restaurants, mapBounds, min, max}) => {

    const averageRatings = (restaurant, indexRestaurant) => {
        let ratings = [];
        if(restaurant.ratings.length !== 0) {
            for(let rating of restaurant.ratings) {
                ratings.push(rating);
            }
        }
        const ratingsSession = JSON.parse(sessionStorage.getItem("addedViews" + indexRestaurant));
        if(restaurant.ratings.length !== 0 || ratingsSession !== null) {
            ratings = pushRating(ratingsSession, ratings);
            let total = 0;
            for(let i = 0; i < ratings.length; i++) {
                total += ratings[i].stars;
            }
            return (total / ratings.length).toFixed(2);
        }
        return "Pas de note";
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
        if(ratingsSession !== null) {
            for(let ratingSession of ratingsSession) {
                if(!isRatingAlreadyPresent(ratingSession, arrayRatings)) {
                    arrayRatings.push(JSON.parse(ratingSession));
                }
            }
        }
        return arrayRatings;
    }

    return ( 
        mapBounds !== null &&
        <div id="list" className="d-flex flex-column mr-2">
            <h2>Les restaurants</h2>
            <ul id="list" className="list-group list-group-flush">{restaurants.map((restaurant, i) => 
                restaurant.lat > mapBounds.se.lat && restaurant.lat > mapBounds.sw.lat &&
                restaurant.lat < mapBounds.ne.lat && restaurant.lat < mapBounds.nw.lat &&
                restaurant.lng > mapBounds.nw.lng && restaurant.lng > mapBounds.sw.lng &&
                restaurant.lng < mapBounds.ne.lng && restaurant.lng < mapBounds.se.lng &&
                (averageRatings(restaurant, i) === "Pas de note" || averageRatings(restaurant, i) >= parseFloat(min).toFixed(2) || min === "") &&
                (averageRatings(restaurant, i) === "Pas de note" || averageRatings(restaurant, i) <= parseFloat(max).toFixed(2) || max === "") &&
                <li className="mr-2 list-group-item" key={i}>
                    <span id={"restaurant" + i} className="text-underline">
                        {restaurant.restaurantName}
                    </span>
                    <br />
                    Moyenne : <span id={"average" + i}>
                        {averageRatings(restaurant, i)}
                    </span>
                </li>)}
            </ul>
            
        </div>

    );
};