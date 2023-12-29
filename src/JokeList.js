import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchJokes from "./useFetchJokes";
import Joke from "./Joke";
import "./JokeList.css";

/** Intermediate component that manages state 
 *   and effects for API data fetching from custom hook
 *    and passes to child component as props
 */

function JokeList({ numJokesToGet = 5 }) {
    const { jokes, 
            isLoading, 
            error,
            refetchJokes,
            vote } = useFetchJokes(numJokesToGet);

    // allows user to empty joke list and fetch new jokes
    function generateNewJokes() {
        console.log("generateNewJokes called");
        refetchJokes();
    }

    /** Rendering JSX */
    
    // display jokes by most popular per votes
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    console.log("Sorted jokes: ", sortedJokes);
    return (
        <div className="JokeList">
            <button className="JokeList-more" onClick={generateNewJokes}>
                Get New Jokes
            </button>
            {/* display data-fetching error message */}
            {error && (
                <div className="error">
                    Error: {error.message}
                </div>
            )} 
            {/* Display spinner if loading */}
            {isLoading && (
                <div className="loading">
                    <p>Loading your jokes... ...</p>
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
            )}
            {/* Display jokes if not loading and no errors */}
            {!isLoading && !error && sortedJokes.map(
                ({joke, id, votes}) => (
                    <Joke text={joke} key={id} votes={votes} vote={vote} id={id} />
            ))}
        </div>
    );
}

export default JokeList;
