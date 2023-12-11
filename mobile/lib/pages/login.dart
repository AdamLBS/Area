import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/log_user_in.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passController = TextEditingController();
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
                  "Sign In",
                  style: GoogleFonts.inter(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
                Text(
                  "Enter your account access below to sign in",
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
                      return null;
                    },
                    decoration: InputDecoration(
                        labelText: "Email",
                        labelStyle: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                          color: Color(0xFFA1A1AA),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        errorStyle: TextStyle(height: 0),
                        contentPadding: EdgeInsets.all(10.0),
                        prefixIcon: Icon(Icons.email)),
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
                        contentPadding: EdgeInsets.all(10.0),
                        prefixIcon: Icon(Icons.lock)),
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
                    if (emailController.text.isEmpty ||
                        passController.text.isEmpty) {
                      setState(() {
                        errorMessage = "Please fill all fields";
                      });
                      return;
                    }
                    try {
                      await logUserIn(
                          emailController.text, passController.text);
                          if (context.mounted) {
                            Navigator.of(context).pushReplacementNamed("/home");
                          }
                    } catch (e) {
                      print(e);
                      setState(() {
                        errorMessage = "Wrong email or password";
                      });
                      return;
                    }
                  },
                  child: Text(
                    "Sign In",
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
                  },
                  child: Text(
                    "I don't have an account",
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
