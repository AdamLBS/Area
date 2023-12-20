import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class CardWidget extends StatefulWidget {
  final String title;
  final String description;
  final String image;
  final VoidCallback onTap;
  const CardWidget(
      {super.key,
      required this.title,
      required this.description,
      required this.image,
      required this.onTap});

  @override
  State<CardWidget> createState() => _CardWidgetState();
}

class _CardWidgetState extends State<CardWidget> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTap,
      child: Container(
        width: 320,
        padding: EdgeInsets.all(20),
        height: 138,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: Color(0xFF09090B),
          border: Border.all(
            color: Color(0xFF27272A),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Row(
                  children: [
                    SvgPicture.asset(widget.image),
                    SizedBox(width: 10),
                    Text(
                      widget.title,
                      style: GoogleFonts.inter(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.white),
                    ),
                  ],
                ),
                InkWell(
                  onTap: widget.onTap,
                  child: SvgPicture.asset(
                    "assets/icons/right_arrow.svg",
                    width: 20,
                    height: 20,
                  ),
                )
              ],
            ),
            SizedBox(height: 6),
            Text(
              widget.description,
              style: GoogleFonts.inter(fontSize: 14, color: Color(0xFFA1A1AA)),
            ),
          ],
        ),
      ),
    );
  }
}
