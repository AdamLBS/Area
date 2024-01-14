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

export type OnboardingCardProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  redirectUrl: string;
  disabled?: boolean;
  status: 'completed' | 'in-progress' | 'not-started';
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

  return (
    <CardComponent>
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
        <p>{status}</p>
      </CardFooter>
    </CardComponent>
  );
};

export const OnboardingCard = memo(OnboardingCardComponent);
