import 'package:area/model/event_model.dart';

class EventCreationModel {
  late EventModel triggerEvent;
  late EventModel responseEvent;
  late String eventName;
  late String eventDescription;
  EventCreationModel({
    required this.triggerEvent,
    required this.responseEvent,
    required this.eventName,
    required this.eventDescription,
  });
}