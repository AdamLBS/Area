import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

import '../widgets/bottom_bar.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavBar(index: 2),
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
                        "Settings",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  SizedBox(height: 24),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Color(0xFF27272A),
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(children: [
                      InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, '/profile');
                        },
                        child: Container(
                          padding: EdgeInsets.all(10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    "Profile",
                                    style: GoogleFonts.inter(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                              Icon(
                                Icons.arrow_forward_ios,
                                color: Color(0xFFFAFAFA),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Divider(
                        color: Color(0xFF27272A),
                      ),
                      InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, '/accounts');
                        },
                        child: Container(
                          padding: EdgeInsets.all(10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    "Account",
                                    style: GoogleFonts.inter(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                              Icon(
                                Icons.arrow_forward_ios,
                                color: Color(0xFFFAFAFA),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Divider(
                        color: Color(0xFF27272A),
                      ),
                      InkWell(
                        onTap: () {
                          Navigator.pushNamed(context, '/settings');
                        },
                        child: Container(
                          padding: EdgeInsets.all(10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    "App Settings",
                                    style: GoogleFonts.inter(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                              Icon(
                                Icons.arrow_forward_ios,
                                color: Color(0xFFFAFAFA),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ]),
                  ),
                ],
              )),
        ));
  }
}
