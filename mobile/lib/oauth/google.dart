import 'package:oauth2_client/github_oauth2_client.dart';
import 'package:oauth2_client/oauth2_client.dart';

class MyGoogleOAuth2Client extends OAuth2Client {
  MyGoogleOAuth2Client(
    )
      : super(
            authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenUrl: 'https://oauth2.googleapis.com/token',
            revokeUrl: '"https"://oauth2.googleapis.com/revoke',
            redirectUri: "my.test.app:/oauth2redirect",
            customUriScheme: "my.test.app");
}