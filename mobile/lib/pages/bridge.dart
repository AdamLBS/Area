// ignore_for_file: unused_local_variable

import 'package:area/widgets/bottom_bar.dart';
import 'package:area/widgets/drawer_bridge.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';


class BridgePage extends StatefulWidget {
  const BridgePage({super.key});

  @override
  State<BridgePage> createState() => _BridgePageState();
}

class _BridgePageState extends State<BridgePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        endDrawer: Theme(
          data: Theme.of(context).copyWith(
            canvasColor: Color(0xFF09090B),
          ),
          child: DrawerBridgePage(),
        ),
        bottomNavigationBar: BottomNavBar(index: 1),
        body: Builder(builder: (context) {
          return Container(
              padding:
                  EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SvgPicture.asset(
                        "assets/icons/bridge.svg",
                        width: 30,
                        height: 50,
                      ),
                      SizedBox(width: 10),
                      Text(
                        "Bridge",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      Spacer(),
                      InkWell(
                        onTap: () {
                          Scaffold.of(context).openEndDrawer();
                        },
                        child: Icon(
                          Icons.menu,
                          color: Colors.white,
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                    "On this page you can link different API to use them together.",
                    style: GoogleFonts.inter(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFFA1A1AA),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 20),
                  Text(
                    "Trigger API",
                    style: GoogleFonts.inter(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: Colors.white),
                  ),
                  SizedBox(height: 20),
                ],
              ));
        }));
  }
}
