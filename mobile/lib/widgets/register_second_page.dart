import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class RegisterSecondPage extends StatefulWidget {
  const RegisterSecondPage({super.key});

  @override
  State<RegisterSecondPage> createState() => _RegisterSecondPageState();
}

class _RegisterSecondPageState extends State<RegisterSecondPage> {
  final nameController = TextEditingController();
  final passController = TextEditingController();
  final passConfirmController = TextEditingController();
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
                  "Enter your username and your password",
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
                    controller: nameController,
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "Please enter an username";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                        labelText: "Username",
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
                SizedBox(height: 8),
                SizedBox(
                  height: 40,
                  child: TextFormField(
                    controller: passController,
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "Please enter a password";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                        labelText: "Password",
                        labelStyle: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                          color: Color(0xFFA1A1AA),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        contentPadding: EdgeInsets.all(10.0)),
                    obscureText: true,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Colors.white,
                    ),
                  ),
                ),
                SizedBox(height: 8),
                SizedBox(
                  height: 40,
                  child: TextFormField(
                    controller: passConfirmController,
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "Please confirm your password";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                        labelText: "Confirm Password",
                        labelStyle: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                          color: Color(0xFFA1A1AA),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        contentPadding: EdgeInsets.all(10.0)),
                    obscureText: true,
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
                    if (nameController.text.isEmpty ||
                        passController.text.isEmpty ||
                        passConfirmController.text.isEmpty) {
                      setState(() {
                        errorMessage = "Please fill all the fields";
                      });
                      return;
                    } else if (passController.text !=
                        passConfirmController.text) {
                      setState(() {
                        errorMessage = "Passwords are not the same";
                      });
                      return;
                    } else {
                      setState(() {
                        errorMessage = "";
                      });
                    }
                    // set request to api
                  },
                  child: Text(
                    "Confirm sign up",
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
                    Navigator.of(context).pushNamed("/register");
                    // set index to 0

                  },
                  child: Text(
                    "Cancel",
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
