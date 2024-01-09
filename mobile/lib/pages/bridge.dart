// ignore_for_file: unused_local_variable

import 'package:area/model/event_create_model.dart';
import 'package:area/model/user_event_model.dart';
import 'package:area/utils/get_event.dart';
import 'package:area/utils/get_user_events.dart';
import 'package:area/widgets/bottom_bar.dart';
import 'package:area/widgets/drawer_bridge.dart';
import 'package:area/widgets/show_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class BridgePage extends StatefulWidget {
  const BridgePage({super.key});

  @override
  State<BridgePage> createState() => _BridgePageState();
}

class _BridgePageState extends State<BridgePage> {
  EventCreationModel? selectedEvt;
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
        body: Builder(builder: (context) {
          return Container(
              padding:
                  EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
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
                  Text(
                    "Your events",
                    style: GoogleFonts.inter(
                      fontSize: 20,
                      fontWeight: FontWeight.w500,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Text("All of the events you have already created",
                      style: GoogleFonts.inter(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFFA1A1AA),
                      )),
                  SizedBox(
                    height: 10,
                  ),
                  if (selectedEvt == null)
                    FutureBuilder(
                      future: getUserEvents(),
                      builder:
                          ((context, AsyncSnapshot<List<UserEvent>> snapshot) {
                        if (snapshot.hasData) {
                          if (snapshot.data!.isEmpty) {
                            return Center(
                              child: Text(
                                "You don't have any event yet",
                                style: GoogleFonts.inter(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400,
                                  color: Color(0xFFA1A1AA),
                                ),
                              ),
                            );
                          } else {
                            return ListView.builder(
                              shrinkWrap: true,
                              itemCount: snapshot.data!.length,
                              itemBuilder: (context, index) {
                                return ElevatedButton(
                                  onPressed: () async {
                                    selectedEvt = await getEventByUuid(
                                        snapshot.data![index].uuid);
                                    setState(() {});
                                  },
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor:
                                        Colors.transparent, //TODO: A modif
                                    minimumSize: Size.zero,
                                    padding: EdgeInsets.zero,

                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                  ),
                                  child: Container(
                                    padding: EdgeInsets.only(
                                        left: 16,
                                        right: 16,
                                        top: 12,
                                        bottom: 12),
                                    child: Row(children: [
                                      if (snapshot.data![index].active == true)
                                        SvgPicture.asset(
                                          "assets/icons/enabled_button.svg",
                                          height: 16,
                                          width: 16,
                                        ),
                                      if (snapshot.data![index].active == false)
                                        SvgPicture.asset(
                                          "assets/icons/disabled_button.svg",
                                          height: 16,
                                          width: 16,
                                        ),
                                      SizedBox(
                                        width: 8,
                                      ),
                                      Text(
                                        snapshot.data![index].name,
                                        style: GoogleFonts.inter(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ]),
                                  ),
                                );
                              },
                            );
                          }
                        } else {
                          return Center(
                            child: CircularProgressIndicator(),
                          );
                        }
                      }),
                    ),
                  if (selectedEvt == null) Spacer(),
                  if (selectedEvt == null)
                    SizedBox(
                      width: double.infinity,
                      height: 40,
                      child: ElevatedButton(
                        onPressed: () {
                          Scaffold.of(context).closeEndDrawer();
                          Navigator.pushNamed(context, '/eventcreate');
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
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      if (selectedEvt != null)
                        Center(
                          child: ShowEvent(
                            event: selectedEvt!,
                          ),
                        )
                    ],
                  )
                ],
              ));
        }));
  }
}
