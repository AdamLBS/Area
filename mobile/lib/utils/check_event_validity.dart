import 'package:area/model/event_create_model.dart';

bool checkEventValidity(EventCreationModel event) {
  if (event.eventName == null ||
      event.eventName!.isEmpty ||
      event.eventDescription == null ||
      event.eventDescription!.isEmpty ||
      event.triggerEvent == null ||
      event.responseEvent == null) {
    return false;
  }
  return true;
}
