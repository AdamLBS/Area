import 'package:area/model/user_event_model.dart';
import 'package:area/utils/get_user_events.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DrawerBridgePage extends StatefulWidget {
  const DrawerBridgePage({super.key});

  @override
  State<DrawerBridgePage> createState() => _DrawerBridgePageState();
}

class _DrawerBridgePageState extends State<DrawerBridgePage> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(color: Color(0xFF09090B),
      padding: EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Your events", style: GoogleFonts.inter(
            fontSize: 20,
            fontWeight: FontWeight.w500,
            color: Colors.white,
          ),),
          SizedBox(height: 10,),
          Text("All of the events you have already created", style: GoogleFonts.inter(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: Color(0xFFA1A1AA),
          )),
          SizedBox(height: 10,),
          FutureBuilder(
            future: getUserEvents(),
            builder: ((context, AsyncSnapshot<List<UserEvent>> snapshot) {
              if (snapshot.hasData) {
                return Text("Loaded");
              } else {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
            }),
          ),
          Spacer(),
          SizedBox(
            width: double.infinity,
            height: 40,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/bridge');
              },
              style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xFF6D28D9),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
              child: Text(
                          "Add a new event",
                          style: GoogleFonts.inter(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.center,
                        ),
            ),
          ),
        ],
      ),),

    );
  }
}