import 'dart:convert';

import 'package:area/model/event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> editAdditionalAction(
    EventModel evt, String uuid, int index) async {
  var url = Uri.parse("$backendUrl/api/event/$uuid/additionalAction/update");
  var fieldList = [];
  for (var field in evt.fields) {
    fieldList.add({
      "name": field.name,
      "value": field.value,
      "required": field.required,
    });
  }
  var fieldsJson = json.encode(fieldList);
  var request = await http.patch(
    url,
    body: json.encode({
      "action_provider": evt.provider.toLowerCase(),
      "id": evt.id,
      "fields": json.decode(fieldsJson),
      "index": index,
    }),
    headers: {
      "Authorization": "Bearer ${globals.token}",
      "Content-Type": "application/json",
    },
  );
  if (request.statusCode == 200) {
    print("Additonal action updated");
  } else {
    print("Action Additonal not updated");
    print(request.body);
    return Future.error("error");
  }
}
