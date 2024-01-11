import 'dart:convert';

import 'package:area/model/event_model.dart';
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
import 'package:http/http.dart' as http;

Future<void> addNewAction(EventModel evt, String uuid) async {
  var url = Uri.parse("$backendUrl/api/event/$uuid/action/add");
  var fieldList = [];
  for (var field in evt.fields) {
    fieldList.add({
      "name": field.name,
      "value": field.value,
      "required": field.required,
    });
  }
  var fieldsJson = json.encode(fieldList);
  print("fields !!!: " + fieldsJson);
  var request = await http.post(
    url,
    body: json.encode({
      "action_provider": evt.provider.toLowerCase(),
      "id": evt.id,
      "fields": json.decode(fieldsJson),
    }),
    headers: {
      "Authorization": "Bearer ${globals.token}",
      "Content-Type": "application/json",
    },
  );
  if (request.statusCode == 200) {
    print("Action action updated");
  } else {
    print("Action add not updated");
    print(request.body);
    return Future.error("error");
  }
}
