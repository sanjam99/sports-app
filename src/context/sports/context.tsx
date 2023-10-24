import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, SportsState, SportsActions } from "./reducer";
const SportsStateContext = createContext<SportsState | undefined>(undefined);

type SportsDispatch = React.Dispatch<SportsActions>;
const SportsDispatchContext = createContext<SportsDispatch | undefined>(
  undefined
);

export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateSport, dispatchSports] = useReducer(reducer, initialState);

  return (
    <SportsStateContext.Provider value={stateSport}>
      <SportsDispatchContext.Provider value={dispatchSports}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};

export const useSportsState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);