import React from 'react';
import { SettingsPage } from '@/react/pages';
import { SettingsPageContextProvider } from '@/react/pages/settings/SettingsPage.context';

const Settings: React.FC = () => (
  <SettingsPageContextProvider>
    <SettingsPage />
  </SettingsPageContextProvider>
);

export default Settings;
