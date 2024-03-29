// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../constants.dart';

class BottomNavBar extends StatefulWidget {
  final int index;
  const BottomNavBar({super.key, required this.index});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        BottomAppBar(
          color: Color(0xFF09090B),
          surfaceTintColor: Color(0xFF09090B),
          shape: AutomaticNotchedShape(RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
            Radius.circular(25),
          ))),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                onTap: () {
                  if (widget.index != 0) {
                    changePage('/home');
                  }
                },
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: SvgPicture.asset(
                    "assets/icons/home.svg",
                    color: widget.index == 0
                        ? purpleBackground
                        : Color(0xFFFAFAFA),
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  if (widget.index != 1) {
                    changePage('/bridge');
                  }
                },
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: SvgPicture.asset(
                    "assets/icons/bridge_bottom.svg",
                    color: widget.index == 1
                        ? purpleBackground
                        : Color(0xFFFAFAFA),
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  if (widget.index != 2) {
                    changePage('/settings');
                  }
                },
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: SvgPicture.asset(
                    "assets/icons/settings.svg",
                    color: widget.index == 2
                        ? purpleBackground
                        : Color(0xFFFAFAFA),
                  ),
                ),
              ),
            ],
          ),
        ),
        Divider(
          thickness: 0.2,
        ),
      ],
    );
  }

  void changePage(String name) {
    Navigator.pushReplacementNamed(context, name);
  }
}
