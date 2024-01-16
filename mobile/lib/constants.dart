import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Color purpleBackground = Color(0xFF6D28D9);
String backendUrl = dotenv.env['BACKEND_URL'] ?? "";
String googleClientId = dotenv.env['GOOGLE_CLIENT_ID'] ?? "";
String googleClientSecret = dotenv.env['GOOGLE_CLIENT_SECRET'] ?? "";
String spotifyClientId = dotenv.env['SPOTIFY_CLIENT_ID'] ?? "";
String spotifyClientSecret = dotenv.env['SPOTIFY_CLIENT_SECRET'] ?? "";
String githubClientId = dotenv.env['GITHUB_CLIENT_ID'] ?? "";
String githubClientSecret = dotenv.env['GITHUB_CLIENT_SECRET'] ?? "";
String twitchClientId = dotenv.env['TWITCH_CLIENT_ID'] ?? "";
String twitchClientSecret = dotenv.env['TWITCH_CLIENT_SECRET'] ?? "";
String discordClientId = dotenv.env['DISCORD_CLIENT_ID'] ?? "";
String discordClientSecret = dotenv.env['DISCORD_CLIENT_SECRET'] ?? "";
