// ignore_for_file: deprecated_member_use

import 'package:area/model/event_create_model.dart';
import 'package:area/model/event_model.dart';
import 'package:area/model/user_event_model.dart';
import 'package:area/utils/delete_additional_actions.dart';
import 'package:area/widgets/bottom_sheet_event.dart';
import 'package:area/widgets/event_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class ShowEvent extends StatefulWidget {
  const ShowEvent({super.key, required this.event, required this.userEvent});
  final EventCreationModel event;
  final UserEvent userEvent;

  @override
  State<ShowEvent> createState() => _ShowEventState();
}

class _ShowEventState extends State<ShowEvent> {
  @override
  Widget build(BuildContext context) {
    print(widget.event.responseEvent!.name);
    return Column(
      children: [
        Container(
          constraints: BoxConstraints(minHeight: 102, minWidth: 320),
          decoration: BoxDecoration(
            border: Border.all(
              color: Color(0xFF94A3B8).withOpacity(0.5),
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          padding: EdgeInsets.all(24),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Text(
                      widget.event.eventName!,
                      style: GoogleFonts.inter(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: Colors.white),
                    ),
                    Text(
                      widget.event.eventDescription!,
                      style:
                          GoogleFonts.inter(fontSize: 14, color: Colors.white),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                  ]),
              Container(
                width: 42,
                height: 42,
                padding: EdgeInsets.all(4),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color(0xFF94A3B8).withOpacity(0.5),
                  ),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(
                  child: SizedBox(
                    height: 20,
                    width: 20,
                    child: SvgPicture.asset(
                      "assets/icons/settings.svg",
                      color: Colors.white,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
        SizedBox(
          height: 10,
        ),
        Divider(
          color: Color(0xFFFFFFFF),
          thickness: 0.1,
        ),
        SizedBox(
          height: 10,
        ),
        Text(
          "Trigger event",
          style: GoogleFonts.inter(
              fontWeight: FontWeight.w500, fontSize: 16, color: Colors.white),
        ),
        SizedBox(
          height: 10,
        ),
        InkWell(
          onTap: () {
            showModalBottomSheet(
                context: context,
                backgroundColor: Colors.transparent,
                builder: (context) {
                  return BottomSheetEventEdit(
                    event: widget.event.triggerEvent!,
                    delete: null,
                  );
                });
          },
          child: EventCard(
            desc: widget.event.triggerEvent!.name,
            name: widget.event.triggerEvent!.provider,
          ),
        ),
        SizedBox(
          height: 10,
        ),
        Divider(
          color: Color(0xFFFFFFFF),
          thickness: 0.1,
        ),
        Text(
          "Action event",
          style: GoogleFonts.inter(
              fontWeight: FontWeight.w500, fontSize: 16, color: Colors.white),
        ),
        SizedBox(
          height: 10,
        ),
        InkWell(
          onTap: () {
            showModalBottomSheet(
                context: context,
                backgroundColor: Colors.transparent,
                builder: (context) {
                  return BottomSheetEventEdit(
                    event: widget.event.responseEvent!,
                    delete: null,
                  );
                });
          },
          child: EventCard(
            desc: widget.event.responseEvent!.name,
            name: widget.event.responseEvent!.provider,
          ),
        ),
        SizedBox(
          height: 10,
        ),
        if (widget.event.additionalActions != null &&
            widget.event.additionalActions!.isNotEmpty)
          Divider(
            color: Color(0xFFFFFFFF),
            thickness: 0.1,
          ),
        if (widget.event.additionalActions != null &&
            widget.event.additionalActions!.isNotEmpty)
          Text(
            "Additional actions",
            style: GoogleFonts.inter(
                fontWeight: FontWeight.w500, fontSize: 16, color: Colors.white),
          ),
        SizedBox(
          height: 10,
        ),
        if (widget.event.additionalActions != null &&
            widget.event.additionalActions!.isNotEmpty)
          ...widget.event.additionalActions!.map((e) {
            print("here");
            void deleteAdditional() {
              deleteAdditionalAction(
                  widget.userEvent, widget.event.additionalActions!.indexOf(e));
            }

            return InkWell(
              onTap: () {
                showModalBottomSheet(
                    context: context,
                    backgroundColor: Colors.transparent,
                    builder: (context) {
                      return BottomSheetEventEdit(
                        event: e,
                        delete: deleteAdditional,
                      );
                    }).then((value) {
                  setState(() {});
                });
              },
              child: EventCard(
                desc: e.name,
                name: e.provider,
              ),
            );
          }).toList(),
      ],
    );
  }
}
