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
  UserEvent? selectedUserEvt;
  Future<List<UserEvent>>? userEvents;
  int listSize = -1;
  @override
  void initState() {
    userEvents = getUserEvents();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    void refresh() {
      selectedEvt = null;
      selectedUserEvt = null;
      userEvents = getUserEvents();
      setState(() {});
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
        body: LayoutBuilder(builder: (context, constraint) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraint.maxHeight),
              child: IntrinsicHeight(
                child: Container(
                    padding: EdgeInsets.only(
                        right: 20, left: 20, bottom: 20, top: 20),
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
                        if (selectedEvt == null)
                          SizedBox(
                            height: 20,
                          ),
                        Text(
                          selectedEvt == null ? "Your events" : "",
                          style: GoogleFonts.inter(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                            color: Colors.white,
                          ),
                        ),
                        if (selectedEvt == null)
                          SizedBox(
                            height: 10,
                          ),
                        if (selectedEvt == null)
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
                            future: userEvents,
                            builder: ((context,
                                AsyncSnapshot<List<UserEvent>> snapshot) {
                              if (snapshot.hasData) {
                                if (snapshot.data!.isEmpty) {
                                  listSize = snapshot.data!.length;
                                  WidgetsBinding.instance
                                      .addPostFrameCallback((_) {
                                    setState(() {
                                      listSize = snapshot.data!.length;
                                    });
                                  });
                                  return Container();
                                } else {
                                  listSize = snapshot.data!.length;
                                  print(listSize);
                                  List<Widget> widgets = [];
                                  for (var i = 0;
                                      i < snapshot.data!.length;
                                      i++) {
                                    widgets.add(ElevatedButton(
                                      onPressed: () async {
                                        selectedEvt = await getEventByUuid(
                                            snapshot.data![i].uuid);
                                        setState(() {
                                          selectedUserEvt = snapshot.data![i];
                                        });
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor:
                                            Colors.transparent, //TODO: A modif
                                        minimumSize: Size.zero,
                                        padding: EdgeInsets.zero,

                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                      ),
                                      child: Container(
                                        padding: EdgeInsets.only(
                                            left: 16,
                                            right: 16,
                                            top: 12,
                                            bottom: 12),
                                        child: Row(children: [
                                          if (snapshot.data![i].active == true)
                                            SvgPicture.asset(
                                              "assets/icons/enabled_button.svg",
                                              height: 16,
                                              width: 16,
                                            ),
                                          if (snapshot.data![i].active == false)
                                            SvgPicture.asset(
                                              "assets/icons/disabled_button.svg",
                                              height: 16,
                                              width: 16,
                                            ),
                                          SizedBox(
                                            width: 8,
                                          ),
                                          Text(
                                            snapshot.data![i].name,
                                            style: GoogleFonts.inter(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w500,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ]),
                                      ),
                                    ));
                                    widgets.add(SizedBox(height: 10));
                                  }
                                  return Column(
                                    children: widgets,
                                  );
                                }
                              } else {
                                return Center(
                                  child: CircularProgressIndicator(),
                                );
                              }
                            }),
                          ),
                        if (listSize == 0) Spacer(),
                        if (listSize == 0)
                          Center(
                            child: Text(
                              "You don't have any event yet",
                              style: GoogleFonts.inter(
                                fontSize: 14,
                                fontWeight: FontWeight.w400,
                                color: Color(0xFFA1A1AA),
                              ),
                            ),
                          ),
                        if (selectedEvt == null) Spacer(),
                        if (selectedEvt == null)
                          SizedBox(
                            width: double.infinity,
                            height: 40,
                            child: ElevatedButton(
                              onPressed: () {
                                Scaffold.of(context).closeEndDrawer();
                                Navigator.pushNamed(context, '/eventcreate')
                                    .then((value) {
                                  setState(() {
                                    userEvents = getUserEvents();
                                  });
                                });
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Color(0xFF6D28D9),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  SvgPicture.asset("assets/icons/plus.svg"),
                                  SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    "Add a new event",
                                    style: GoogleFonts.inter(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        if (selectedEvt != null && selectedUserEvt != null)
                          ShowEvent(
                            event: selectedEvt!,
                            userEvent: selectedUserEvt!,
                            refresh: refresh,
                          )
                      ],
                    )),
              ),
            ),
          );
        }));
  }
}
