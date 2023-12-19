import 'package:oauth2_client/access_token_response.dart';
import 'package:oauth2_client/oauth2_client.dart';

import '../model/oauth_model.dart';
import 'upload_oauth.dart';

Future<void> handleOAuthFlow(OAuth2Client client, String provider,
    List<String> scopes, String clientId, String? clientSecret) async {
  try {
    AccessTokenResponse val = await client.getTokenWithAuthCodeFlow(
      clientId: clientId,
      scopes: scopes,
      clientSecret: clientSecret,
    );
    print("ici !!");
    if (val.accessToken != null) {
      OAuthModel model = OAuthModel(
        token: val.accessToken!,
        refreshToken: val.refreshToken!,
        provider: provider,
      );
      await uploadOAuth(model);
    }
  } catch (e) {
    return Future.error("error : $e");
  }
}
