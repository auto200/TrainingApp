import React, { createContext, useEffect, useReducer, useContext } from "react";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";

const SettingsContext = createContext();

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
  vibrations: true,
  exercisesPlans: {
    current: "",
    plans: {},
  },
};
export const actionTypes = {
  SET_SETTINGS: "SET_SETTINGS",
  SET_CURRENT_LANGUAGE: "SET_CURRENT_LANGUAGE",
  TOGGLE_TTS: "TOGGLE_TTS",
  SET_SPEECH_SYNTH_SUPPORTED: "SET_SPEECH_SYNTH_SUPPORTED",
  SET_SPEECH_SYNTH_VOICES: "SET_SPEECH_SYNTH_VOICES",
  SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX:
    "SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX",
  TOGGLE_VIBRATIONS: "TOGGLE_VIBRATIONS",
  //this sould be in diffrent context
  SET_CURRENT_EXERCISE_PLAN: "SET_CURRENT_EXERCISE_PLAN",
  CREATE_EXERCISE_PLAN: "CREATE_EXERCISE_PLAN",
  ADD_EXERCISE: "ADD_EXERCISE",
  DELETE_CURRENT_EXERCISE_PLAN: "DELETE_CURRENT_EXERCISE_PLAN",
  EDIT_CURRENT_EXERCISE_PLAN_NAME: "EDIT_CURRENT_EXERCISE_PLAN_NAME",
  DELETE_EXERCISE: "DELETE_EXERCISE",
  EDIT_EXERCISE: "EDIT_EXERCISE",
  REORDER_EXERCISES: "REORDER_EXERCISES",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SETTINGS: {
      return action.payload;
    }
    case actionTypes.SET_CURRENT_LANGUAGE: {
      return { ...state, currentLanguage: action.payload };
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
    case actionTypes.SET_CURRENT_EXERCISE_PLAN: {
      const newState = { ...state };
      newState.exercisesPlans.current = action.payload;
      return newState;
    }
    case actionTypes.CREATE_EXERCISE_PLAN: {
      const newState = { ...state };
      newState.exercisesPlans.plans[action.payload.name] = {
        id: action.payload.id,
        list: action.payload.list,
      };
      return newState;
    }
    case actionTypes.ADD_EXERCISE: {
      const newState = { ...state };
      const currentPlan = state.exercisesPlans.current;
      newState.exercisesPlans.plans[currentPlan].list = [
        ...newState.exercisesPlans.plans[currentPlan].list,
        action.payload,
      ];
      return newState;
    }
    case actionTypes.DELETE_CURRENT_EXERCISE_PLAN: {
      const newState = { ...state };
      delete newState.exercisesPlans.plans[newState.exercisesPlans.current];
      // select any other or no plan as current
      newState.exercisesPlans.current =
        Object.keys(newState.exercisesPlans.plans).filter(
          el => el !== newState.exercisesPlans.current
        )[0] || "";
      return newState;
    }
    case actionTypes.EDIT_CURRENT_EXERCISE_PLAN_NAME: {
      const newState = { ...state };
      const current = newState.exercisesPlans.current;
      if (current === action.payload) return state;
      const plans = newState.exercisesPlans.plans;
      const plan = { ...plans[current] };
      delete plans[current];
      plans[action.payload] = plan;
      newState.exercisesPlans.current = action.payload;
      return newState;
    }
    case actionTypes.DELETE_EXERCISE: {
      const newState = { ...state };
      const current = newState.exercisesPlans.current;
      newState.exercisesPlans.plans[
        current
      ].list = newState.exercisesPlans.plans[current].list.filter(
        el => el.id !== action.payload
      );
      return newState;
    }
    case actionTypes.EDIT_EXERCISE: {
      const newState = { ...state };
      const current = newState.exercisesPlans.current;
      const exerciseIndex = newState.exercisesPlans.plans[
        current
      ].list.findIndex(el => el.id === action.payload.id);
      if (exerciseIndex > -1) {
        const exercise =
          newState.exercisesPlans.plans[current].list[exerciseIndex];
        newState.exercisesPlans.plans[current].list[exerciseIndex] = {
          ...exercise,
          ...action.payload.newValues,
        };
      }
      return newState;
    }
    case actionTypes.REORDER_EXERCISES: {
      // refference: https://codesandbox.io/s/vertical-list-txfzj
      const newState = { ...state };
      const currentPlan = state.exercisesPlans.current;
      const { source, destination } = action.payload;
      const plan = newState.exercisesPlans.plans[currentPlan].list;
      const [removed] = plan.splice(source, 1);
      plan.splice(destination, 0, removed);
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

export const useSettings = () => useContext(SettingsContext);
