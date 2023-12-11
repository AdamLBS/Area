import 'package:area/constants.dart';
import 'package:http/http.dart' as http;
import 'package:area/globals.dart' as globals;

Future<void> logUserIn(String email, String pass) async {
  var url = Uri.parse("$backendUrl/api/auth/login");
  var response = await http.post(url, body: {
    "email": email,
    "password": pass,
  });
  if (response.statusCode == 200) {
    String sessiontoken = response.headers["set-cookie"]!;
    List<String> cookies = sessiontoken.split(";");
    for (var cookie in cookies) {
      if (cookie.contains("adonis-session")) {
        var value = cookie.split("=");
        sessiontoken = value[1];
        globals.sessionCookie = sessiontoken;
        break;
      }
    }
    print("User logged in");
  } else {
    print("User not logged in");
    return Future.error("error");
  }
}
