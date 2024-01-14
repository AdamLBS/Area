'use client';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback } from 'react';
import { NavBarLandingPage } from '@/lib/ui/design-system';
import {
  Card,
  Content,
  LandingPage,
  LogoBox,
  RainbowButton,
  RainbowTextH1,
  RainbowTextH3,
  ServiceContainer,
  ServiceContent,
  TextH3,
  Title,
  TitleContainer,
  WorkflowContainer,
  CardContent,
  CardHeader,
  TextH1,
  TeamContainer,
  TeamText,
  MobileSection,
  MobileCard,
  CodeContainer,
  MobileLine,
  DownloadContainer,
  ButtonContainer,
} from './LandingPage.style';
import { Boxes, Eye } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    img: '/Gab.png',
    name: 'Gabriel DE SOUZA MORAIS',
  },
  {
    img: '/Ratus.png',
    name: 'Adam ELAOUMARI',
  },
  {
    img: '/Flo.png',
    name: 'Florian GRIMA',
  },
  {
    img: '/Martin.png',
    name: 'Martin RAMDANE',
  },
  {
    img: '/Lucas.png',
    name: 'Lucas RIZZUTO',
  },
];

const LandingPageComponent = () => {
  const router = useRouter();

  const handleRedirection = useCallback(
    (page: string) => {
      router.push(`/${page}`);
    },
    [router],
  );

  return (
    <LandingPage>
      <NavBarLandingPage />
      <Content>
        <WorkflowContainer>
          <RainbowTextH3>Automated workflows</RainbowTextH3>
        </WorkflowContainer>
        <TitleContainer>
          <Title>Link all your services</Title>
          <RainbowTextH1>Simple. Fast. Efficient.</RainbowTextH1>
        </TitleContainer>
        <TextH3>Join us now to start your first bridge</TextH3>
        <RainbowButton onClick={() => handleRedirection(`register`)}>
          Join us
        </RainbowButton>
        <img src="/exemple_event.png" style={{ width: '100%' }} />
        <ServiceContainer>
          <ServiceContent>
            <LogoBox>
              <Boxes size={64} />
            </LogoBox>
            <TitleContainer>
              <Title>Create your bridges</Title>
              <RainbowTextH1>Make your own automated task</RainbowTextH1>
            </TitleContainer>
          </ServiceContent>
          <Card>
            <CardHeader>
              <TextH1>More than {6} services availables</TextH1>
            </CardHeader>
            <CardContent>
              <img src="/logos.png" style={{ width: '100%' }} />
            </CardContent>
          </Card>
        </ServiceContainer>
        <ServiceContainer>
          <ServiceContent>
            <LogoBox>
              <Eye size={64} />
            </LogoBox>
            <TitleContainer>
              <Title>Watch your logs</Title>
              <RainbowTextH1>Have a feedback of your bridges</RainbowTextH1>
            </TitleContainer>
          </ServiceContent>
          <img src="/Watch.png" style={{ width: '85%' }} />
        </ServiceContainer>
        <MobileSection>
          <TitleContainer>
            <Title>Also available on the little screens</Title>
            <RainbowTextH1>Install our mobile app</RainbowTextH1>
          </TitleContainer>
          <MobileCard>
            <CodeContainer>
              <Image src="/qrcode.png" width={200} height={200} alt="QR Code" />
              <TextH3>Scan this QR Code</TextH3>
            </CodeContainer>
            <MobileLine />
            <DownloadContainer>
              <TextH3>Or you can download the APK</TextH3>
              <ButtonContainer>
                <RainbowButton onClick={() => {}}>
                  Download the APK
                </RainbowButton>
              </ButtonContainer>
            </DownloadContainer>
          </MobileCard>
        </MobileSection>
        <ServiceContainer>
          <RainbowTextH1>The team</RainbowTextH1>
          <TeamContainer>
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <img src={member.img} style={{ width: '100%' }} />
                </CardHeader>
                <CardContent>
                  <TeamText>{member.name}</TeamText>
                </CardContent>
              </Card>
            ))}
          </TeamContainer>
        </ServiceContainer>
        <ServiceContainer>
          <ServiceContent>
            <TitleContainer>
              <Title>Join us</Title>
              <RainbowTextH1>Make your own automated task</RainbowTextH1>
            </TitleContainer>
          </ServiceContent>
          <RainbowButton
            onClick={() => handleRedirection(`register`)}
            style={{ width: '472px' }}
          >
            Create your account
          </RainbowButton>
        </ServiceContainer>
        <ServiceContainer>
          <TextH3>Copyright © 2024 La Table Ronde, made with ❤️</TextH3>
        </ServiceContainer>
      </Content>
    </LandingPage>
  );
};

export const LandingPages = memo(LandingPageComponent);
