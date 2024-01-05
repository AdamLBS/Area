import 'dart:convert';

import 'package:area/model/user_event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<List<UserEvent>> getUserEvents() async {
  List<UserEvent> events = [];
  var url = Uri.parse("$backendUrl/api/user/events");
  var request = await http
      .get(url, headers: {"Authorization": "Bearer ${globals.token}"});
  if (request.statusCode == 200) {
    var json = jsonDecode(request.body);
    for (var event in json) {
      events.add(UserEvent.fromJson(event));
    }
    return events;
  } else {
    print("Error while getting user events");
    return Future.error("error");
  }
}
