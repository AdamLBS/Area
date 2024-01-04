import 'package:area/utils/update_details.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Future<void> showPasswordModal(
    TextEditingController oldPassword,
    TextEditingController password,
    TextEditingController passwordConfirm,
    BuildContext context) async {
  return showDialog(
    context: context,
    builder: (context) {
      String errorMessage = "";
      return AlertDialog(
        backgroundColor: Color(0xFF09090B),
        title: Center(
          child: Text(
            "Update password",
            style: GoogleFonts.inter(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        content: StatefulBuilder(builder: (context, setState) {
          return SingleChildScrollView(
            child: Container(
              constraints: BoxConstraints(minWidth: 320),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(
                    height: 40,
                    child: TextFormField(
                      style: TextStyle(color: Colors.white),
                      controller: oldPassword,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter your old password";
                        }
                        return null;
                      },
                      obscureText: true,
                      decoration: InputDecoration(
                        filled: true,
                        hintText: "Current password",
                        fillColor: Color(0xFF21212B),
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
                  SizedBox(
                    height: 40,
                    child: TextFormField(
                      style: TextStyle(color: Colors.white),
                      controller: password,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter your new password";
                        }
                        return null;
                      },
                      obscureText: true,
                      decoration: InputDecoration(
                        filled: true,
                        hintText: "New password",
                        fillColor: Color(0xFF21212B),
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
                  SizedBox(
                    height: 40,
                    child: TextFormField(
                      style: TextStyle(color: Colors.white),
                      controller: passwordConfirm,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please confirm your new password";
                        }
                        return null;
                      },
                      obscureText: true,
                      decoration: InputDecoration(
                        filled: true,
                        hintText: "Confirm new password",
                        fillColor: Color(0xFF21212B),
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
                  SizedBox(
                    width: double.infinity,
                    height: 40,
                    child: ElevatedButton(
                      onPressed: () async {
                        if (password.text != passwordConfirm.text) {
                          setState(() {
                            errorMessage =
                                "The new passwords do not match. Please try again.";
                          });
                          return;
                        }
                        if (password.text.length < 8) {
                          setState(() {
                            errorMessage =
                                "The new password must be at least 8 characters long.";
                          });
                          return;
                        }
                        try {
                          await updatePassword(oldPassword, password);
                          if (context.mounted) {
                            Navigator.of(context).pop();
                          }
                        } catch (e) {
                          setState(() {
                            errorMessage =
                                "An error occured. Please check that the old password is correct and try again.";
                          });
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF6D28D9),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text(
                        "Update password",
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 40,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF21212B),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text(
                        "Cancel",
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  if (errorMessage.isNotEmpty) SizedBox(height: 20),
                  Text(
                    errorMessage,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Colors.red,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          );
        }),
      );
    },
  );
}
