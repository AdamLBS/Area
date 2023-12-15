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
  const [color, setColor] = React.useState('');

  useEffect(() => {
    if (theme === 'dark') {
      setColor('#18181b');
    } else {
      setColor('#f3f4f6');
    }
  }, [theme]);

  return (
    <Container backgroundColor={color}>
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
            <IconGoogle color={color} />
            <IconLinkedin color={color} />
            <IconTwitch color={color} />
            <IconGithub color={color} />
            <IconDiscord color={color} />
            <IconSpotify color={color} />
          </ServicesContainer>
        </DescriptionContainer>
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
