'use client';
import React, { memo } from 'react';
import { NavBar } from '@/lib/ui/design-system';
import { Layout } from './PrivateLayout.style';

export type PrivateLayoutProps = {
  children: React.ReactNode;
  pageName: string;
};

const PrivateLayoutComponent: React.FC<PrivateLayoutProps> = ({
  children,
  pageName,
}) => {
  return (
    <Layout>
      <NavBar pageName={pageName} />
      {children}
    </Layout>
  );
};

export const PrivateLayout = memo(PrivateLayoutComponent);
