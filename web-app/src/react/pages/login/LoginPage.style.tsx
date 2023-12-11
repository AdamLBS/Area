import { Button } from '@/components/ui';
import { H3, PrimaryMutted } from '@/lib/ui/design-system';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const RightContainer = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginButton = styled(Button).attrs({
  variant: 'ghost',
})`
  align-self: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 350px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  align-self: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled(H3)`
  text-align: center;
`;

export const Subtitle = styled(PrimaryMutted)`
  text-align: center;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
