import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CountDownTimer from "../utils/CountDownTimer";
import pauseVid from "../assets/pauseVid.mp4";
import endVid from "../assets/endVid.mp4";
import { useSettings } from "../contexts/SettingsContext";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  div {
    font-size: 3rem;
  }
`;
const Counter = styled.div`
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
  position: absolute;
  top: 10%;
  font-size: 3rem;
`;

const TrainingStarted = ({ trainingData }) => {
  const {
    settings: { speechSynth },
  } = useSettings();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [trainingEnded, setTrainingEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    trainingData[currentExerciseIndex].duration
  );
  const [closeToEnd, setCloseToEnd] = useState(false);
  const timer = useRef(null);
  const { speak } = useSpeechSyntesis();

  const handleTimeChange = time => {
    const roundedTime = Math.ceil(time / 1000);
    if (roundedTime !== timeLeft) {
      setTimeLeft(roundedTime);
    }
  };

  useEffect(() => {
    timer.current = new CountDownTimer({
      tick: 500,
      timeToElapse: trainingData[currentExerciseIndex].duration,
      tickCallback: handleTimeChange,
      endCallback: () => {
        setTimeLeft(0);
        setCloseToEnd(false);
        rest();
      },
    });
    setTimeLeft(trainingData[currentExerciseIndex].duration);
    setIsResting(false);
    timer.current.start();
    if (speechSynth.enabled) {
      speak({
        text: trainingData[currentExerciseIndex].name,
        voice: speechSynth.voices[speechSynth.selectedVoiceIndex],
      });
    }
    // eslint-disable-next-line
  }, [currentExerciseIndex]);

  const rest = () => {
    if (trainingData[currentExerciseIndex + 1]) {
      timer.current = new CountDownTimer({
        tick: 500,
        timeToElapse: trainingData[currentExerciseIndex].rest,
        tickCallback: handleTimeChange,
        endCallback: () => {
          setCurrentExerciseIndex(index => index + 1);
          setTimeLeft(0);
          setCloseToEnd(false);
        },
      });
      setTimeLeft(trainingData[currentExerciseIndex].rest);
      setIsResting(true);
      timer.current.start();
    } else setTrainingEnded(true);
  };

  useEffect(() => {
    if (!timeLeft) return;
    if (timeLeft <= 3) {
      setCloseToEnd(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      timer.current.pause();
    };
  }, []);

  const handleClick = () => {
    if (isPaused) {
      setIsPaused(false);
      timer.current.start();
    } else {
      setIsPaused(true);
      timer.current.pause();
    }
  };
  return (
    <Background onClick={handleClick}>
      {trainingEnded ? (
        <video
          src={endVid}
          autoPlay
          loop
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <ExerciseName>
            {isResting ? "Rest time:" : trainingData[currentExerciseIndex].name}
          </ExerciseName>
          {isPaused ? (
            <video
              src={pauseVid}
              autoPlay
              loop
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Counter
              closeToEnd={closeToEnd}
              key={closeToEnd && "TrainingCounter" + timeLeft}
            >
              {timeLeft}
            </Counter>
          )}
        </>
      )}
    </Background>
  );
};

export default TrainingStarted;
