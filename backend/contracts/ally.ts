import { TwitchDriver, TwitchDriverConfig } from 'adonis-ally-twitch/build/src/TwitchDriver'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    google: {
      config: GoogleDriverConfig
      implementation: GoogleDriverContract
    }
    spotify: {
      config: SpotifyDriverConfig
      implementation: SpotifyDriverContract
    }
    github: {
      config: GithubDriverConfig
      implementation: GithubDriverContract
    }
    discord: {
      config: DiscordDriverConfig
      implementation: DiscordDriverContract
    }
    twitch: {
      config: TwitchDriverConfig
      implementation: TwitchDriver
    }
  }
}
