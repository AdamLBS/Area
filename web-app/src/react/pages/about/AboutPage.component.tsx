'use client';
import React, { memo } from 'react';
import { PrivateLayout } from '@/lib/ui/design-system';
import { Boxes } from 'lucide-react';
import { useAbout } from '@/react/hooks/about';
import { H2, H3 } from '@/lib/ui/design-system';
import { AboutContainer } from './AboutPage.style';

const About: React.FC = () => {
  const { data: about } = useAbout();

  return (
    <PrivateLayout pageName="About" icon={<Boxes />}>
      <AboutContainer>
        <H2>Client: {about?.client.host}</H2>
        <H3>Server: {about?.server.current_time}</H3>
        {about?.server.services.map((service) => (
          <H3 key={service.name}>
            <br />
            {service.name}:
            <br />
            Actions: {service.actions.map((action) => action.name).join(', ')}
            <br />
            Reactions:{' '}
            {service.reactions.map((reaction) => reaction.name).join(', ')}
            <br />
          </H3>
        ))}
      </AboutContainer>
    </PrivateLayout>
  );
};

export const AboutPage = memo(About);
