import React, { useState } from "react";
import usePersistedState from "../usePersistedState";
import Header from "./Header";
import GameInitial from "./GameInitial";
import GamePlay from "./GamePlay";
import Button from "./Button";
import Rules from "./Rules";

const Game = () => {
    const [score, setScore] = usePersistedState("score", 0);
    const [started, setStarted] = useState(false);
    const [userPick, setUserPick] = useState(null);
    const [housePick, setHousePick] = useState(null);
    const [result, setResult] = useState(null);
    const [modalActive, setModalActive] = useState(false);

    const gamePlayHandler = newUserPick => {
        setStarted(true);
        setUserPick(newUserPick);

        const options = ["rock", "paper", "scissors"];
        const random = Math.floor(Math.random() * 3);
        const newHousePick = options[random];
        setHousePick(newHousePick);

        const newResult = determineResult(newUserPick, newHousePick);
        setResult(newResult);
        setTimeout(() => {
            if (newResult === "win") { setScore(score + 1) };
            if (newResult === "lose") { setScore(score - 1) };
        }, 2000)
    }

    const restartHandler = () => {
        setStarted(false);
    }

    const modalHandler = () => {
        setModalActive(!modalActive);
    }

    const determineResult = (user, house) => {
        if (user === house) return "draw";
        else {
            if (user === "rock") {
                if (house === "paper") return "lose";
                else if (house === "scissors") return "win";
            }
            else {
                if (user === "paper") {
                    if (house === "rock") return "win";
                    else if (house === "scissors") return "lose";
                }
                else if (user === "scissors") {
                    if (house === "rock") return "lose";
                    else if (house === "paper") return "win";
                }
            }
        }
    }

    return (
        <main className="game">
            <Header score={score} />
            {!started ? <GameInitial onPick={gamePlayHandler} /> :
                <GamePlay
                    userPick={userPick}
                    housePick={housePick}
                    result={result}
                    onRestart={restartHandler}
                />}
            <Button small transparent right centerMobile text="Rules" clicked={modalHandler} />
            <Rules active={modalActive} closed={modalHandler} />
        </main>
    )
}

export default Game;