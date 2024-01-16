import 'package:area/constants.dart';
import 'package:area/model/user_event_model.dart';
import 'package:http/http.dart' as http;
import 'package:area/globals.dart' as globals;

Future<void> deleteEvent(UserEvent evt) async {
  var url = Uri.parse("$backendUrl/api/events/${evt.uuid}/delete");
  var request = await http
      .delete(url, headers: {"Authorization": "Bearer ${globals.token}"});
  if (request.statusCode == 200) {
    print("Event deleted");
  } else {
    print("Event not deleted");
    return Future.error("error");
  }
}
