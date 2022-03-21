import react, { useContext, useReducer } from "react";

export const context = react.createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </context.Provider>
);

export const useStateValue = () => useContext(context);
