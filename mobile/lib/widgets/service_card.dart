import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ServiceCard extends StatefulWidget {
  final String serviceName;
  final String image;
  final bool connected;
  final void Function() onTap;
  const ServiceCard(
      {super.key,
      required this.serviceName,
      required this.connected,
      required this.onTap,
      required this.image});

  @override
  State<ServiceCard> createState() => _ServiceCardState();
}

class _ServiceCardState extends State<ServiceCard> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTap,
      child: Container(
        width: 320,
        padding: EdgeInsets.all(24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: Color(0xFF09090B),
          border: Border.all(
            color: Color(0xFF27272A),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SvgPicture.asset(widget.image),
                SizedBox(width: 10),
                Text(
                  widget.serviceName,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
            SizedBox(height: 10),
            Row(
              children: [
                if (widget.connected)
                  SvgPicture.asset("assets/icons/check.svg"),
                if (widget.connected) SizedBox(width: 5),
                Text(
                  widget.connected ? "Connected" : "Not connected",
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w400,
                    color: widget.connected ? Color(0xFF6D28D9) : Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
