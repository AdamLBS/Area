import React, { memo, useEffect } from 'react';
import {
  Container,
  Description,
  DescriptionContainer,
  ColumnContainer,
  Logo,
  LogoContainer,
  MainContainer,
  NameContainer,
  ServicesContainer,
  TitleContainer,
} from './ColumnLayout.style';
import {
  IconDiscord,
  IconGithub,
  IconGoogle,
  IconLinkedin,
  IconSpotify,
  IconTwitch,
} from '@/lib/ui/design-system';
import { useTheme } from 'next-themes';

const ColumnLayoutComponent = () => {
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = React.useState('');
  const [color, setColor] = React.useState('');

  useEffect(() => {
    if (theme === 'dark') {
      setBackgroundColor('#18181b');
      setColor('#fff');
    } else {
      setBackgroundColor('#f3f4f6');
      setColor('#000');
    }
  }, [theme]);

  return (
    <Container colorOfBackground={backgroundColor}>
      <MainContainer>
        <ColumnContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <TitleContainer>
            <NameContainer>
              Link all your services. Simple. Fast. Efficient.
            </NameContainer>
          </TitleContainer>
        </ColumnContainer>
        <DescriptionContainer>
          <Description>Some services available</Description>
          <ServicesContainer>
            <IconGoogle color={color} size={43} />
            <IconLinkedin color={color} size={43} />
            <IconTwitch color={color} size={43} />
            <IconGithub color={color} size={43} />
            <IconDiscord color={color} size={43} />
            <IconSpotify color={color} size={43} />
          </ServicesContainer>
        </DescriptionContainer>
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
