import 'package:area/model/event_create_model.dart';
import 'package:area/widgets/bottom_bar.dart';
import 'package:area/widgets/drawer_bridge.dart';
import 'package:area/widgets/step_one_event_create.dart';
import 'package:area/widgets/step_three_event_create.dart';
import 'package:area/widgets/step_two_event_create.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class EventCreatePage extends StatefulWidget {
  const EventCreatePage({super.key});

  @override
  State<EventCreatePage> createState() => _EventCreatePageState();
}

class _EventCreatePageState extends State<EventCreatePage> {
  EventCreationModel eventCreationModel = EventCreationModel();
  int page = 0;
  List<String> _titles = [
    "Let's start by giving a name to your event",
    "Now, let's choose the service that will trigger your event",
    "Finally, let's choose the action that will be triggered"
  ];
  @override
  Widget build(BuildContext context) {
    onChanged(int value) {
      setState(() {
        page = value;
      });
    }

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
                  Text(
                    "Create a new bridge",
                    style: GoogleFonts.inter(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    _titles[page],
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Color(0xFFA1A1AA),
                    ),
                  ),
                  SizedBox(height: 20),
                  if (page == 0)
                    Expanded(
                        child: StepOneEventCreate(
                      onChanged: onChanged,
                      eventCreationModel: eventCreationModel,
                    )),
                  if (page == 1)
                    Expanded(
                        child: StepTwoEventCreate(
                      onChanged: onChanged,
                      eventCreationModel: eventCreationModel,
                    )),
                  if (page == 2)
                    Expanded(
                        child: StepThreeEventCreate(
                      onChanged: onChanged,
                      eventCreationModel: eventCreationModel,
                    )),
                ],
              ),
            );
          },
        ));
  }
}
