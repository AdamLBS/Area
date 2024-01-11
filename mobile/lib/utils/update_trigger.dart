import 'dart:convert';

import 'package:area/model/event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> updateTrigger(EventModel evt, String uuid) async {
  var url = Uri.parse("$backendUrl/api/event/$uuid/trigger/update");
  var fieldList = [];
  for (var field in evt.fields) {
    fieldList.add({
      "name": field.name,
      "value": field.value,
      "required": field.required,
    });
  }
  var fields = json.encode(fieldList);
  var request = await http.patch(
    url,
    body: json.encode({
      "trigger_provider": evt.provider.toLowerCase(),
      "triggerInteraction": {
        "id": evt.id,
        "fields": json.decode(fields)
      },
    }),
    headers: {
      "Authorization": "Bearer ${globals.token}",
      "Content-Type": "application/json",
    },
  );
  if (request.statusCode == 200) {
    print("Action updated");
  } else {
    print("Action trigger not updated");
    print(request.body);
    return Future.error("error");
  }
}