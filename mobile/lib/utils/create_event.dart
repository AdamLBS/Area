import 'dart:convert';

import 'package:area/model/event_create_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> createEvent(EventCreationModel event) async {
  var url = Uri.parse("$backendUrl/api/event/create");

  var triggerFieldList = [];
  for (var field in event.triggerEvent!.fields) {
    triggerFieldList.add({
      "name": field.name,
      "value": field.value,
      "required": field.required,
    });
  }
  var triggerApiFields = json.encode(triggerFieldList);
  var responseFieldList = [];
  for (var field in event.responseEvent!.fields) {
    responseFieldList.add({
      "name": field.name,
      "value": field.value,
      "required": field.required,
    });
  }
  var responseApiFields = json.encode(responseFieldList);
  var request = await http.post(
    url,
    body: json.encode({
      "name": event.eventName,
      "description": event.eventDescription,
      "trigger_provider": event.triggerEvent!.provider.toLowerCase(),
      "response_provider": event.responseEvent!.provider.toLowerCase(),
      "triggerInteraction": {
        "id": event.triggerEvent!.id,
        "fields": json.decode(triggerApiFields)
      },
      "responseInteraction": {
        "id": event.responseEvent!.id,
        "fields": json.decode(responseApiFields)
      },
      "additionalActions": [],
    }),
    headers: {
      "Authorization": "Bearer ${globals.token}",
      "Content-Type": "application/json", // Specify content type as JSON
    },
  );

  print(request.body);

  if (request.statusCode == 200) {
    print("Event created");
  } else {
    print("Event not created");
    return Future.error("error");
  }
}
