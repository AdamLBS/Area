import 'dart:convert';

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
    print(response.body);
    var token = JsonDecoder().convert(response.body)["token"];
    globals.token = token;
    var url = Uri.parse("$backendUrl/api/user/me");
    var secResponse =
        await http.get(url, headers: {"Authorization": 'Bearer $token'});
    print(secResponse.body);
    print("User logged in");
  } else {
    print("User not logged in");
    return Future.error("error");
  }
}
