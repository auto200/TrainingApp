import React, { createContext, useEffect, useContext } from "react";
import useImmerReducer from "../utils/hooks/useImmerReducer";
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
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
      return;
    }
    case actionTypes.TOGGLE_TTS: {
      state.speechSynth.enabled = !state.speechSynth.enabled;
      return;
    }
    case actionTypes.SET_SPEECH_SYNTH_SUPPORTED: {
      state.speechSynth.supported = action.payload;
      return;
    }
    case actionTypes.SET_SPEECH_SYNTH_VOICES: {
      state.speechSynth.voices = action.payload;
      return;
    }
    case actionTypes.SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX: {
      state.speechSynth.selectedVoiceIndex = action.payload;
      return;
    }
    case actionTypes.TOGGLE_VIBRATIONS: {
      state.vibrations = !state.vibrations;
      return;
    }
    default:
      throw new Error("Invalid action type");
  }
};

const SettingsContextProvider = ({ children }) => {
  const [settings, dispatch] = useImmerReducer(reducer, initialState);
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
