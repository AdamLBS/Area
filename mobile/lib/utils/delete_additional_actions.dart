import 'dart:convert';

import 'package:area/model/user_event_model.dart';
import 'package:http/http.dart' as http;
import 'package:area/constants.dart';
import 'package:area/globals.dart' as globals;
Future<void> deleteAdditionalAction(UserEvent evt, int index) async {
  var url = Uri.parse("$backendUrl/api/event/${evt.uuid}/action/delete");
  var request = await http.delete(url, headers: {
    "Authorization": "Bearer ${globals.token}",
    "Content-Type": "application/json"
  }, body: jsonEncode({"id": index}));
  if (request.statusCode == 200) {
    print("Additional action deleted");
  } else {
    print("Error while deleting additional action");
    return Future.error("error");
  }
}