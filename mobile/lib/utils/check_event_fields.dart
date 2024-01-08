import 'package:area/model/event_model.dart';

bool checkEventFields(EventModel evt) {
  for (var field in evt.fields) {
    if (field.value.isEmpty && field.required) {
      return false;
    }
  }
  return true;
}