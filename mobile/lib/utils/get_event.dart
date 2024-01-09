import 'package:area/model/event_create_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:area/model/event_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<EventCreationModel> getEventByUuid(String uuid) async {
  var url = Uri.parse("$backendUrl/api/events/$uuid");
  var request = await http
      .get(url, headers: {"Authorization": "Bearer ${globals.token}"});
  if (request.statusCode == 200) {
    var responseJson = jsonDecode(request.body);
    EventCreationModel evt = EventCreationModel(
        eventName: responseJson["name"],
        eventDescription: responseJson["description"],
        triggerEvent: EventModel.fromJson(
            jsonDecode(responseJson["triggerInteraction"]),
            responseJson["provider"]),
        responseEvent: EventModel.fromJson(
            jsonDecode(responseJson["responseInteraction"]),
            responseJson["provider"]));
    print(evt.responseEvent);
    return evt;
  } else {
    print("Error while getting trigger events");
    return Future.error("error");
  }
}
