import 'package:area/model/oauth_model.dart';
import 'package:area/constants.dart';
import 'package:http/http.dart' as http;
import 'package:area/globals.dart' as globals;

Future<void> uploadOAuth(OAuthModel model) async {
  var url = Uri.parse("$backendUrl/oauth/${model.provider}/save");
  var request = await http.post(url, body: {
    "token": model.token,
    "refreshToken": model.refreshToken,
    "oauthUserId": "eee",
  }, headers: {
    "Authorization": "Bearer ${globals.token}"
  });
  print(request.body);
  if (request.statusCode == 200) {
    print("OAuth saved");
  } else {
    print("OAuth not saved");
    return Future.error("error");
  }
}
