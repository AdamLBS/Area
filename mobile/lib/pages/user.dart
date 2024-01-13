import 'package:area/constants.dart';
import 'package:area/oauth/discord.dart';
import 'package:area/oauth/google.dart';
import 'package:area/oauth/spotify.dart';
import 'package:area/utils/delete_oauth.dart';
import 'package:area/utils/get_loggedin_services.dart';
import 'package:area/utils/handle_oauth.dart';
import 'package:area/widgets/bottom_sheet_oauth.dart';
import 'package:area/widgets/service_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:oauth2_client/github_oauth2_client.dart';

class AccountPage extends StatefulWidget {
  const AccountPage({super.key});

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                            right: 20, left: 20, bottom: 20, top: 20),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
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
                                    'user-library-read',
                                  ];

                                  MySpotifyOAuth2Client client =
                                      MySpotifyOAuth2Client();
                                  if (snapshot.data!.contains("spotify")) {
                                    await showModalBottomSheet(
                                        context: context,
                                        backgroundColor: Colors.transparent,
                                        builder: (context) {
                                          return BottomSheetOAuth();
                                        }).then((value) async {
                                      if (value != null && value == 0) {
                                        await handleOAuthFlow(client, "spotify",
                                            scopes, spotifyClientId, null);
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Spotify account updated")));
                                        }
                                      } else if (value != null && value == 1) {
                                        await deleteOAuth("spotify");
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Spotify account deleted")));
                                        }
                                      }
                                    });
                                  } else {
                                    await handleOAuthFlow(client, "spotify",
                                        scopes, spotifyClientId, null);
                                  }
                                  setState(() {
                                    getLoggedInServices();
                                  });
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
                                  if (snapshot.data!.contains("discord")) {
                                    await showModalBottomSheet(
                                        context: context,
                                        backgroundColor: Colors.transparent,
                                        builder: (context) {
                                          return BottomSheetOAuth();
                                        }).then((value) async {
                                      if (value != null && value == 0) {
                                        await handleOAuthFlow(
                                            client,
                                            "discord",
                                            scopes,
                                            discordClientId,
                                            discordClientSecret);
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Discord account updated")));
                                        }
                                      } else if (value != null && value == 1) {
                                        await deleteOAuth("discord");
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Discord account deleted")));
                                        }
                                      }
                                    });
                                  } else {
                                    await handleOAuthFlow(
                                        client,
                                        "discord",
                                        scopes,
                                        discordClientId,
                                        discordClientSecret);
                                  }
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
                                    'https://mail.google.com/',
                                    'https://www.googleapis.com/auth/youtube'
                                  ];
                                  MyGoogleOAuth2Client client =
                                      MyGoogleOAuth2Client();
                                  if (snapshot.data!.contains("google")) {
                                    await showModalBottomSheet(
                                        context: context,
                                        backgroundColor: Colors.transparent,
                                        builder: (context) {
                                          return BottomSheetOAuth();
                                        }).then((value) async {
                                      if (value != null && value == 0) {
                                        await handleOAuthFlow(client, "google",
                                            scopes, googleClientId, null);
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Google account updated")));
                                        }
                                      } else if (value != null && value == 1) {
                                        await deleteOAuth("google");
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Google account deleted")));
                                        }
                                      }
                                    });
                                  } else {
                                    await handleOAuthFlow(client, "google",
                                        scopes, googleClientId, null);
                                  }
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
                                  if (snapshot.data!.contains("github")) {
                                    await showModalBottomSheet(
                                        context: context,
                                        backgroundColor: Colors.transparent,
                                        builder: (context) {
                                          return BottomSheetOAuth();
                                        }).then((value) async {
                                      if (value != null && value == 0) {
                                        await handleOAuthFlow(
                                            client,
                                            "github",
                                            scopes,
                                            githubClientId,
                                            githubClientSecret);
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Github account updated")));
                                        }
                                      } else if (value != null && value == 1) {
                                        await deleteOAuth("github");
                                        if (context.mounted) {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Github account deleted")));
                                        }
                                      }
                                    });
                                  } else {
                                    await handleOAuthFlow(
                                        client,
                                        "github",
                                        scopes,
                                        githubClientId,
                                        githubClientSecret);
                                  }
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
