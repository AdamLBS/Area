import styled from 'styled-components';
import { H3, H4, PrimaryMediumMutted } from '@/lib/ui/design-system';
import { Button } from '@/components/ui';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.25em;
`;

export const Title = styled(H3)`
  text-align: start;
`;

export const SubTitle = styled(PrimaryMediumMutted)`
  text-align: start;
`;

export const Separator = styled.hr`
  margin: 1.5em 0 0;
  border: 0;
  border-top: 1px solid #27272a;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-top: 1.25em;
  gap: 3em;
`;

export const SettingsOptions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: flex-start;
  width: 25%;
  gap: 0.25em;
`;

export const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const ButtonOption = styled(Button)`
  justify-content: flex-start;
  width: 100%;
`;

export const SettingsContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`;

export const SettingsContentBody = styled.div`
  width: 100%;
  margin-top: 1.25em;
`;