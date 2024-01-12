import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BottomSheetOAuth extends StatefulWidget {
  const BottomSheetOAuth({super.key});

  @override
  State<BottomSheetOAuth> createState() => _BottomSheetOAuthState();
}

class _BottomSheetOAuthState extends State<BottomSheetOAuth> {
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
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.max,
        children: [
          Center(
            child: Container(
              width: 78,
              height: 4,
              decoration: BoxDecoration(
                color: Color(0xFFFFFFFF).withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          SizedBox(
            height: 32,
          ),
          Text(
            "Do you want to update or delete this account?",
            style: GoogleFonts.inter(
              fontSize: 14,
              color: Color(0xFFA1A1AA),
            ),
          ),
          SizedBox(
            height: 32,
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
              onPressed: () {
                Navigator.of(context).pop(0);
              },
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
                onPressed: () {
                  Navigator.of(context).pop(1);
                },
                child: Text(
                  "Delete",
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          Spacer(),
        ],
      ),
    );
  }
}