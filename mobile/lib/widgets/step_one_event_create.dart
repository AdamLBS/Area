import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StepOneEventCreate extends StatefulWidget {
  StepOneEventCreate({super.key, required this.onChanged});
  final ValueChanged<int> onChanged;

  @override
  State<StepOneEventCreate> createState() => _StepOneEventCreateState();
}

class _StepOneEventCreateState extends State<StepOneEventCreate> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Event name",
          style: GoogleFonts.inter(
            fontSize: 14,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 10),
        SizedBox(
          height: 40,
          child: TextFormField(
            style: TextStyle(color: Colors.white),
            validator: (value) {
              if (value!.isEmpty) {
                return "Please enter a name";
              }
              return null;
            },
            decoration: InputDecoration(
              filled: true,
              fillColor: Color(0xFF21212B),
              hintText: "Send an email when i'm listening to music",
              hintStyle: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: Color(0xFFA1A1AA),
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
        SizedBox(height: 20),
        Text(
          "Event description",
          style: GoogleFonts.inter(
            fontSize: 14,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 10),
        SizedBox(
          height: 40,
          child: TextFormField(
            style: TextStyle(color: Colors.white),
            validator: (value) {
              if (value!.isEmpty) {
                return "Please enter a description";
              }
              return null;
            },
            decoration: InputDecoration(
              filled: true,
              fillColor: Color(0xFF21212B),
              hintText: "Send an email when i'm listening to music",
              hintStyle: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: Color(0xFFA1A1AA),
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
        Spacer(),
        SizedBox(
          width: double.infinity,
          height: 36,
          child: ElevatedButton(
            onPressed: () {
              widget.onChanged(1);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFF6D28D9),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              minimumSize: Size(double.infinity, 50),
            ),
            child: Text(
              "Continue",
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ),
        SizedBox(height: 10),
        SizedBox(
          width: double.infinity,
          height: 36,
          child: ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFF21212B),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              minimumSize: Size(double.infinity, 50),
            ),
            child: Text(
              "Cancel",
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ),
        SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 15,
              height: 10,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            SizedBox(width: 5),
            Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                color: Color(0xFFA1A1AA),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            SizedBox(width: 5),
            Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                color: Color(0xFFA1A1AA),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ],
        )
      ],
    );
  }
}
