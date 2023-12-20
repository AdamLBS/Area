import { Button, Input } from '@/components/ui';
import { Card } from '@/components/ui/card';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const PageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const LeftPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 2;
`;

export const LeftPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1.5em;
  height: 100%;
`;

export const LeftPanelButton = styled(Button)`
  width: 100%;
  gap: 8px;
`;

export const RightPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 6;
`;

export const RightPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  height: 100%;
`;

export const TopBarConfig = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const ConfigPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const ConfigPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  width: 60%;
`;

export const ConfigPanelDropdown = styled(Button)`
  width: 100%;
`;

export const ConfigPanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const ConfigContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FieldContainer = styled.div.attrs({
  className: 'grid w-full max-w-sm items-center gap-1.5',
})`
  align-self: flex-start;
`;

export const InputField = styled(Input)`
  min-width: 460px;
`;
