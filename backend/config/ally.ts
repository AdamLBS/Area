/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
  google: {
    driver: 'google',
    clientId: Env.get('GOOGLE_CLIENT_ID'),
    clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/google/callback',
  },
  spotify: {
    driver: 'spotify',
    clientId: Env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: Env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/spotify/callback',
    scopes: ['user-read-email', 'user-top-read', 'user-follow-read'],
  },
  github: {
    driver: 'github',
    clientId: Env.get('GITHUB_CLIENT_ID'),
    clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/github/callback',
  },
  discord: {
    driver: 'discord',
    clientId: Env.get('DISCORD_CLIENT_ID'),
    clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/discord/callback',

    // Discord specific
    disableGuildSelect: false,
    permissions: 8,
    // identify scope is always required
    scopes: ['identify', 'email'],
  },
  twitch: {
    driver: 'twitch',
    clientId: Env.get('TWITCH_CLIENT_ID'),
    clientSecret: Env.get('TWITCH_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/twitch/callback',
    scopes: [
      'user:read:email',
      'user:read:follows',
      'user:read:subscriptions',
      'chat:read',
      'chat:edit',
      'channel:read:subscriptions',
      'channel:read:redemptions',
      'channel:manage:redemptions',
      'channel:read:hype_train',
      'user:read:chat',
      'whispers:read',
      'whispers:edit',
      'user:bot',
    ],
  },
}

export default allyConfig
