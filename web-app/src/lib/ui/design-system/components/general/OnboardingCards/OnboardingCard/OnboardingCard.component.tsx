import React, { memo, useCallback } from 'react';
import {
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import {
  CardComponent,
  CardHeaderComponent,
  CardContentComponent,
} from './OnboardingCard.style';
import { PrimaryMutted } from '../../Text';

export type OnboardingCardProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  redirectUrl: string;
  disabled?: boolean;
  status: 'done' | 'pending' | 'not-started';
  callback?: () => void;
};

const TITLES = {
  done: 'Done',
  pending: 'Pending',
  'not-started': 'Complete the last step before',
};

const OnboardingCardComponent: React.FC<OnboardingCardProps> = ({
  title,
  description,
  buttonLabel,
  redirectUrl,
  disabled,
  status,
  callback,
}) => {
  const router = useRouter();

  const setColor = () => {
    switch (status) {
      case 'done':
        return '#53ED3A';
      case 'pending':
        return '#7C3AED';
    }
  };

  const onButtonClick = useCallback(() => {
    if (callback) {
      callback();
    }
    router.push(redirectUrl);
  }, [redirectUrl]);

  return (
    <CardComponent style={{ borderColor: setColor() }}>
      <CardHeaderComponent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeaderComponent>
      {buttonLabel && (
        <CardContentComponent>
          <Button variant="outline" onClick={onButtonClick} disabled={disabled}>
            {buttonLabel}
          </Button>
        </CardContentComponent>
      )}
      <CardFooter>
        <PrimaryMutted style={{ color: setColor() }}>
          {TITLES[status]}
        </PrimaryMutted>
      </CardFooter>
    </CardComponent>
  );
};

export const OnboardingCard = memo(OnboardingCardComponent);
