import 'package:oauth2_client/oauth2_client.dart';

class MyTwitchOAuth2Client extends OAuth2Client {
  MyTwitchOAuth2Client()
      : super(
            authorizeUrl: 'https://id.twitch.tv/oauth2/authorize',
            tokenUrl: 'https://id.twitch.tv/oauth2/token',
            redirectUri: "my.test.app:/oauth2redirect",
            customUriScheme: "my.test.app");
}