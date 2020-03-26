import React, { createContext, useEffect, useReducer, useContext } from "react";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";

const SettingsContext = createContext();

const initialState = {
  speechSynth: {
    supported: false,
    enabled: false,
    voices: [],
    selectedVoiceIndex: 0,
  },
  vibrations: true,
};

export const actionTypes = {
  SET_SETTINGS: "SET_SETTINGS",
  TOGGLE_TTS: "TOGGLE_TTS",
  SET_SPEECH_SYNTH_SUPPORTED: "SET_SPEECH_SYNTH_SUPPORTED",
  SET_SPEECH_SYNTH_VOICES: "SET_SPEECH_SYNTH_VOICES",
  SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX:
    "SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX",
  TOGGLE_VIBRATIONS: "TOGGLE_VIBRATIONS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SETTINGS: {
      return action.payload;
    }
    case actionTypes.TOGGLE_TTS: {
      const newState = { ...state };
      newState.speechSynth.enabled = !newState.speechSynth.enabled;
      return newState;
    }
    case actionTypes.SET_SPEECH_SYNTH_SUPPORTED: {
      const newState = { ...state };
      newState.speechSynth.supported = action.payload;
      return newState;
    }
    case actionTypes.SET_SPEECH_SYNTH_VOICES: {
      const newState = { ...state };
      newState.speechSynth.voices = action.payload;
      return newState;
    }
    case actionTypes.SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX: {
      const newState = { ...state };
      newState.speechSynth.selectedVoiceIndex = action.payload;
      return newState;
    }
    case actionTypes.TOGGLE_VIBRATIONS: {
      return { ...state, vibrations: !state.vibrations };
    }
    default:
      throw new Error("Invalid action type");
  }
};

const SettingsContextProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(reducer, initialState);
  const { supported: speechSynthSupported, voices } = useSpeechSyntesis();

  useEffect(() => {
    try {
      const storedSettings = JSON.parse(localStorage.getItem("settings"));
      if (storedSettings) {
        dispatch({
          type: actionTypes.SET_SETTINGS,
          payload: storedSettings,
        });
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      if (settings) localStorage.setItem("settings", JSON.stringify(settings));
    } catch (err) {}
  }, [settings]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SPEECH_SYNTH_SUPPORTED,
      payload: speechSynthSupported,
    });
  }, [speechSynthSupported]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SPEECH_SYNTH_VOICES,
      payload: voices,
    });
  }, [voices]);

  const values = {
    settings,
    dispatch,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;

export const useSettings = () => useContext(SettingsContext);
