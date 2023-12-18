import styled from 'styled-components';
import {
  IconDiscord,
  IconGithub,
  IconGoogle,
  IconLinkedin,
  IconSpotify,
  IconTwitch,
} from '@/lib/ui/design-system';

export const MainContainer = styled.div`
  width: fit-content;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const IconDiscordStyled = styled(IconDiscord)`
  width: 32px;
  height: 32px;
`;

export const IconGithubStyled = styled(IconGithub)`
  width: 32px;
  height: 32px;
`;

export const IconGoogleStyled = styled(IconGoogle)`
  width: 32px;
  height: 32px;
`;

export const IconLinkedinStyled = styled(IconLinkedin)`
  width: 32px;
  height: 32px;
`;

export const IconSpotifyStyled = styled(IconSpotify)`
  width: 32px;
  height: 32px;
`;

export const IconTwitchStyled = styled(IconTwitch)`
  width: 32px;
  height: 32px;
`;
