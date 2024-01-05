import 'package:area/model/event_create_model.dart';
import 'package:area/widgets/bottom_bar.dart';
import 'package:area/widgets/drawer_bridge.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class EventCreatePage extends StatefulWidget {
  const EventCreatePage({super.key});

  @override
  State<EventCreatePage> createState() => _EventCreatePageState();
}

class _EventCreatePageState extends State<EventCreatePage> {
  late EventCreationModel eventCreationModel;
  int page = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        endDrawer: Theme(
          data: Theme.of(context).copyWith(
            canvasColor: Color(0xFF09090B),
          ),
          child: DrawerBridgePage(),
        ),
        bottomNavigationBar: BottomNavBar(index: 1),
        body: Builder(
          builder: (context) {
            return Container(
              padding:
                  EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SvgPicture.asset(
                        "assets/icons/bridge.svg",
                        width: 30,
                        height: 50,
                      ),
                      SizedBox(width: 10),
                      Text(
                        "Bridge",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      Spacer(),
                      InkWell(
                        onTap: () {
                          Scaffold.of(context).openEndDrawer();
                        },
                        child: Icon(
                          Icons.menu,
                          color: Colors.white,
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 20),
                  Text("Create a new event", style: GoogleFonts.inter(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),),
                  Text("Let's start by giving a name to your event", style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFFA1A1AA),
                  ),),
                  SizedBox(height: 20),
                if (page == 0) StepOneEventCreate(),
                ],
              ),
            );
          },
        ));
  }
}

class StepOneEventCreate extends StatefulWidget {
  const StepOneEventCreate({super.key});

  @override
  State<StepOneEventCreate> createState() => _StepOneEventCreateState();
}

class _StepOneEventCreateState extends State<StepOneEventCreate> {
  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.start, crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text("Event name", style: GoogleFonts.inter(
        fontSize: 14,
        color: Colors.white,
      ),),
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
              borderRadius:
                  BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
          ),
        ),
      ),
      SizedBox(height: 20),
      Text("Event description", style: GoogleFonts.inter(
        fontSize: 14,
        color: Colors.white,
      ),),
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
              borderRadius:
                  BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
          ),
        ),
      ),
    ],);
  }
}