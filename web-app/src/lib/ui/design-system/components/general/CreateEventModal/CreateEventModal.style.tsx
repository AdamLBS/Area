import styled from 'styled-components';
import { Button, DialogContent } from '@/components/ui';

export const Modal = styled(DialogContent)`
  min-width: 320px;
  width: 100%;
  padding: 24px;
  gap: 16px;
`;

export const EventPanelButton = styled(Button)`
  padding: 10px;
  width: 100%;
  gap: 10px;
`;

export const LabelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  align-self: center;
`;
