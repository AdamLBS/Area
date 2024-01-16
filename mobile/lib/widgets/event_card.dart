import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class EventCard extends StatelessWidget {
  final String name;
  final String desc;
  const EventCard({super.key, required this.name, required this.desc});

  @override
  Widget build(BuildContext context) {
    Map<String, String> svgs = {
      "github": "assets/icons/github.svg",
      "google": "assets/icons/google.svg",
      "twitch": "assets/icons/twitch.svg",
      "youtube": "assets/icons/youtube.svg",
      "discord": "assets/icons/discord.svg",
      "linkedin": "assets/icons/linkedin.svg",
      "microsoft": "assets/icons/microsoft.svg",
      "spotify": "assets/icons/spotify.svg",
      "crypto": "assets/icons/bitcoin.svg",
      "timer": "assets/icons/timer.svg",
    };
    return Container(
      constraints: BoxConstraints(minHeight: 102),
      decoration: BoxDecoration(
        border: Border.all(
          color: Color(0xFF27272A).withOpacity(0.5),
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      padding: EdgeInsets.all(24),
      child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Container(
                  padding: EdgeInsets.all(7),
                  decoration: BoxDecoration(
                    color: Color(0xFF94A3B8),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: SvgPicture.asset(
                    height: 32,
                    width: 32,
                    svgs[name.toLowerCase()]!,
                    color: Colors.white,
                  ),
                ),
                SizedBox(
                  width: 10,
                ),
                Text(
                  name[0].toUpperCase() + name.substring(1).toLowerCase(),
                  style: GoogleFonts.inter(
                    fontSize: 20,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              desc,
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.w400,
                color: Color(0xFFA1A1AA),
              ),
            ),
          ]),
    );
  }
}
