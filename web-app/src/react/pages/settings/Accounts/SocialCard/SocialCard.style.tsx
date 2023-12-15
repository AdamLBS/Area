import styled from 'styled-components';
import { Button } from '@/components/ui/button';

export const SocialCardContainer = styled(Button)`
  display: flex;
  flex-direction: column;
  min-width: 17.3125em;
  min-height: 6.625em;
  width: 100%;
  height: 100%;
  gap: 0.375em;
  align-items: flex-start;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625em;
  align-items: center;
`;
