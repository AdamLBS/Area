import 'package:area/model/user_model.dart';
import 'package:area/utils/get_user_infos.dart';
import 'package:area/utils/update_details.dart';
import 'package:area/widgets/password_modal.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  TextEditingController username = TextEditingController();
  TextEditingController email = TextEditingController();
  TextEditingController oldPassword = TextEditingController();
  TextEditingController password = TextEditingController();
  TextEditingController passwordConfirm = TextEditingController();
  String errorMessage = "";
  String successMessage = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Color(0xFF09090B),
        body: Container(
            padding: EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 50),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      "assets/logos/icon.svg",
                      width: 30,
                      height: 50,
                    ),
                    SizedBox(width: 10),
                    Text(
                      "Profile",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
                FutureBuilder(
                    future: getUserInfos(),
                    builder: (context, AsyncSnapshot<UserModel> snapshot) {
                      if (snapshot.hasData) {
                        return Column(
                          children: [
                            Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  SizedBox(
                                    height: 30,
                                  ),
                                  Text(
                                    "Username",
                                    textAlign: TextAlign.left,
                                    style: GoogleFonts.inter(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w400,
                                      color: Color(0xFFA1A1AA),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      controller: username,
                                      style: TextStyle(color: Colors.white),
                                      validator: (value) {
                                        if (value!.isEmpty) {
                                          return "Please enter a username";
                                        }
                                        return null;
                                      },
                                      decoration: InputDecoration(
                                        filled: true,
                                        fillColor: Color(0xFF21212B),
                                        hintText: snapshot.data!.username,
                                        hintStyle: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: Color(0xFFA1A1AA),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          borderSide: BorderSide.none,
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 8,
                                  ),
                                  Text(
                                      "This is your username and display name. You can only change this once every 30 days",
                                      textAlign: TextAlign.left,
                                      style: GoogleFonts.inter(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w400,
                                        color: Color(0xFFA1A1AA),
                                      )),
                                  SizedBox(
                                    height: 32,
                                  ),
                                  Text(
                                    "Email",
                                    textAlign: TextAlign.left,
                                    style: GoogleFonts.inter(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w400,
                                      color: Color(0xFFA1A1AA),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  SizedBox(
                                    height: 40,
                                    child: TextFormField(
                                      controller: email,
                                      style: TextStyle(color: Colors.white),
                                      validator: (value) {
                                        if (value!.isEmpty) {
                                          return "Please enter an email";
                                        }
                                        return null;
                                      },
                                      decoration: InputDecoration(
                                        filled: true,
                                        fillColor: Color(0xFF21212B),
                                        hintText: snapshot.data!.email,
                                        hintStyle: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: Color(0xFFA1A1AA),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          borderSide: BorderSide.none,
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 8,
                                  ),
                                  Text(
                                      "This is your email address. You can only change this once every 30 days",
                                      textAlign: TextAlign.left,
                                      style: GoogleFonts.inter(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w400,
                                        color: Color(0xFFA1A1AA),
                                      )),
                                  SizedBox(
                                    height: 32,
                                  ),
                                  InkWell(
                                    onTap: () async {
                                      if (context.mounted) {
                                        await showPasswordModal(oldPassword,
                                            password, passwordConfirm, context);
                                        oldPassword.clear();
                                        password.clear();
                                        passwordConfirm.clear();
                                        setState(() {
                                          errorMessage = "";
                                          successMessage = "";
                                        });
                                      }
                                    },
                                    child: Center(
                                      child: Container(
                                        constraints: BoxConstraints(
                                          minWidth: double.infinity,
                                          minHeight: 36,
                                        ),
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          color: Color(0xFF27272A),
                                        ),
                                        padding: EdgeInsets.all(10),
                                        child: Text(
                                          "Update password",
                                          style: GoogleFonts.inter(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w500,
                                            color: Colors.white,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 8,
                                  ),
                                  if (errorMessage.isNotEmpty)
                                    Center(
                                      child: Text(
                                        errorMessage,
                                        style: TextStyle(color: Colors.red),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  if (successMessage.isNotEmpty)
                                    Center(
                                      child: Text(
                                        successMessage,
                                        style: TextStyle(color: Colors.green),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                ]),
                          ],
                        );
                      } else {
                        print(snapshot.error);
                        return CircularProgressIndicator();
                      }
                    }),
                Spacer(),
                Align(
                    alignment: Alignment.bottomCenter,
                    child: SizedBox(
                      width: double.infinity,
                      height: 40,
                      child: ElevatedButton(
                        onPressed: () async {
                          if (username.text.isEmpty && email.text.isEmpty) {
                            setState(() {
                              errorMessage =
                                  "Please enter a username or an email";
                            });
                            return;
                          }
                          if (username.text.isNotEmpty &&
                              username.text.length < 3) {
                            setState(() {
                              errorMessage =
                                  "Please enter a username with at least 3 characters";
                            });
                            return;
                          }
                          if (email.text.isNotEmpty &&
                              !email.text.contains("@")) {
                            setState(() {
                              errorMessage = "Please enter a valid email";
                            });
                            return;
                          }
                          if (username.text.isNotEmpty) {
                            try {
                              await updateUsername(username);
                            } catch (e) {
                              setState(() {
                                errorMessage =
                                    "An error occured. Please try again.";
                              });
                              return;
                            }
                          }
                          if (email.text.isNotEmpty) {
                            try {
                              await updateEmail(email);
                            } catch (e) {
                              setState(() {
                                errorMessage =
                                    "An error occured. Please try again.";
                              });
                              return;
                            }
                          }
                          setState(() {
                            errorMessage = "";
                            successMessage = "Your data has been updated";
                          });
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xFF6D28D9),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                        child: Text(
                          "Apply",
                          style: GoogleFonts.inter(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ))
              ],
            )));
  }
}
