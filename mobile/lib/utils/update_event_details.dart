import 'dart:convert';

import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:area/model/event_create_model.dart';
import 'package:http/http.dart' as http;
Future<void> updateEventDetails(EventCreationModel evt, String uuid) async {
  var url = Uri.parse("$backendUrl/api/event/update/$uuid");
  var request = await http.patch(
    url,
    body: json.encode({
      "name": evt.eventName,
      "description": evt.eventDescription,
    }),
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