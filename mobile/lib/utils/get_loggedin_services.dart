import 'dart:convert';

import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<List<String>> getLoggedInServices() async {
  var url = Uri.parse("$backendUrl/api/user/me/services");
  var request = await http.get(url, headers: {
    "Authorization": "Bearer ${globals.token}"
  });
  if (request.statusCode == 200) {
    var json = jsonDecode(request.body);
    List<String> services = [];
    for (var service in json) {
      services.add(service["provider"]);
    }
    print("Logged in services: $services");
    return services;
  } else {
    print("Error while getting logged in services");
    return Future.error("error");
  }
}