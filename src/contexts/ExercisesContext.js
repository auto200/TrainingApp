import React, { createContext, useEffect, useReducer, useContext } from "react";

const ExercisesContext = createContext();

const initialState = {
  current: "",
  plans: {}, // aight, this should be an array
};

export const actionTypes = {
  ADD_EXERCISE: "ADD_EXERCISE",
  EDIT_EXERCISE: "EDIT_EXERCISE",
  SET_EXERCISES: "SET_EXERCISES",
  SET_CURRENT_EXERCISE_PLAN: "SET_CURRENT_EXERCISE_PLAN",
  CREATE_EXERCISE_PLAN: "CREATE_EXERCISE_PLAN",
  DELETE_CURRENT_EXERCISE_PLAN: "DELETE_CURRENT_EXERCISE_PLAN",
  EDIT_CURRENT_EXERCISE_PLAN_NAME: "EDIT_CURRENT_EXERCISE_PLAN_NAME",
  DELETE_EXERCISE: "DELETE_EXERCISE",
  REORDER_EXERCISES: "REORDER_EXERCISES",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EXERCISES: {
      return action.payload;
    }
    case actionTypes.SET_CURRENT_EXERCISE_PLAN: {
      return { ...state, current: action.payload };
    }
    case actionTypes.CREATE_EXERCISE_PLAN: {
      const newState = { ...state };
      newState.plans[action.payload.name] = {
        id: action.payload.id,
        list: action.payload.list,
      };
      return newState;
    }
    case actionTypes.ADD_EXERCISE: {
      const newState = { ...state };
      const currentPlan = state.current;
      newState.plans[currentPlan].list = [
        ...newState.plans[currentPlan].list,
        action.payload,
      ];
      return newState;
    }
    case actionTypes.DELETE_CURRENT_EXERCISE_PLAN: {
      const newState = { ...state };
      delete newState.plans[newState.current];
      // select any other or no plan as current
      newState.current =
        Object.keys(newState.plans).filter(el => el !== newState.current)[0] ||
        "";
      return newState;
      //TODO: wtf is this^^^ i mean it works for now but dive into it
    }
    case actionTypes.EDIT_CURRENT_EXERCISE_PLAN_NAME: {
      const newState = { ...state };
      const current = newState.current;
      //name did not change
      if (current === action.payload) return state;
      const plans = newState.plans;
      const plan = { ...plans[current] };
      delete plans[current];
      plans[action.payload] = plan;
      newState.current = action.payload;
      return newState;
    }
    case actionTypes.DELETE_EXERCISE: {
      const newState = { ...state };
      const current = newState.current;
      newState.plans[current].list = newState.plans[current].list.filter(
        el => el.id !== action.payload
      );
      return newState;
    }
    case actionTypes.EDIT_EXERCISE: {
      const newState = { ...state };
      const current = newState.current;
      const exerciseIndex = newState.plans[current].list.findIndex(
        el => el.id === action.payload.id
      );
      if (exerciseIndex > -1) {
        const exercise = newState.plans[current].list[exerciseIndex];
        newState.plans[current].list[exerciseIndex] = {
          ...exercise,
          ...action.payload.newValues,
        };
      }
      return newState;
    }
    case actionTypes.REORDER_EXERCISES: {
      // refference: https://codesandbox.io/s/vertical-list-txfzj
      const newState = { ...state };
      const currentPlan = state.current;
      const { source, destination } = action.payload;
      const plan = newState.plans[currentPlan].list;
      const [removed] = plan.splice(source, 1);
      plan.splice(destination, 0, removed);
      return newState;
    }
    default:
      throw new Error("Invalid action type");
  }
};

const ExercisesContextProvider = ({ children }) => {
  const [exercises, dispatch] = useReducer(reducer, initialState);
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
