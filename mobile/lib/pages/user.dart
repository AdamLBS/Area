import 'package:area/constants.dart';
import 'package:area/oauth/discord.dart';
import 'package:area/oauth/google.dart';
import 'package:area/oauth/spotify.dart';
import 'package:area/oauth/twitch.dart';
import 'package:area/utils/get_loggedin_services.dart';
import 'package:area/utils/handle_oauth.dart';
import 'package:area/widgets/bottom_bar.dart';
import 'package:area/widgets/service_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:oauth2_client/github_oauth2_client.dart';

class UserPage extends StatefulWidget {
  const UserPage({super.key});

  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavBar(index: 1),
        resizeToAvoidBottomInset: false,
        backgroundColor: Color(0xFF09090B),
        body: SingleChildScrollView(
          child: FutureBuilder(
              future: getLoggedInServices(),
              builder: (context, AsyncSnapshot<List<String>> snapshot) {
                if (snapshot.hasData) {
                  return Center(
                    child: Container(
                        padding: EdgeInsets.only(
                            right: 20, left: 20, bottom: 20, top: 50),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                SvgPicture.asset(
                                  "assets/logos/icon.svg",
                                  width: 30,
                                  height: 50,
                                ),
                                SizedBox(width: 10),
                                Text(
                                  "Accounts",
                                  style: TextStyle(
                                    fontSize: 30,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.white,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Spotify",
                                connected: snapshot.data!.contains("spotify"),
                                onTap: () async {
                                  List<String> scopes = [
                                    'user-read-email',
                                    'user-top-read',
                                    'user-follow-read',
                                    'user-read-playback-state',
                                  ];
                                  MySpotifyOAuth2Client client =
                                      MySpotifyOAuth2Client();
                                  await handleOAuthFlow(client, "spotify",
                                      scopes, spotifyClientId, null);
                                  setState(() {});
                                },
                                image: "assets/icons/spotify.svg"),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Discord",
                                connected: snapshot.data!.contains("discord"),
                                onTap: () async {
                                  MyDiscordOAuth2Client client =
                                      MyDiscordOAuth2Client();
                                  List<String> scopes = [
                                    'identify',
                                    'email',
                                  ];
                                  await handleOAuthFlow(
                                      client,
                                      "discord",
                                      scopes,
                                      discordClientId,
                                      discordClientSecret);
                                  setState(() {
                                    getLoggedInServices();
                                  });
                                },
                                image: "assets/icons/discord.svg"),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Google",
                                connected: snapshot.data!.contains("google"),
                                onTap: () async {
                                  List<String> scopes = [
                                    'https://www.googleapis.com/auth/userinfo.email',
                                    'https://www.googleapis.com/auth/userinfo.profile',
                                    'https://www.googleapis.com/auth/gmail.send',
                                    'https://www.googleapis.com/auth/gmail.compose',
                                    'https://www.googleapis.com/auth/gmail.modify',
                                    'https://mail.google.com/'
                                  ];
                                  MyGoogleOAuth2Client client =
                                      MyGoogleOAuth2Client();
                                  await handleOAuthFlow(client, "google",
                                      scopes, googleClientId, null);
                                  setState(() {
                                    getLoggedInServices();
                                  });
                                },
                                image: "assets/icons/google.svg"),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Linkedin",
                                connected: snapshot.data!.contains("linkedin"),
                                onTap: () {},
                                image: "assets/icons/linkedin.svg"),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Twitch",
                                connected: snapshot.data!.contains("twitch"),
                                onTap: () {},
                                image: "assets/icons/twitch.svg"),
                            SizedBox(height: 20),
                            ServiceCard(
                                serviceName: "Github",
                                connected: snapshot.data!.contains("github"),
                                onTap: () async {
                                  GitHubOAuth2Client client =
                                      GitHubOAuth2Client(
                                          redirectUri:
                                              "my.test.app://oauth2redirect",
                                          customUriScheme: "my.test.app");
                                  List<String> scopes = ['user:email'];
                                  await handleOAuthFlow(
                                      client,
                                      "github",
                                      scopes,
                                      githubClientId,
                                      githubClientSecret);
                                  setState(() {
                                    getLoggedInServices();
                                  });
                                },
                                image: "assets/icons/github.svg"),
                          ],
                        )),
                  );
                } else {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                }
              }),
        ));
  }
}
