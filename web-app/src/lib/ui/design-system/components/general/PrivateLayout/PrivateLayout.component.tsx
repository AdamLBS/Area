'use client';
import React, { ReactNode, memo } from 'react';
import { AuthGard, NavBar } from '@/lib/ui/design-system';
import { Layout } from './PrivateLayout.style';

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
  return (
    <Layout>
      <NavBar pageName={pageName} icon={icon} />
      <AuthGard>{children}</AuthGard>
    </Layout>
  );
};

export const PrivateLayout = memo(PrivateLayoutComponent);
