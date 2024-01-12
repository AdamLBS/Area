class UserEvent {
  final String uuid;
  bool active;
  final String name;
  UserEvent({
    required this.uuid,
    required this.active,
    required this.name,
  });

  factory UserEvent.fromJson(Map<String, dynamic> json) {
    return UserEvent(
      uuid: json['uuid'],
      active: json['active'],
      name: json['name'],
    );
  }
  set activeState(bool state) {
    active = state;
  }
}
