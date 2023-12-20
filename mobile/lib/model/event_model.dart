class EventModel {
  final String provider;
  final String id;
  final String name;
  final Map<String, dynamic> fields;
  EventModel({
    required this.provider,
    required this.id,
    required this.name,
    required this.fields,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      provider: json['provider'],
      id: json['id'],
      name: json['name'],
      fields: json['fields'],
    );
  }
}
