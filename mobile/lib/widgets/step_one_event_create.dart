import 'package:area/model/event_create_model.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StepOneEventCreate extends StatefulWidget {
  final ValueChanged<int> onChanged;
  final EventCreationModel eventCreationModel;
  StepOneEventCreate(
      {super.key, required this.onChanged, required this.eventCreationModel});

  @override
  State<StepOneEventCreate> createState() => _StepOneEventCreateState();
}

class _StepOneEventCreateState extends State<StepOneEventCreate> {
  final _formKey = GlobalKey<FormState>();
  final _eventNameController = TextEditingController();
  final _eventDescriptionController = TextEditingController();
  String errorMessage = "";
  @override
  void initState() {
    if (widget.eventCreationModel.eventName != null) {
      _eventNameController.text = widget.eventCreationModel.eventName!;
    }
    if (widget.eventCreationModel.eventDescription != null) {
      _eventDescriptionController.text =
          widget.eventCreationModel.eventDescription!;
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Bridge name",
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
            "Bridge description",
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
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  widget.eventCreationModel.eventName =
                      _eventNameController.text;
                  widget.eventCreationModel.eventDescription =
                      _eventDescriptionController.text;
                  widget.onChanged(1);
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
                "Continue",
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
          SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 15,
                height: 10,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              SizedBox(width: 5),
              Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: Color(0xFFA1A1AA),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              SizedBox(width: 5),
              Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: Color(0xFFA1A1AA),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
