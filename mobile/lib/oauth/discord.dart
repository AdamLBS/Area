import 'package:oauth2_client/oauth2_client.dart';

class MyDiscordOAuth2Client extends OAuth2Client {
  MyDiscordOAuth2Client()
      : super(
            authorizeUrl: 'https://discord.com/api/oauth2/authorize',
            tokenUrl: 'https://discord.com/api/oauth2/token',
            redirectUri: "my.test.app:/oauth2redirect",
            customUriScheme: "my.test.app");
}
