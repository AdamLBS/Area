/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

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
  }
}
