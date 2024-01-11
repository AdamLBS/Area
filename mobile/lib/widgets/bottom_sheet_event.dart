import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BottomSheetEventEdit extends StatefulWidget {
  const BottomSheetEventEdit({super.key});

  @override
  State<BottomSheetEventEdit> createState() => _BottomSheetEventEditState();
}

class _BottomSheetEventEditState extends State<BottomSheetEventEdit> {
  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(maxHeight: 300),
      decoration: BoxDecoration(
        color: Color(0xFF09090B),
        borderRadius: BorderRadius.circular(10),
      ),
      padding: EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.max,
        children: [
          Text(
            "Do you want to update or delete this event?",
            style: GoogleFonts.inter(
              fontSize: 14,
              color: Color(0xFFA1A1AA),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          SizedBox(
            width: double.infinity,
            height: 40,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF6D28D9),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onPressed: () {},
              child: Text(
                "Update",
                style: GoogleFonts.inter(
                  fontSize: 14,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          SizedBox(
            width: double.infinity,
            height: 40,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF7F1D1D),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onPressed: () {},
              child: Text(
                "Delete",
                style: GoogleFonts.inter(
                  fontSize: 14,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
