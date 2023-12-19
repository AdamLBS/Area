import 'package:oauth2_client/oauth2_client.dart';

class MySpotifyOAuth2Client extends OAuth2Client {
  MySpotifyOAuth2Client()
      : super(
            authorizeUrl: 'https://accounts.spotify.com/authorize',
            tokenUrl: 'https://accounts.spotify.com/api/token',
            redirectUri: "my.test.app:/oauth2redirect",
            customUriScheme: "my.test.app");
}