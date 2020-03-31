import React, { createContext, useEffect, useContext } from "react";
import useImmerReducer from "../utils/hooks/useImmerReducer";
import { v4 as uuid } from "uuid";

const ExercisesContext = createContext();

const initialState = {
  current: "",
  plans: {},
};

export const actionTypes = {
  ADD_EXERCISE: "ADD_EXERCISE",
  EDIT_EXERCISE: "EDIT_EXERCISE",
  SET_EXERCISES: "SET_EXERCISES",
  SET_CURRENT_PLAN: "SET_CURRENT_PLAN",
  CREATE_PLAN: "CREATE_PLAN",
  DELETE_CURRENT_PLAN: "DELETE_CURRENT_PLAN",
  EDIT_CURRENT_PLAN_NAME: "EDIT_CURRENT_PLAN_NAME",
  DELETE_EXERCISE: "DELETE_EXERCISE",
  REORDER_EXERCISES: "REORDER_EXERCISES",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EXERCISES: {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
      return;
    }
    case actionTypes.SET_CURRENT_PLAN: {
      state.current = action.payload;
      return;
    }
    case actionTypes.CREATE_PLAN: {
      const name = action.payload;
      if (Object.keys(state.plans).includes(name)) return;
      state.plans[name] = {
        id: uuid(),
        list: [],
      };
      return;
    }
    case actionTypes.ADD_EXERCISE: {
      state.plans[state.current].list.push(action.payload);
      return;
    }
    case actionTypes.DELETE_CURRENT_PLAN: {
      delete state.plans[state.current];
      // select any other or no plan as current
      state.current =
        Object.keys(state.plans).find((el) => el !== state.current) || "";
      return;
    }
    case actionTypes.EDIT_CURRENT_PLAN_NAME: {
      if (Object.keys(state.plans).includes(action.payload)) return;

      const newName = action.payload;
      state.plans[newName] = state.plans[state.current];
      delete state.plans[state.current];
      state.current = newName;

      return;
    }
    case actionTypes.DELETE_EXERCISE: {
      state.plans[state.current].list = state.plans[state.current].list.filter(
        (plan) => plan.id !== action.payload
      );
      return;
    }
    case actionTypes.EDIT_EXERCISE: {
      const current = state.current;
      const exerciseIndex = state.plans[current].list.findIndex(
        (el) => el.id === action.payload.id
      );
      if (exerciseIndex > -1) {
        const { name, duration, rest } = action.payload.newValues;
        state.plans[current].list[exerciseIndex].name = name;
        state.plans[current].list[exerciseIndex].duration = duration;
        state.plans[current].list[exerciseIndex].rest = rest;
      }
      return;
    }
    case actionTypes.REORDER_EXERCISES: {
      // refference: https://codesandbox.io/s/vertical-list-txfzj

      const currentPlan = state.current;
      const { source, destination } = action.payload;
      const plan = state.plans[currentPlan].list;
      const [removed] = plan.splice(source, 1);
      plan.splice(destination, 0, removed);
      return;
    }
    default:
      throw new Error("Invalid action type");
  }
};

const ExercisesContextProvider = ({ children }) => {
  const [exercises, dispatch] = useImmerReducer(reducer, initialState);
  useEffect(() => {
    try {
      const storedExercises = JSON.parse(localStorage.getItem("exercises"));
      if (storedExercises) {
        dispatch({
          type: actionTypes.SET_EXERCISES,
          payload: storedExercises,
        });
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      if (exercises)
        localStorage.setItem("exercises", JSON.stringify(exercises));
    } catch (err) {}
  }, [exercises]);

  const values = {
    exercises,
    dispatch,
  };

  return (
    <ExercisesContext.Provider value={values}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContextProvider;

export const useExercises = () => useContext(ExercisesContext);
