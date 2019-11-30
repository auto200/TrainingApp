import React, { createContext, useEffect, useReducer } from "react";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";

export const SettingsContext = createContext();

const getBrowserLanguage = () => {
  try {
    const lang = window.navigator.language.toLowerCase();
    return lang.includes("pl") ? "pl" : "en";
  } catch (err) {}
  return "en";
};

const initialState = {
  speechSynth: {
    supported: false,
    enabled: false,
    voices: [],
    selectedVoiceIndex: 0,
  },
  languages: {
    pl: "pl",
    en: "en",
  },
  currentLanguage: getBrowserLanguage(),
  exercisesProfiles: {
    current: "",
    profiles: {},
  },
};
export const actionTypes = {
  SET_SETTINGS: "SET_SETTINGS",
  SET_CURRENT_LANGUAGE: "SET_CURRENT_LANGUAGE",
  TOGGLE_VOICE_ENABLED: "TOGGLE_VOICE_ENABLED",
  SET_SPEECH_SYNTH_SUPPORTED: "SET_SPEECH_SYNTH_SUPPORTED",
  SET_SPEECH_SYNTH_VOICES: "SET_SPEECH_SYNTH_VOICES",
  SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX:
    "SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX",
  SET_CURRENT_EXERCISES_PROFILE: "SET_CURRENT_EXERCISES_PROFILE",
  CREATE_EXERCISES_PROFILE: "CREATE_EXERCISES_PROFILE",
  ADD_EXERCISE: "ADD_EXERCISE",
  DELETE_CURRENT_EXERCISES_PROFILE: "DELETE_CURRENT_EXERCISES_PROFILE",
  EDIT_CURRENT_EXERCISES_PROFILE_NAME: "EDIT_CURRENT_EXERCISES_PROFILE_NAME",
  DELETE_EXERCISE: "DELETE_EXERCISE",
  EDIT_EXERCISE: "EDIT_EXERCISE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SETTINGS:
      return action.payload;
    case actionTypes.SET_CURRENT_LANGUAGE: {
      return { ...state, currentLanguage: action.payload };
    }
    case actionTypes.TOGGLE_VOICE_ENABLED: {
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
    case actionTypes.SET_CURRENT_EXERCISES_PROFILE: {
      const newState = { ...state };
      newState.exercisesProfiles.current = action.payload;
      return newState;
    }
    case actionTypes.CREATE_EXERCISES_PROFILE: {
      const newState = { ...state };
      newState.exercisesProfiles.profiles[action.payload.name] = {
        id: action.payload.id,
        list: action.payload.list,
      };
      return newState;
    }
    case actionTypes.ADD_EXERCISE: {
      const newState = { ...state };
      const currentProfile = state.exercisesProfiles.current;
      newState.exercisesProfiles.profiles[currentProfile].list = [
        ...newState.exercisesProfiles.profiles[currentProfile].list,
        action.payload,
      ];
      return newState;
    }
    case actionTypes.DELETE_CURRENT_EXERCISES_PROFILE: {
      const newState = { ...state };
      delete newState.exercisesProfiles.profiles[
        newState.exercisesProfiles.current
      ];
      // select any other or no profile as current
      newState.exercisesProfiles.current =
        Object.keys(newState.exercisesProfiles.profiles).filter(
          el => el !== newState.exercisesProfiles.current
        )[0] || "";
      return newState;
    }
    case actionTypes.EDIT_CURRENT_EXERCISES_PROFILE_NAME: {
      const newState = { ...state };
      const current = newState.exercisesProfiles.current;
      if (current === action.payload) return state;
      const profiles = newState.exercisesProfiles.profiles;
      const profile = { ...profiles[current] };
      delete profiles[current];
      profiles[action.payload] = profile;
      newState.exercisesProfiles.current = action.payload;
      return newState;
    }
    case actionTypes.DELETE_EXERCISE: {
      const newState = { ...state };
      const current = newState.exercisesProfiles.current;
      newState.exercisesProfiles.profiles[
        current
      ].list = newState.exercisesProfiles.profiles[current].list.filter(
        el => el.id !== action.payload
      );
      return newState;
    }
    case actionTypes.EDIT_EXERCISE: {
      const newState = { ...state };
      const current = newState.exercisesProfiles.current;
      const exerciseIndex = newState.exercisesProfiles.profiles[
        current
      ].list.findIndex(el => el.id === action.payload.id);
      if (exerciseIndex > -1) {
        const exercise =
          newState.exercisesProfiles.profiles[current].list[exerciseIndex];
        newState.exercisesProfiles.profiles[current].list[exerciseIndex] = {
          ...exercise,
          ...action.payload.newValues,
        };
      }
      return newState;
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
