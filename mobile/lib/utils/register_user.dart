import 'package:area/constants.dart';
import 'package:http/http.dart' as http;

Future<void> signUserUp(
    String email, String username, String pass, String passConfirm) async {
  var url = Uri.parse("$backendUrl/api/auth/register");
  print(email);
  print(username);
  print(pass);
  print(passConfirm);
  var response = await http.post(url, body: {
    "email": email,
    "username": username,
    "password": pass,
    "password_confirmation": passConfirm,
  });
  if (response.statusCode == 200) {
    print("User registered in");
  } else {
    print(response.body);
    print("User not logged in");
    return Future.error("error");
  }
}
