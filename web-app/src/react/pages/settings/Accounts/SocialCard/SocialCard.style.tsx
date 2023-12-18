import styled from 'styled-components';
import { Button } from '@/components/ui/button';

export const SocialCardContainer = styled(Button)`
  display: flex;
  flex-direction: column;
  min-width: 277px;
  min-height: 106px;
  width: 100%;
  height: 100%;
  gap: 6px;
  align-items: flex-start;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
