import 'dart:convert';

import 'package:area/model/event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> createEvent(EventModel triggerApi, EventModel responseApi) async {
  var url = Uri.parse("$backendUrl/api/event/create");

  var triggerApiFields = jsonEncode(triggerApi.fields);
  var responseApiFields = jsonEncode(responseApi.fields);

  var request = await http.post(
    url,
    body: json.encode({
      "trigger_provider": triggerApi.provider,
      "response_provider": responseApi.provider,
      "triggerInteraction": {
        "id": triggerApi.id,
        "fields": json
            .decode(triggerApiFields), // Decode the JSON string back to a map
      },
      "responseInteraction": {
        "id": responseApi.id,
        "fields": json
            .decode(responseApiFields), // Decode the JSON string back to a map
      }
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
