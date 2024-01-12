import 'package:area/model/user_event_model.dart';
import 'package:area/utils/delete_event.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Future<T?> showDialogDeleteEvent<T>(UserEvent evt, BuildContext context) async {
  return showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        backgroundColor: Color(0xFF080809),
        surfaceTintColor: Color(0xFF09090B),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: BorderSide(
            color: Color(0xFF27272A),
          ),
        ),
        title: Align(
          alignment: Alignment.topLeft,
          child: Text(
            "Delete an event",
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
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text("Do you want to delete this event ?",
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFFA1A1AA),
                      ),
                      textAlign: TextAlign.center),
                  SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 40,
                    child: ElevatedButton(
                      onPressed: () async {
                        await deleteEvent(evt);
                        if (context.mounted) {
                          Navigator.of(context).pop(true);
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF7F1D1D),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text(
                        "Delete",
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: Color(0xFFA1A1AA),
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
                        Navigator.of(context).pop(false);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF09090B),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text(
                        "Cancel",
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: Color(0xFFA1A1AA),
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      );
    });
}