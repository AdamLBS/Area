import 'dart:convert';

import 'package:area/model/event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<List<EventModel>> getTriggerApis() async {
  var url = Uri.parse("$backendUrl/api/events/trigger");
  var request = await http
      .get(url, headers: {"Authorization": "Bearer ${globals.token}"});
  if (request.statusCode == 200) {
    var json = jsonDecode(request.body);
    List<EventModel> events = [];
    for (var provider in json) {
      var data = (provider["interactions"]);
      for (var interaction in data) {
        events.add(EventModel.fromJson(interaction));
      }
    }
    print("Trigger events: $events");
    return events;
  } else {
    print("Error while getting trigger events");
    return Future.error("error");
  }
}
