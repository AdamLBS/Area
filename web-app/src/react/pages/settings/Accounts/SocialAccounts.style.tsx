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
  gap: 1.25em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const IconDiscordStyled = styled(IconDiscord)`
  width: 2em;
  height: 2em;
`;

export const IconGithubStyled = styled(IconGithub)`
  width: 2em;
  height: 2em;
`;

export const IconGoogleStyled = styled(IconGoogle)`
  width: 2em;
  height: 2em;
`;

export const IconLinkedinStyled = styled(IconLinkedin)`
  width: 2em;
  height: 2em;
`;

export const IconSpotifyStyled = styled(IconSpotify)`
  width: 2em;
  height: 2em;
`;

export const IconTwitchStyled = styled(IconTwitch)`
  width: 2em;
  height: 2em;
`;

export const SocialCardContainer = styled.div`
  max-width: 17.3125em;
`;
