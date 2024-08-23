import PropTypes from "prop-types";

const StartScreen = ({ startGame }) => {
  return (
    <>
      <section className="container mx-auto flex flex-col w-full h-full justify-center items-center">
        <h1 className="text-center text-5xl mt-10 text-white">Word Secret</h1>
        <div className="mt-10 flex flex-col justify-center items-center">
          <p className="text-center mt-5 text-white w-[63%] mb-5">
            The game is about guessing a randomly chosen secret word. To win,
            you must guess the word by entering one letter at a time. With each
            guess, the word will be revealed if the letter is correct. If the
            letter is incorrect, you will lose an attempt.
          </p>
          <p className="text-center text-sky-400">
            Click on the button below to start
          </p>
          <button
            className="btn btn-primary btn-block mt-5"
            onClick={startGame}
          >
            Play Game
          </button>
        </div>
      </section>
    </>
  );
};

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default StartScreen;
