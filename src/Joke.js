import React from "react";
import "./Joke.css";

/** Leaf node component; displays joke and
 *   provides users with voting functionality
 */

function Joke({ vote, votes, text, id }) {
    console.log("Joke props: ", { vote, votes, text, id });
    function upVote(evt) {
        evt.preventDefault();
        vote(id, +1);
    }
    function downVote(evt) {
        evt.preventDefault();
        vote(id, -1);
    }


    return (
        <div className="Joke">
            <div className="Joke-voting">
                <button onClick={upVote}>
                    <i className="fas fa-thumbs-up" />
                </button>
                <button onClick={downVote}>
                    <i className="fas fa-thumbs-down" />
                </button>
                {votes}
            </div>
            <div className="Joke-text">
                {text}
            </div>
        </div>
    );
}

export default Joke;