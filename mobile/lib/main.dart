import 'package:area/pages/bridge.dart';
import 'package:area/pages/home.dart';
import 'package:area/pages/login.dart';
import 'package:area/pages/profile.dart';
import 'package:area/pages/settings.dart';
import 'package:area/pages/user.dart';
import 'package:flutter/material.dart';

import 'pages/register.dart';
import 'utils/transition.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: MaterialApp(
        title: 'Stratos',
        theme: ThemeData(
          useMaterial3: true,
          pageTransitionsTheme: PageTransitionsTheme(
            builders: {
              TargetPlatform.android: CustomTransitionBuilder(),
              TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
            },
          ),
          colorScheme: ColorScheme.fromSeed(seedColor: Color(0xFF09090B))
              .copyWith(background: Color(0xFF09090B)),
        ),
        home: LoginPage(),
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/login':
              return MaterialPageRoute(builder: (context) => LoginPage());
            case '/register':
              return MaterialPageRoute(builder: (context) => RegisterPage());
            case '/home':
              return MaterialPageRoute(builder: (context) => HomePage());
            case '/accounts':
              return MaterialPageRoute(builder: (context) => AccountPage());
            case '/settings':
              return MaterialPageRoute(builder: (context) => SettingsPage());
            case '/bridge':
              return MaterialPageRoute(builder: (context) => BridgePage());
            case '/profile':
              return MaterialPageRoute(builder: (context) => ProfilePage());
            default:
              return MaterialPageRoute(builder: (context) => LoginPage());
          }
        },
      ),
    );
  }
}
