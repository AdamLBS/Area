import 'package:area/widgets/register_first_page.dart';
import 'package:area/widgets/register_second_page.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  int index = 0;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController passController = TextEditingController();
  final TextEditingController passConfirmController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    if (index == 0) {
      return RegisterFirstPage(
        onChangedStep: (value) {
          setState(() {
            index = value;
          });
        },
        emailController: emailController,
      );
    }
    if (index == 1) {
      return RegisterSecondPage(
          onChangedStep: (value) {
            setState(() {
              index = value;
            });
          },
          nameController: nameController,
          passController: passController,
          passConfirmController: passConfirmController,
          emailController: emailController);
    } else {
      return Placeholder();
    }
  }
}
