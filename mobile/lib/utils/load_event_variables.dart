import 'package:area/model/event_model.dart';
import 'package:area/utils/get_trigger_apis.dart';

Future<EventModel> loadEventTriggerVariables(EventModel event) async {
  List<EventModel> events = await getTriggerApis();
  for (var evt in events) {
    if (evt.id == event.id &&
        evt.provider.toLowerCase() == event.provider.toLowerCase()) {
      EventModel newEvent = EventModel(
          provider: event.provider,
          id: event.id,
          name: event.name,
          fields: event.fields,
          variables: evt.variables);
      return newEvent;
    }
  }
  return Future.error("error");
}
