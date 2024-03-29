import styled from 'styled-components';
import { H1, H3 } from '@/lib/ui/design-system';
import { IconStratos } from '@/lib/ui/design-system/components/icons/IconStratos.svg';

export const Container = styled.div<{ colorOfBackground: string }>`
  flex: 1;
  background-color: ${(props) => props.colorOfBackground};
  padding: 32px;
  height: 100vh;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 24px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 18px;
  align-items: center;
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

export const NameContainer = styled(H1)`
  font-size: 48px;
  text-align: center;
`;

export const Description = styled(H3)`
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
  opacity: 0.5;
`;
