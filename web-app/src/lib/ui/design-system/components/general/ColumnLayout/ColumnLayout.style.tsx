import styled from 'styled-components';
import { H1, H4 } from '@/lib/ui/design-system';
import { IconStratos } from '@/lib/ui/design-system/components/icons/IconStratos.svg';

export const Container = styled.div`
  flex: 1;
  background-color: #18181b;
  padding: 32px;
  align-items: stretch;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 24px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  justify-content: center;
`;

export const ServiceContainer = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const NameContainer = styled(H1)`
  font-size: 48px;
  text-align: center;
`;

export const Description = styled(H4)`
  font-size: 24px;
  text-align: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  padding: 32px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  position: absolute;
`;

export const Logo = styled(IconStratos)`
  width: 260px;
  height: 437.064px;
  top: 101px;
  left: 203px;
  opacity: 0.5;
`;
