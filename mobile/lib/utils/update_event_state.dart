import 'dart:convert';

import 'package:area/model/user_event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> updateEventState(bool enable, UserEvent evt) async {
  var url = Uri.parse("$backendUrl/api/events/${evt.uuid}/activate");
  var request = await http.patch(
    url,
    body: json.encode({"activated": enable}),
    headers: {
      "Authorization": "Bearer ${globals.token}",
      "Content-Type": "application/json",
    },
  );
  if (request.statusCode == 200) {
    print("Event updated");
  } else {
    print("Event not updated");
    return Future.error("error");
  }
}
