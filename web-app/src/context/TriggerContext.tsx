'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type TriggerVariablesType = {
  variables: Record<string, string>;
};

const initialState: TriggerVariablesType = {
  variables: {},
};

const TriggerVariablesContext = createContext<
  | {
      triggerVariablesState: TriggerVariablesType;
      updateTriggerVariablesState: (newState: TriggerVariablesType) => void;
    }
  | undefined
>(undefined);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] =
    useState<TriggerVariablesType>(initialState);

  const updateGlobalState = (newState: TriggerVariablesType) => {
    setGlobalState(newState);
  };

  return (
    <TriggerVariablesContext.Provider
      value={{
        triggerVariablesState: globalState,
        updateTriggerVariablesState: updateGlobalState,
      }}
    >
      {children}
    </TriggerVariablesContext.Provider>
  );
};

export const useTriggerVariablesState = () => {
  const context = useContext(TriggerVariablesContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};
