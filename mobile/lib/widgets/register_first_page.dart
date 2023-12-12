import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class RegisterFirstPage extends StatefulWidget {
  const RegisterFirstPage({super.key, required this.onChangedStep});
  final ValueChanged<int> onChangedStep;
  @override
  State<RegisterFirstPage> createState() => _RegisterFirstPageState();
}

class _RegisterFirstPageState extends State<RegisterFirstPage> {
  final emailController = TextEditingController();
  String errorMessage = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Color(0xFF09090B),
        body: Center(
          child: Container(
            padding: EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SvgPicture.asset("assets/logos/icon.svg"),
                Spacer(),
                Text(
                  "Sign Up",
                  style: GoogleFonts.inter(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
                Text(
                  "Enter your account access below to sign up",
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFFA1A1AA),
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: 30,
                ),
                SizedBox(
                  height: 40,
                  child: TextFormField(
                    controller: emailController,
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "Please enter an email";
                      }
                      final emailRegex = RegExp(
                          r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
                      if (!emailRegex.hasMatch(value)) {
                        return "Please enter a valid email";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                        labelText: "name@exemple.com",
                        labelStyle: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                          color: Color(0xFFA1A1AA),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        errorStyle: TextStyle(height: 0),
                        contentPadding: EdgeInsets.all(10.0)),
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Colors.white,
                    ),
                  ),
                ),
                if (errorMessage != "") SizedBox(height: 8),
                if (errorMessage != "")
                  Text(
                    errorMessage,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Colors.red,
                    ),
                  ),
                Spacer(),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: purpleBackground,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    minimumSize: Size(double.infinity, 36),
                  ),
                  onPressed: () async {
                    if (emailController.text.isEmpty) {
                      setState(() {
                        errorMessage = "Please fill the email fields";
                      });
                      return;
                    } else {
                      widget.onChangedStep(1);
                    }
                    // set request  api
                  },
                  child: Text(
                    "Sign Up",
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF09090B),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      side: BorderSide(color: Color(0xFF27272A)),
                    ),
                    minimumSize: Size(double.infinity, 36),
                  ),
                  onPressed: () {
                    Navigator.of(context).pushNamed("/login");
                  },
                  child: Text(
                    "I already have an account",
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
