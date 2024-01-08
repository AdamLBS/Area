import 'package:area/model/event_model.dart';

class EventCreationModel {
  EventModel? triggerEvent;
  EventModel? responseEvent;
  String? eventName;
  String? eventDescription;
  EventCreationModel({
    this.triggerEvent,
    this.responseEvent,
    this.eventName,
    this.eventDescription,
  });
}
