import React, { memo, useEffect } from 'react';
import { OnboardingComponent } from './OnboardingCards.style';
import { OnboardingCard } from './OnboardingCard';

const CardsContent: {
  title: string;
  description: string;
  buttonLabel?: string;
  redirectUrl: string;
}[] = [
  {
    title: '1/ Link first account',
    description:
      'Link your first OAuth accounts to create some Bridges for the future',
    buttonLabel: 'Go to settings',
    redirectUrl: '/settings',
  },
  {
    title: '2/ Create your first bridge',
    description:
      'You’re now ready to create your first bridge using your OAuth.',
    buttonLabel: 'Go to Bridge',
    redirectUrl: '/bridge',
  },
  {
    title: '3/ Receive your first log',
    description:
      'When you create a Bridge, you receive some logs about your bridge working',
    redirectUrl: '/',
  },
  {
    title: '4/ Watch your first logs',
    description: 'Go to watch your logs now',
    buttonLabel: 'Go to Watch',
    redirectUrl: '/watch',
  },
];

type Status = 'done' | 'pending' | 'not-started';

const OnboardingCardsComponents = ({
  currentStep,
}: {
  currentStep: string;
}) => {
  const [buttons, setButtons] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [status, setStatus] = React.useState<Status[]>([
    'not-started',
    'not-started',
    'not-started',
    'not-started',
  ]);

  useEffect(() => {
    if (currentStep === '1.00') {
      setButtons([false, true, true, true]);
      setStatus(['pending', 'not-started', 'not-started', 'not-started']);
    } else if (currentStep === '2.00') {
      setButtons([true, false, true, true]);
      setStatus(['done', 'pending', 'not-started', 'not-started']);
    } else if (currentStep === '4.00') {
      setButtons([true, true, true, false]);
      setStatus(['done', 'done', 'done', 'pending']);
    }
  }, [currentStep]);

  return (
    <OnboardingComponent>
      {CardsContent.map((card, index) => (
        <OnboardingCard
          key={index}
          title={card.title}
          description={card.description}
          buttonLabel={card.buttonLabel}
          redirectUrl={card.redirectUrl}
          status={status[index]}
          disabled={buttons[index]}
        />
      ))}
    </OnboardingComponent>
  );
};

export const OnboardingCards = memo(OnboardingCardsComponents);
