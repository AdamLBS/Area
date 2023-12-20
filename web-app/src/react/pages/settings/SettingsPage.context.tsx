'use client';
import { Services } from '@/api/constants';
import { useServices } from '@/react/hooks/oauth';
import React, { ReactNode, useContext, useMemo } from 'react';

type SettingsPageContextType = {
  services?: Services;
};

export const SettingsPageContext = React.createContext<SettingsPageContextType>(
  {} as SettingsPageContextType,
);

export const SettingsPageContextProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const { data: services } = useServices();

  const contextValue: SettingsPageContextType = useMemo(() => {
    return {
      services,
    };
  }, [services]);

  return (
    <SettingsPageContext.Provider value={contextValue}>
      {children}
    </SettingsPageContext.Provider>
  );
};

export const useSettingsPageContext = () => useContext(SettingsPageContext);
