'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
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
} from './page.style';
import { Boxes, Eye } from 'lucide-react';

export default function Home() {
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
        <TextH3>Join us now to start your first event</TextH3>
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
              <Title>Create your events</Title>
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
              <RainbowTextH1>Have a feedback of your events</RainbowTextH1>
            </TitleContainer>
          </ServiceContent>
          <img src="/Watch.png" style={{ width: '85%' }} />
        </ServiceContainer>
        <ServiceContainer>
          <RainbowTextH1>The team</RainbowTextH1>
          <TeamContainer>
            <Card>
              <CardHeader>
                <img src="/Gab.png" style={{ width: '100%' }} />
              </CardHeader>
              <CardContent>
                <TeamText>Gabriel DE SOUZA MORAIS</TeamText>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img src="/Ratus.png" style={{ width: '100%' }} />
              </CardHeader>
              <CardContent>
                <TeamText>Adam ELAOUMARI</TeamText>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img src="/Flo.png" style={{ width: '100%' }} />
              </CardHeader>
              <CardContent>
                <TeamText>Florian GRIMA</TeamText>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img src="/Martin.png" style={{ width: '100%' }} />
              </CardHeader>
              <CardContent>
                <TeamText>Martin RAMDANE</TeamText>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img src="/Lucas.png" style={{ width: '100%' }} />
              </CardHeader>
              <CardContent>
                <TeamText>Lucas RIZZUTO</TeamText>
              </CardContent>
            </Card>
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
}
