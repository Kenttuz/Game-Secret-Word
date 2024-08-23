import PropTypes from "prop-types";

const EndGameScreen = ({ retryGame, score }) => {
  return (
    <>
      <h1 className="text-5xl text-white mb-6">Game Over!</h1>
      <h2 className="text-3xl text-cyan-400 mb-4"> Your Score: {score}</h2>
      <button onClick={retryGame}>Retry Game</button>
    </>
  );
};

EndGameScreen.propTypes = {
  retryGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default EndGameScreen;
