import 'package:area/widgets/register_first_page.dart';
import 'package:area/widgets/register_second_page.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  int index = 1;
  @override
  Widget build(BuildContext context) {
    if (index == 0)
      return RegisterFirstPage();
    else if (index == 1)
      return RegisterSecondPage();
    else
      return Placeholder();
  }
}
