import styled from 'styled-components';
import { Button, Dialog, DialogContent, DialogHeader } from '@/components/ui';

export const DialogContainer = styled(Dialog)`
  width: 100%;
  max-width: 445px;
  min-width: 320px;
  padding: 24px;
`;

export const Modal = styled(DialogContent)`
  max-width: 445px;
  min-width: 320px;
  width: 100%;
  padding: 24px;
  gap: 16px;
`;

export const Header = styled(DialogHeader)`
  gap: 6px;
  flex-direction: column;
`;

export const EventPanelButton = styled(Button)`
  padding: 10px;
  width: 100%;
  gap: 10px;
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 24px;
`;

export const LabelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Pagination = styled.div`
  justify-content: center;
  display: flex;
  gap: 5px;
`;
