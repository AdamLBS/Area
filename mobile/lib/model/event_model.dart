class EventModel {
  final String provider;
  final String id;
  final String name;
  late List<Field> fields;
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
      fields: (json['fields'] as List)
          .map((field) => Field.fromJson(field))
          .toList(),
    );
  }
  @override
  String toString() {
    return 'EventModel{provider: $provider, id: $id, name: $name, fields: $fields}';
  }
}

class Field {
  late String value;
  late String name;
  late bool required;
  bool edited = false;

  Field({
    required this.value,
    required this.name,
    required this.required,
  });

  factory Field.fromJson(Map<String, dynamic> json) {
    return Field(
      value: json['value'],
      name: json['name'],
      required: json['required'],
    );
  }

  @override
  String toString() {
    return 'Field{value: $value, name: $name, required: $required}';
  }
}
