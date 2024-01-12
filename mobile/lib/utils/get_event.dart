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
    print(responseJson);
    List<dynamic> additionalActions = responseJson["additionalActions"];
    List<EventModel> additionalActionsList = [];
    for (var action in additionalActions) {
      additionalActionsList.add(EventModel.fromJsonAdditional(action));
    }
    EventCreationModel evt = EventCreationModel(
        eventName: responseJson["name"],
        eventDescription: responseJson["description"],
        triggerEvent: EventModel.fromJson(
            jsonDecode(responseJson["triggerInteraction"]), ""),
        responseEvent: EventModel.fromJson(
            jsonDecode(responseJson["responseInteraction"]), ""),
        additionalActions: additionalActionsList);
    print(evt.responseEvent);
    return evt;
  } else {
    print("Error while getting trigger events");
    return Future.error("error");
  }
}
