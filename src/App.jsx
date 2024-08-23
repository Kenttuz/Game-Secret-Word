import "./App.css";

//react
import { useState, useEffect, useCallback } from "react";

//data
import { wordsList } from "./data/words";

//components
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndGameScreen from "./components/EndGameScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedeCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //pick random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  const handleStartGame = useCallback(() => {
    //clean letters
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3);
    console.log("alo");

    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const handleVerifyLetter = (letter) => {
    const normalzedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalzedLetter) ||
      wrongLetters.includes(normalzedLetter)
    ) {
      return;
    } else if (letters.includes(normalzedLetter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        normalzedLetter,
      ]);
    } else {
      setWrongLetters((prevWrongLetters) => [
        ...prevWrongLetters,
        normalzedLetter,
      ]);
      setGuesses((prevGuesses) => prevGuesses - 1);
    }
  };

  //function game over
  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);

      //reset
      setGuessedLetters([]);
      setWrongLetters([]);
      setGuesses(3);
    }
  }, [guesses]);

  // win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      (guessedLetters.length === uniqueLetters.length) &
      (guessedLetters.length > 0)
    ) {
      //add score
      setScore((prevScore) => (prevScore += 100));
      //restart game with new word
      handleStartGame();
    }
  }, [guessedLetters, letters, handleStartGame]);
  const handleRetry = () => {
    setScore(0);
    //restart game with new word
    handleStartGame();
  };
  return (
    <>
      {gameStage === "start" && <StartScreen startGame={handleStartGame} />}
      {gameStage === "game" && (
        <GameScreen
          category={pickedeCategory}
          word={pickedWord}
          letters={letters}
          score={score}
          guesses={guesses}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          handleVerifyLetter={handleVerifyLetter}
        />
      )}
      {gameStage === "end" && (
        <EndGameScreen retryGame={handleRetry} score={score} />
      )}
    </>
  );
}

export default App;
