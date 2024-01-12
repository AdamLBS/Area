import 'package:area/constants.dart';
import 'package:http/http.dart' as http;
import 'package:area/globals.dart' as globals;

Future<void> deleteOAuth(String provider) async {
  var url = Uri.parse("$backendUrl/oauth/$provider/delete");
  var request = await http.delete(url,
      body: {}, headers: {"Authorization": "Bearer ${globals.token}"});
  print(request.body);
  if (request.statusCode == 200) {
    print("OAuth deleted");
  } else {
    print("OAuth not deleted");
    return Future.error("error");
  }
}
