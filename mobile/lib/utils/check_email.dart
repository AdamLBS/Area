import 'package:area/constants.dart';
import 'package:http/http.dart' as http;

Future<void> checkUserEmail(String email) async {
  var url = Uri.parse("$backendUrl/api/auth/register/verify/step/1");
  print(url);
  var response = await http.post(url, body: {
    "email": email,
  });
  print(url);
  if (response.body == "false") {
    print("Email is valid");
    print(response.body);
  } else {
    print("Email is not valid");
    print(response.body);
    return Future.error("error");
  }
}
