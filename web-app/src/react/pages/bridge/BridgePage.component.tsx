'use client';
import React, { useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getMe } from '@/api/user';
import { Button } from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { PrimaryDefault, PrivateLayout } from '@/lib/ui/design-system';
import { PageContainer } from './BridgePage.style';
import { User } from '@/types/user';

const Bridge = () => {
  const router = useRouter();

  return (
    <PrivateLayout pageName="Bridge">
      <PageContainer>
        <PrimaryDefault>Dashboard Page</PrimaryDefault>
      </PageContainer>
    </PrivateLayout>
  );
};

export const BridgePage = memo(Bridge);
