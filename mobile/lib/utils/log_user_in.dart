
import 'package:area/constants.dart';
import 'package:http/http.dart' as http;
Future<void> logUserIn(String email, String pass) async {
  var url = Uri.parse("$BACKEND_URL/login");
  var response = await http.post(url, body: {
    "email": email,
    "password": pass,
  });
  if (response.statusCode == 200) {
    print("User logged in");
  } else {
    print("User not logged in");
    return Future.error("error");
  }
}