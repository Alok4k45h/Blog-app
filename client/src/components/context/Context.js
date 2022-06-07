import { createContext, useReducer } from "react";
import { useEffect } from "react";
import Reducer from "./Reducer";

// initial state before clicking the login button
const INITIAL_STATE = {
  // getting user value from local storage if it contain otherwise storing null value (parsing from JSON to Normal Js object)
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// Creating && Exporting Context Which is available for use
export const Context = createContext(INITIAL_STATE);

// making State variable accessable to every page and component using ContextProvider
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
