class OAuthModel {
  final String token;
  final String refreshToken;
  final String provider;
  OAuthModel({
    required this.token,
    required this.refreshToken,
    required this.provider,
  });
}
