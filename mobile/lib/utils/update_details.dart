import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> updatePassword(TextEditingController oldPassword,
    TextEditingController newPassword) async {
  var url = Uri.parse("$backendUrl/api/user/me/update");
  var request = await http.patch(
    url,
    body: {
      "currentPassword": oldPassword.text,
      "newPassword": newPassword.text,
    },
    headers: {
      "Authorization": "Bearer ${globals.token}",
    },
  );
  if (request.statusCode == 200) {
    print("Password updated");
  } else {
    print("Password not updated");
    print(request.body);
    return Future.error("error");
  }
}

Future<void> updateEmail(TextEditingController email) async {
  var url = Uri.parse("$backendUrl/api/user/me/update");
  var request = await http.patch(
    url,
    body: {
      "email": email.text,
    },
    headers: {
      "Authorization": "Bearer ${globals.token}",
    },
  );
  if (request.statusCode == 200) {
    print("Email updated");
  } else {
    print("Email not updated");
    return Future.error("error");
  }
}

Future<void> updateUsername(TextEditingController username) async {
  var url = Uri.parse("$backendUrl/api/user/me/update");
  var request = await http.patch(
    url,
    body: {
      "username": username.text,
    },
    headers: {
      "Authorization": "Bearer ${globals.token}",
    },
  );
  if (request.statusCode == 200) {
    print("Username updated");
  } else {
    print("Username not updated");
    return Future.error("error");
  }
}
