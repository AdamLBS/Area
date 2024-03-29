import { Button, CardContent, CardHeader } from '@/components/ui';
import styled from 'styled-components';
import { Boxes } from 'lucide-react';

export const CardContainer = styled(Button)`
  display: flex;
  flex-direction: column;
  max-width: 491px;
  min-width: 445px;
  height: 100%;
  width: 100%;
  padding: 24px;
  gap: 6px;
  align-items: flex-start;
`;

export const Header = styled(CardHeader)`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  gap: 6px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Redirection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  padding: 11px;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border-radius: 7px;
  background: #7c3aed;
  size: icon;
`;

export const IconBox = styled(Boxes)`
  width: 40px;
  height: 40px;
  color: #fff;
`;

export const Content = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0px;
  padding-top: 6px;
`;
