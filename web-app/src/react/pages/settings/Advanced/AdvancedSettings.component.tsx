'use client';
import React, { memo } from 'react';
import {
  PageContainer,
  ThemeContainer,
  ThemeBody,
} from './AdvancedSettings.style';
import { PrimaryMutted, PrimarySmall } from '@/lib/ui/design-system';
import { useTheme } from 'next-themes';

//TODO: refactor the theme selection to use styled components

const Advanced = () => {
  const { setTheme } = useTheme();

  return (
    <PageContainer>
      <ThemeContainer>
        <PrimarySmall>Theme</PrimarySmall>
        <PrimaryMutted>Select your dashboard theme.</PrimaryMutted>
        <ThemeBody>
          <div
            className="items-center rounded-md border-2 border-muted p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() => setTheme('light')}
          >
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
          </div>
          <div
            className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() => setTheme('dark')}
          >
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
            </div>
          </div>
        </ThemeBody>
      </ThemeContainer>
    </PageContainer>
  );
};

export const AdvancedSettings = memo(Advanced);
