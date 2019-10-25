import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CountDownTimer from "../utils/CountDownTimer";

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Counter = styled.div`
  font-size: 3rem;
  @keyframes anim {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(2);
    }
  }
  animation: ${({ closeToEnd }) => closeToEnd && "anim 2s ease forwards"};
`;
const ExerciseName = styled.h1`
  position: relative;
  top: -100px;
`;

const TrainingStarted = ({ trainingData }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(trainingData[0].duration);
  const [closeToEnd, setCloseToEnd] = useState(false);
  const roundedTime = () => Math.ceil(timeLeft / 1000);
  const Timer = useRef(
    new CountDownTimer({
      tick: 500,
      timeToElapse: 7,
      tickCallback: time => setTimeLeft(time),
      endCallback: () => {
        setTimeLeft(0);
        console.log("ehahh");
      },
    })
  );

  useEffect(() => {
    if (!timeLeft) return;
    if (timeLeft <= 3000) {
      setCloseToEnd(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    Timer.current.start();
    return () => {
      Timer.current.pause();
    };
  }, []);
  return (
    <Background>
      <ExerciseName>nazwa cwiczenia</ExerciseName>
      <Counter
        closeToEnd={closeToEnd}
        key={closeToEnd && "TrainingCounter" + roundedTime()}
        onClick={() => {
          Timer.current.paused ? Timer.current.start() : Timer.current.pause();
        }}
      >
        {roundedTime()}
      </Counter>
    </Background>
  );
};

export default TrainingStarted;
