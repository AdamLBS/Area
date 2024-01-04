import 'dart:convert';

import 'package:area/constants.dart';
import 'package:area/model/user_model.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<UserModel> getUserInfos() async {
  var url = Uri.parse("$backendUrl/api/user/me");
  var request = await http
      .get(url, headers: {"Authorization": "Bearer ${globals.token}"});
  if (request.statusCode == 200) {
    var json = jsonDecode(request.body);
    UserModel user = UserModel.fromJson(json['user']);
    return user;
  } else {
    print("Error while getting user infos");
    return Future.error("error");
  }
}
