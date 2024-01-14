import React, { memo } from 'react';
import { OnboardingComponent } from './OnboardingCards.style';
import { OnboardingCard } from './OnboardingCard';

const CardsContent: {
  title: string;
  description: string;
  buttonLabel?: string;
  redirectUrl: string;
  status: 'completed' | 'in-progress' | 'not-started';
}[] = [
  {
    title: '1/ Link first account',
    description:
      'Link your first OAuth accounts to create some Bridges for the future',
    buttonLabel: 'Go to settings',
    redirectUrl: '/settings',
    status: 'completed',
  },
  {
    title: '2/ Create your first bridge',
    description:
      'You’re now ready to create your first bridge using your OAuth.',
    buttonLabel: 'Go to Bridge',
    redirectUrl: '/bridge',
    status: 'in-progress',
  },
  {
    title: '3/ Receive your first log',
    description:
      'When you create a Bridge, you receive some logs about your bridge working',
    redirectUrl: '/',
    status: 'not-started',
  },
  {
    title: '4/ Watch your first logs',
    description: 'Go to watch your logs now',
    buttonLabel: 'Go to Watch',
    redirectUrl: '/watch',
    status: 'not-started',
  },
];

const OnboardingCardsComponents = () => {
  return (
    <OnboardingComponent>
      {CardsContent.map((card, index) => (
        <OnboardingCard
          key={index}
          title={card.title}
          description={card.description}
          buttonLabel={card.buttonLabel}
          redirectUrl={card.redirectUrl}
          status={card.status}
          disabled={true}
        />
      ))}
    </OnboardingComponent>
  );
};

export const OnboardingCards = memo(OnboardingCardsComponents);
