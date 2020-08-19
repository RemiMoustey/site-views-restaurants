import React, { useState, useEffect } from 'react';

export const Views = ({ restaurants }) => {
    const [isListTerminated, setIsListTerminated] = useState(false);
    const [stars, setStars] = useState(1);
    const [comment, setComment] = useState(null);
    const [numberAddedViews, setNumberAddedViews] = useState(0);

    useEffect(() => {
        if(sessionStorage.length === 0) {
            for(let i = 0; i < restaurants.length; i++) {
                for(let j = 0; j < restaurants[i].ratings.length; j++) {
                    addRatingInStorage("addedViews" + i, restaurants[i].ratings[j]);
                }
            }
        }
        setIsListTerminated(() => true);
    }, [restaurants]);

    const addRatingInStorage = (nameStorage, newRating) => {
        if(sessionStorage.getItem(nameStorage) === null) {
            sessionStorage.setItem(nameStorage, JSON.stringify([JSON.stringify(newRating)]));
        } else {
            const array = JSON.parse(sessionStorage.getItem(nameStorage))
            array.push(JSON.stringify(newRating));
            sessionStorage.setItem(nameStorage, JSON.stringify(array));
        }
    }

    const handleCommentChange = e => setComment(e.target.value);

    const handleStarsChange = e => setStars(e.target.value);

    const sendErrorToUser = () => document.querySelector("#root").textContent = "Erreur lors de la récupération des données";

    const getCurrentList = (listsViews) => {
        let countVerification = 0;
        for(let listViews of listsViews) {
            if(window.getComputedStyle(listViews).getPropertyValue("display") === "block") {
                countVerification++;
            }
        }

        if(countVerification !== 1) {
            sendErrorToUser();
            return;
        }

        for(let listViews of listsViews) {
            if(window.getComputedStyle(listViews).getPropertyValue("display") === "block") {
                return listViews;
            }
        }
        sendErrorToUser();
    }

    const areStarsGood = (stars) => parseInt(stars) === 1 || parseInt(stars) === 2 ||
    parseInt(stars) === 3 || parseInt(stars) === 4 || parseInt(stars) === 5;

    const isSameComment = (ratings, currentComment) => {
        for(let rating of ratings) {
            if(currentComment === JSON.parse(rating).comment) {
                return true;
            }
        }
        return false;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const currentList = getCurrentList(document.querySelectorAll(".views-restaurant"));
        const nameStorage = "addedViews" + currentList.getAttribute("id")
        .slice((currentList.getAttribute("id").length - 1), currentList.getAttribute("id").length);
        if(JSON.parse(sessionStorage.getItem(nameStorage)) !== null && isSameComment(JSON.parse(sessionStorage.getItem(nameStorage)), e.target.elements.comment.value)) {
            document.querySelector("#root").textContent = "Erreur : il ne peut pas y avoir deux commentaires identiques.";
            return;
        }
        document.getElementById("message-view-added").style.display = "block";
        if(!currentList.getAttribute("id").match(/views-restaurant\d+/) ||
        !areStarsGood(e.target.elements.stars.value)) {
            sendErrorToUser();
            return;
        }
        const newRating = {
            stars: parseInt(e.target.elements.stars.value),
            comment: e.target.elements.comment.value
        }
        addRatingInStorage(nameStorage, newRating);
        calculateNewAverage(getRatingsInSession(JSON.parse(sessionStorage.getItem(nameStorage))), nameStorage);
        document.getElementById("comment").value = "";
        document.getElementById("stars").value = 1;
        sessionStorage.setItem("numberAddedViews", numberAddedViews + 1);
        setNumberAddedViews((number) => ++number);
    }

    const calculateNewAverage = (ratings, nameStorage) => {
        let total = 0;
        for(let i = 0; i < ratings.length; i++) {
            total += ratings[i].stars;
        }
        document.querySelector("#average" +
        nameStorage.substr(nameStorage.length - 1, nameStorage.length)).textContent =
        (total / ratings.length).toFixed(2);
    }

    const getRatingsInSession = (ratingsSession) => {
        const arrayRatings = [];
        for(let ratingSession of ratingsSession) {
            arrayRatings.push(JSON.parse(ratingSession));
        }
        return arrayRatings;
    }

    return (
        <section id="views-section">
            <h2 className="my-3" id="views">Les avis</h2>
            {numberAddedViews === 0 && <p>Aucun avis n'a été ajouté durant cette session.</p>}
            {numberAddedViews === 1 && <p>1 avis a été ajouté durant cette session.</p>}
            {numberAddedViews >= 2 && <p>{sessionStorage.getItem("numberAddedViews")} avis ont été ajoutés durant cette session.</p>}
            {isListTerminated && restaurants.map((restaurant, i) =>
                <ul id={"views-restaurant" + i}
                    className="views-restaurant list-group list-group-flush mb-5" key={i}
                    style={{display: "none"}}>
                    <h3>{restaurant.restaurantName}</h3>
                    {(restaurant.ratings.length !== 0 || sessionStorage.getItem("addedViews" + i) !== null) &&
                    getRatingsInSession(JSON.parse(sessionStorage.getItem("addedViews" + i))).map((rating, j) => 
                        <li key={j} className="mb-2 list-group-item">
                            <p>{rating.comment}</p>
                            Note : {rating.stars}
                        </li>
                    )}
                    {restaurant.ratings.length === 0 && sessionStorage.getItem("addedViews" + i) === null && "Aucun avis"}
                </ul>
            )}
            <div id="add-view" className="mb-3" style={{display: "none"}}>
                <h2 className="mb-5">Ajouter un avis</h2>
                <div id="message-view-added" className="alert alert-success" style={{display: "none"}}>Votre message a bien ajouté !</div>
                <form method="post" action="#" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="comment">Votre avis : </label>
                        <textarea className="form-control" type="text" name="comment" id="comment"
                        onChange={handleCommentChange} required>{comment}</textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stars">Votre note :</label>
                        <select className="form-control" id="stars" onChange={handleStarsChange} value={stars}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>
        </section>
    );
}