import 'package:area/model/event_create_model.dart';
import 'package:area/model/user_event_model.dart';
import 'package:area/utils/update_event_details.dart';
import 'package:area/utils/update_event_state.dart';
import 'package:area/widgets/dialog_delete_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';

class UpdateEventPage extends StatefulWidget {
  final EventCreationModel eventCreationModel;
  final UserEvent userEvent;
  UpdateEventPage({super.key, required this.eventCreationModel, required this.userEvent});

  @override
  State<UpdateEventPage> createState() => _UpdateEventPageState();
}

class _UpdateEventPageState extends State<UpdateEventPage> {
  final _formKey = GlobalKey<FormState>();
  final _eventNameController = TextEditingController();
  final _eventDescriptionController = TextEditingController();
  String errorMessage = "";
  @override
  void initState() {
    _eventNameController.text = widget.eventCreationModel.eventName!;
    _eventDescriptionController.text =
        widget.eventCreationModel.eventDescription!;
    print("is active ? ${widget.userEvent.active}");
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Form(
          key: _formKey,
          child: Container(
            padding: EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SvgPicture.asset(
                      "assets/icons/bridge.svg",
                      width: 30,
                      height: 50,
                    ),
                    SizedBox(width: 10),
                    Text(
                      "Settings",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  "Event name",
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 10),
                SizedBox(
                  height: 40,
                  child: TextFormField(
                    controller: _eventNameController,
                    style: TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Color(0xFF21212B),
                      hintText: "Send an email when i'm listening to music",
                      errorStyle: TextStyle(height: 0),
                      hintStyle: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFFA1A1AA),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  "Event description",
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 10),
                SizedBox(
                  height: 40,
                  child: TextFormField(
                    controller: _eventDescriptionController,
                    style: TextStyle(color: Colors.white),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Color(0xFF21212B),
                      errorStyle: TextStyle(height: 0),
                      hintText: "Send an email when i'm listening to music",
                      hintStyle: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: Color(0xFFA1A1AA),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Active",
                      style: GoogleFonts.inter(fontSize: 14, color: Colors.white),
                    ),
                    SizedBox(
                      width: 44,
                      height: 24,
                      child: Switch(
                          activeColor: Color(0xFF6D28D9),
                          inactiveTrackColor: Color(0xFF21212B),
                          inactiveThumbColor: Color(0xFF6D28D9),
                          trackOutlineColor: MaterialStateProperty.resolveWith<Color>(
                              (Set<MaterialState> states) {
                            if (states.contains(MaterialState.disabled)) {
                              return Color(0xFF030712);
                            }
                            return Color(0xFF030712);
                          }),
                          thumbColor: MaterialStateProperty.resolveWith<Color>(
                              (Set<MaterialState> states) {
                            if (states.contains(MaterialState.disabled)) {
                              return Color(0xFF030712);
                            }
                            return Color(0xFF030712);
                          }),
                          value: widget.userEvent.active,
                          onChanged: (val) async {
                            try {
                            await updateEventState(widget.userEvent.active, widget.userEvent);
                            setState(() {
                              widget.userEvent.active = val;
                            });
                            if (context.mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(val ? "Event activated" : "Event deactivated"),
                                ),
                              );
                            }
                            } catch (e) {
                              if (context.mounted) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text("Error while updating event state"),
                                ),
                              );
                              }
                            }
                          }),
                    )
                  ],
                ),
                SizedBox(height: 20),
                SizedBox(width: double.infinity,
                height: 36,
                child: ElevatedButton(
                  onPressed: () {
                  showDialogDeleteEvent(
                                          widget.userEvent, context)
                                      .then((value) {
                                    if (value != null && value) {
                                      Navigator.of(context).pop(true);
                                    }
                                  });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF7F1D1D),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    minimumSize: Size(double.infinity, 50),
                  ),
                  child: Text(
                    "Delete",
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFFF9FAFB),
                    ),
                  ),
                ),),
                SizedBox(height: 20,),
                if (errorMessage != "")
                  Center(
                    child: Text(
                      errorMessage,
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: Colors.red,
                      ),
                    ),
                  ),
                Spacer(),
                SizedBox(
                  width: double.infinity,
                  height: 36,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        widget.eventCreationModel.eventName =
                            _eventNameController.text;
                        widget.eventCreationModel.eventDescription =
                            _eventDescriptionController.text;
                        try {
                        await updateEventDetails(widget.eventCreationModel, widget.userEvent.uuid);
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Event details updated"),
                            ),
                          );
                        Navigator.pop(context);
                        }
                        } catch (e) {
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text("Error while updating event details"),
                              ),
                            );
                          }
                        }
                      } else {
                        setState(() {
                          errorMessage = "Please fill all the fields";
                        });
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF6D28D9),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      minimumSize: Size(double.infinity, 50),
                    ),
                    child: Text(
                      "Update",
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  height: 36,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF21212B),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      minimumSize: Size(double.infinity, 50),
                    ),
                    child: Text(
                      "Cancel",
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
