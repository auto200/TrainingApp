import React, { useRef, useState } from "react";
import styled from "styled-components";
import Countdown, { zeroPad } from "react-countdown-now";
import pauseVid from "../assets/pauseVid.mp4";
import endVid from "../assets/endVid.mp4";
import { useSettings } from "../contexts/SettingsContext";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";
import { trainingStarted } from "../translations";

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
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
const Title = styled.h1`
  position: absolute;
  top: 10%;
  font-size: 3rem;
`;
const ExerciseCounter = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
const BGVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const STATES = {
  PREPARING: "PREPARING",
  EXERCISING: "EXERCISING",
  RESTING: "RESTING",
  ENDED: "ENDED",
};

const TrainingStarted = ({ trainingData }) => {
  const {
    settings: { speechSynth, currentLanguage },
  } = useSettings();
  const { speak } = useSpeechSyntesis();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [state, setState] = useState(STATES.PREPARING);
  const counterRef = useRef(null);
  const pauseVideoTimestamp = useRef(0);

  const currentExercise = trainingData[currentExerciseIndex];
  const [timeToCountdown, setTimeToCountdown] = useState(Date.now() + 3000); // 3 seconds prepare time
  const togglePause = () => {
    if (state === STATES.ENDED) return;
    if (counterRef.current.isPaused()) counterRef.current.start();
    else counterRef.current.pause();
  };
  const nextExercise = () => {
    setState(STATES.EXERCISING);
    setTimeToCountdown(
      Date.now() + trainingData[currentExerciseIndex + 1].duration * 1000
    );
    setCurrentExerciseIndex(prev => prev + 1);
  };
  const handleStart = () => {
    if (!speechSynth.enabled) return;
    state === STATES.EXERCISING &&
      speak({
        voice: speechSynth.voices[speechSynth.selectedVoiceIndex],
        text: currentExercise.name,
      });
  };

  const handleCountdownEnd = () => {
    switch (state) {
      case STATES.PREPARING: {
        setState(STATES.EXERCISING);
        setTimeToCountdown(Date.now() + currentExercise.duration * 1000);
        break;
      }
      case STATES.EXERCISING: {
        if (trainingData[currentExerciseIndex + 1]) {
          if (currentExercise.rest) {
            setState(STATES.RESTING);
            setTimeToCountdown(Date.now() + currentExercise.rest * 1000);
          } else nextExercise();
        } else setState(STATES.ENDED);

        break;
      }
      case STATES.RESTING: {
        nextExercise();
        break;
      }
      default:
        break;
    }
  };

  return (
    <Background onClick={togglePause}>
      <Title>
        {state === STATES.PREPARING && trainingStarted.prepare[currentLanguage]}
        {state === STATES.EXERCISING && currentExercise.name}
        {state === STATES.RESTING && trainingStarted.rest[currentLanguage]}
      </Title>
      <Countdown
        ref={counterRef}
        renderer={renderer}
        date={timeToCountdown}
        onComplete={handleCountdownEnd}
        onStart={handleStart}
        key={"JustTimerCountingDown" + timeToCountdown}
        pauseVideoTimestamp={pauseVideoTimestamp}
      />
      <ExerciseCounter>
        {currentExerciseIndex + 1}/{trainingData.length}
      </ExerciseCounter>
    </Background>
  );
};

export default TrainingStarted;

const renderer = ({
  seconds,
  minutes,
  api: { isPaused, isCompleted },
  props: { pauseVideoTimestamp },
}) => {
  const onLoadedMetadata = e => {
    e.target.currentTime = pauseVideoTimestamp.current;
  };
  const onTimeUpdate = e => {
    pauseVideoTimestamp.current = e.target.currentTime;
  };
  if (isPaused()) {
    return (
      <BGVideo
        src={pauseVid}
        autoPlay
        loop
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      />
    );
  }
  if (isCompleted()) {
    return <BGVideo src={endVid} autoPlay loop />;
  }
  const closeToEnd = !minutes && seconds <= 3;
  return (
    <Counter
      closeToEnd={closeToEnd}
      key={closeToEnd && "TrainingCounter" + seconds}
    >
      {minutes ? minutes + ":" + zeroPad(seconds) : seconds}
    </Counter>
  );
};

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
