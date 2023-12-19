import 'package:area/constants.dart';
import 'package:area/oauth/discord.dart';
import 'package:area/oauth/google.dart';
import 'package:area/oauth/spotify.dart';
import 'package:area/utils/handle_oauth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:oauth2_client/github_oauth2_client.dart';

import '../widgets/bottom_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavBar(index: 0),
        resizeToAvoidBottomInset: false,
        backgroundColor: Color(0xFF09090B),
        body: Center(
          child: Container(
              padding:
                  EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 50),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SvgPicture.asset(
                        "assets/logos/icon.svg",
                        width: 30,
                        height: 50,
                      ),
                      SizedBox(width: 10),
                      Text(
                        "Dashboard",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  ElevatedButton(
                      onPressed: () async {
                        List<String> scopes = [
                          'https://www.googleapis.com/auth/userinfo.email',
                          'https://www.googleapis.com/auth/userinfo.profile'
                        ];
                        MyGoogleOAuth2Client client = MyGoogleOAuth2Client();
                        await handleOAuthFlow(
                            client, "google", scopes, googleClientId, null);
                      },
                      child: Text("Se connecter à Google")),
                  ElevatedButton(
                      onPressed: () async {
                        List<String> scopes = [
                          'user-read-email',
                          'user-top-read',
                          'user-follow-read'
                        ];
                        MySpotifyOAuth2Client client = MySpotifyOAuth2Client();
                        await handleOAuthFlow(
                            client, "spotify", scopes, spotifyClientId, null);
                      },
                      child: Text("Se connecter à Spotify")),
                  ElevatedButton(
                      onPressed: () async {
                        GitHubOAuth2Client client = GitHubOAuth2Client(
                            redirectUri: "my.test.app://oauth2redirect",
                            customUriScheme: "my.test.app");
                        List<String> scopes = ['user:email'];
                        await handleOAuthFlow(client, "github", scopes,
                            githubClientId, githubClientSecret);
                      },
                      child: Text("Se connecter à Github")),
                  ElevatedButton(
                      onPressed: () async {
                        // MyTwitchOAuth2Client client = MyTwitchOAuth2Client();
                        // List<String> scopes = [
                        //   'user:read:email',
                        //   'user:read:follows',
                        //   'channel:read:subscriptions'
                        // ];
                        // await handleOAuthFlow(client, "github", scopes,
                        //     githubClientId, githubClientSecret);
                      },
                      child: Text("Se connecter à Twitch")),
                  ElevatedButton(
                      onPressed: () async {
                        MyDiscordOAuth2Client client = MyDiscordOAuth2Client();
                        List<String> scopes = [
                          'identify',
                          'email',
                        ];
                        await handleOAuthFlow(client, "discord", scopes,
                            discordClientId, discordClientSecret);
                      },
                      child: Text("Se connecter à Discord")),
                ],
              )),
        ));
  }
}
