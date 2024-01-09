import { Button } from '@/components/ui';
import {
  Card,
  CardFooter,
  CardHeader as _CardHeader,
} from '@/components/ui/card';
import styled from 'styled-components';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export const EventPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 354px;
  height: 100%;
`;

export const EventPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%;
`;

export const EventPanelButton = styled(Button)`
  padding: 10px;
  width: 100%;
  gap: 10px;
`;

export const CardHeader = styled(_CardHeader)`
  border-bottom: 1px solid #27272a;
`;

export const LogoRight = styled(ToggleRight)`
  width: 16px;
  height: 16px;
  color: #fff;
`;

export const LogoLeft = styled(ToggleLeft)`
  width: 16px;
  height: 16px;
  color: #fff;
`;

export const EventButton = styled(Button)`
  display: flex;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Footer = styled(CardFooter)`
  padding: 10px;
`;
