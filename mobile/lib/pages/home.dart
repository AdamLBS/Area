import 'package:area/widgets/card_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

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
                  SizedBox(height: 20),
                  CardWidget(
                      title: "Bridge",
                      description:
                          "Bridge service allows to you to link different API",
                      image: "assets/icons/bridge.svg",
                      onTap: () {}),
                  SizedBox(height: 10),
                  CardWidget(
                      title: "Gateway",
                      description:
                          "Gateway service allows to you to add and configure your API",
                      image: "assets/icons/gateway.svg",
                      onTap: () {}),
                  SizedBox(height: 10),
                  CardWidget(
                      title: "Watch",
                      description:
                          "You can see all results about your different events",
                      image: "assets/icons/watch.svg",
                      onTap: () {}),
                ],
              )),
        ));
  }
}
