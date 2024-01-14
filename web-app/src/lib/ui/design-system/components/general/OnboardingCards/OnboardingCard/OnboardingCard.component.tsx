import React, { memo } from 'react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import { CardComponent } from './OnboardingCard.style';
import { PrimaryMutted } from '../../Text';

export type OnboardingCardProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  redirectUrl: string;
  disabled?: boolean;
  status: 'done' | 'pending' | 'Complete the last step before';
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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {buttonLabel && (
          <Button
            variant="outline"
            onClick={() => router.push(redirectUrl)}
            disabled={disabled}
          >
            {buttonLabel}
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <PrimaryMutted style={{ color: setColor() }}>
          {status.at(0)?.toUpperCase() + status.slice(1)}
        </PrimaryMutted>
      </CardFooter>
    </CardComponent>
  );
};

export const OnboardingCard = memo(OnboardingCardComponent);
