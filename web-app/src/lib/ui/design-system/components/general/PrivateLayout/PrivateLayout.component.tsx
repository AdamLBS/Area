'use client';
import React, { ReactNode, memo } from 'react';
import { AuthGard, NavBar } from '@/lib/ui/design-system';
//TODO: change this import to the correct component
import { OnboardingCards } from '@/lib/ui/design-system/components/general/OnboardingCards/OnboardingCards.component';
import { Layout } from './PrivateLayout.style';
import { useOnboarginStatus } from '@/react/hooks/user';

export type PrivateLayoutProps = {
  children: React.ReactNode;
  pageName: string;
  icon: ReactNode;
};

const PrivateLayoutComponent: React.FC<PrivateLayoutProps> = ({
  children,
  pageName,
  icon,
}) => {
  const { data: status } = useOnboarginStatus();

  return (
    <Layout>
      <NavBar pageName={pageName} icon={icon} />
      {status && status.step && status.step !== '6' && (
        <OnboardingCards currentStep={status.step} />
      )}
      <AuthGard>{children}</AuthGard>
    </Layout>
  );
};

export const PrivateLayout = memo(PrivateLayoutComponent);
