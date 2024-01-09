import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SpotifyProvider from 'next-auth/providers/spotify';
import GithubProvider from 'next-auth/providers/github';
import DisordProvider from 'next-auth/providers/discord';
import TwitchProvider from 'next-auth/providers/twitch';
import LinkedinProvider from 'next-auth/providers/linkedin';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'openid email profile https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify',
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read,user-follow-read,user-read-playback-state,user-library-read',
      httpOptions: {
        timeout: 10000,
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000,
      },
    }),
    DisordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000,
      },
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope:
            'openid user:read:email user:read:follows channel:read:subscriptions user:edit',
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account) {
        return `/settings?option=accounts&provider=${account.provider}&token=${account.access_token}&refreshToken=${account.refresh_token}`;
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
