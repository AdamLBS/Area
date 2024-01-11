import 'package:area/model/user_event_model.dart';
import 'package:area/utils/get_user_events.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
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
      child: Container(
        color: Color(0xFF09090B),
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
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
            FutureBuilder(
              future: getUserEvents(),
              builder: ((context, AsyncSnapshot<List<UserEvent>> snapshot) {
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
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.transparent, //TODO: A modif
                            minimumSize: Size.zero,
                            padding: EdgeInsets.zero,

                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          child: Container(
                            padding: EdgeInsets.only(
                                left: 16, right: 16, top: 12, bottom: 12),
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
            Spacer(),
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
          ],
        ),
      ),
    );
  }
}
