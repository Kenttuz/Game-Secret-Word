import PropTypes from "prop-types";
import Style from "./GameScreen.module.css";
import { useState, useRef } from "react";

const GameScreen = ({
  category,
  letters,
  score,
  guesses,
  guessedLetters,
  wrongLetters,
  handleVerifyLetter,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };
  return (
    <>
      <section className="container mx-auto flex flex-col w-full h-full justify-center items-center">
        <div>
          <h1 className="text-white text-3xl md:text-4xl mb-3 mt-3">
            Guess the word!
          </h1>

          <span className="score  font-bold text-cyan-400 text-xl md:text-2xl">
            Score: {score}
          </span>
          <h3 className="text-white text-lg md:text-xl mt-2">
            Word tip:{" "}
            <span className="text-cyan-400 capitalize">{category}</span>
          </h3>
        </div>

        <div
          className={`${Style.word_container} border-solid flex-wrap border-[10px] border-cyan-400 md:p-9 md:m-6 m-1 p-1 pt-4 pb-4 flex items-center justify-center w-fit`}
        >
          {letters.map((letter, index) =>
            guessedLetters.includes(letter) ? (
              <span key={index} className={`${Style.letter}`}>
                {letter}
              </span>
            ) : (
              <span
                key={index}
                className={`${Style.square_blank} flex-wrap`}
              ></span>
            )
          )}
        </div>

        <div className={Style.letter_container}>
          <p className="text-white text-md md:text-lg mb-2 mt-2">
            {" "}
            You have {guesses} tries.
          </p>
          <p className="mb-3 text-white text-lg md:text-xl">
            Try to guess a letter of the word:
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              type="text"
              name="letter"
              maxLength="1"
              required
              className="text-center h-12 w-12 text-3xl mr-4 bg-slate-100 text-black"
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button className="ml-1">Submit</button>
          </form>
        </div>

        <div className="wrongLettersContainer mt-6 text-lg md:text-xl">
          <p className="text-cyan-400">Letters already used:</p>
          {wrongLetters.length > 0 ? (
            wrongLetters.map((letter, index) => (
              <span key={index}>{letter}, </span>
            ))
          ) : (
            <span>No letter yet.</span>
          )}
        </div>
      </section>
    </>
  );
};

GameScreen.propTypes = {
  word: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  letters: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  guesses: PropTypes.number.isRequired,
  guessedLetters: PropTypes.array.isRequired,
  wrongLetters: PropTypes.array.isRequired,
  handleVerifyLetter: PropTypes.func.isRequired,
};

export default GameScreen;
