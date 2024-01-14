import { Button } from '@/components/ui';
import styled from 'styled-components';
import {
  Card as Card_,
  CardHeader as CardHeader_,
  CardContent as CardContent_,
} from '@/components/ui';

export const LandingPage = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  background: url('/background.png') center/cover no-repeat;
  z-index: 0;
`;

export const Content = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 20;
`;

export const WorkflowContainer = styled.div`
  display: flex;
  padding: 10px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 44px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7.5px);
`;

export const RainbowTextH3 = styled.h3`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.6px;
  background: var(
    --header_text_gradient,
    linear-gradient(
      269deg,
      #6d28d9 -0.2%,
      #fafafa -0.2%,
      #6d28d9 -0.19%,
      #ab28d9 99.51%
    )
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: -1.2px;
`;

export const RainbowTextH1 = styled.h1`
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 53px;
  letter-spacing: -1.2px;
  background: var(
    --header_text_gradient,
    linear-gradient(
      269deg,
      #6d28d9 -0.2%,
      #fafafa -0.2%,
      #6d28d9 -0.19%,
      #ab28d9 99.51%
    )
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const TextH3 = styled.h3`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.6px;
`;

export const RainbowButton = styled(Button)`
  display: inline-flex;
  width: auto;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: var(--radius-rounded-md, 10px);
  background: var(
    --header_text_gradient,
    linear-gradient(
      269deg,
      #6d28d9 -0.2%,
      #fafafa -0.2%,
      #6d28d9 -0.19%,
      #ab28d9 99.51%
    )
  );
`;

export const ServiceContainer = styled.div`
  display: flex;
  padding-top: 86px;
  padding-bottom: 86px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ServiceContent = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const LogoBox = styled.div`
  display: inline-flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #7c3aed;
`;

export const Card = styled(Card_)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--radius-rounded-md, 10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
`;

export const ServicesCard = styled(Card_)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--radius-rounded-md, 10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  min-width: 800px;
`;

export const BridgeCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-rounded-md, 10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  min-width: 800px;
`;

export const LogoContainer = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Line = styled.div`
  width: 1px;
  height: 350px;
  background: rgba(255, 255, 255, 0.1);
`;

export const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ActionCard = styled(Card_)`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 12px 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  align-items: center;
`;

export const CardHeader = styled(CardHeader_)`
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CardContent = styled(CardContent_)`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border: 0px solid rgba(255, 255, 255, 0.1);
`;

export const TextH1 = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: -0.8px;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.8) 0%,
    rgba(250, 250, 250, 0.72) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const TeamContainer = styled.div`
  display: flex;
  width: 1271px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 24px;
  flex-wrap: wrap;
`;

export const TeamText = styled.h2`
  font-size: 20.488px;
  font-style: normal;
  font-weight: 800;
  line-height: 25.609px;
  letter-spacing: -0.512px;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.8) 0%,
    rgba(250, 250, 250, 0.72) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Elp1 = styled.div`
  position: absolute;
  left: 120px;
  top: 232px;
  z-index: 2;
`;

export const Elp2 = styled.div`
  position: absolute;
  right: 59px;
  top: 146px;
  z-index: 1;
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;
