import { useState, useEffect } from 'react';
import axios from 'axios';

/** custom hook for data-fetching from jokes API */

function useFetchJokes(numJokesToGet = 5) {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    useEffect(() => {
        async function getJokes() {
            console.log("Fetching jokes");
            let gags = [];
            // `Set` is an iterable collection object
            // populate seenJokes with existing jokes from state
            let seenJokes = new Set(jokes.map(j => j.id)); 
            
            try {
                console.log("Number of gags in joke list: ", gags.length);
                while (gags.length < numJokesToGet) {
                    console.log("Entering axios call")
                    let res = await axios.get("https://icanhazdadjoke.com/", {
                        headers: { Accept: "application/json" }
                    });
                    console.log("Joke fetched ", res.data);
                    let jokeObj = res.data;

                    if (!seenJokes.has(jokeObj.id)) {
                        seenJokes.add(jokeObj.id);
                        gags.push({ ...jokeObj, votes: 0 });
                    } else {
                        throw new Error("Duplicate joke detected. Please try again.");
                    }
                }
                // update state data and clear any previous errors
                setJokes(gags);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        if(jokes.length === 0 || refetchIndex > 0) getJokes();
    }, [numJokesToGet, refetchIndex]); // effect runs when numJokesToGet or refetch changes

    // accommodate voting feature by joke id and delta (+1 or -1)
    const vote = (id, delta) => {
        console.log(`Voting on joke ${id} with delta ${delta}`);
        setJokes(jokes => jokes.map(
            joke => joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        ));
    };

    // binding a method to trigger refetching
    const refetchJokes = () => setRefetchIndex(i => i + 1);

    // stateful objects returned for use in any other component
    return { jokes, isLoading, error, refetchJokes, vote };
}

export default useFetchJokes;
