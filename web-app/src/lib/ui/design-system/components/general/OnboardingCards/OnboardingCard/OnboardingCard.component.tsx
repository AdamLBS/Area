import React, { memo } from 'react';
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

  return (
    <CardComponent style={{ borderColor: setColor() }}>
      <CardHeaderComponent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeaderComponent>
      {buttonLabel && (
        <CardContentComponent>
          <Button
            variant="outline"
            onClick={() => router.push(redirectUrl)}
            disabled={disabled}
          >
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
