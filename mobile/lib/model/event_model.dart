class EventModel {
  final String provider;
  final String id;
  final String name;
  late List<Field> fields;
  final Map<String, String> variables;
  EventModel({
    required this.provider,
    required this.id,
    required this.name,
    required this.fields,
    required this.variables,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      provider: json['provider'],
      id: json['id'],
      name: json['name'],
      fields: (json['fields'] as List)
          .map((field) => Field.fromJson(field))
          .toList(),
      variables: Map<String, String>.from(json['variables']),
    );
  }
  @override
  String toString() {
    return 'EventModel{provider: $provider, id: $id, name: $name, fields: $fields variables: $variables}';
  }
}

enum WidgetType { text, select, textarea }

class Field {
  late String value;
  late String name;
  late bool required;
  bool edited = false;
  final WidgetType type;

  Field({
    required this.value,
    required this.name,
    required this.required,
    required this.type,
  });

  factory Field.fromJson(Map<String, dynamic> json) {
    return Field(
      value: json['value'],
      name: json['name'],
      required: json['required'],
      type: json['type'] == 'text'
          ? WidgetType.text
          : json['type'] == 'select'
              ? WidgetType.select
              : WidgetType.textarea,
    );
  }

  @override
  String toString() {
    return 'Field{value: $value, name: $name, required: $required type: $type}';
  }
}
