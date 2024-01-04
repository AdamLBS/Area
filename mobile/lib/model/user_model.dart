class UserModel {
  final String uuid;
  final String email;
  final String username;
  final String? rememberMeToken;
  final DateTime createdAt;
  final DateTime updatedAt;
  UserModel({
    required this.uuid,
    required this.email,
    required this.username,
    required this.rememberMeToken,
    required this.createdAt,
    required this.updatedAt,
  });
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      uuid: json['uuid'],
      email: json['email'],
      username: json['username'],
      rememberMeToken: json['remember_me_token'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }
}
