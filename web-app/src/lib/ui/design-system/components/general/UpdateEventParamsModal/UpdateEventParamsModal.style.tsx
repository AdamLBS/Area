import styled from 'styled-components';
import { DialogDescription } from '@/components/ui';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const DialogDescriptionStyled = styled(DialogDescription)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
