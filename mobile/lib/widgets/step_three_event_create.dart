import 'package:area/model/event_create_model.dart';
import 'package:area/model/event_model.dart';
import 'package:area/utils/check_event_fields.dart';
import 'package:area/utils/create_event.dart';
import 'package:area/utils/get_response_apis.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/check_event_validity.dart';

class StepThreeEventCreate extends StatefulWidget {
  final ValueChanged<int> onChanged;
  final EventCreationModel eventCreationModel;
  const StepThreeEventCreate(
      {super.key, required this.onChanged, required this.eventCreationModel});

  @override
  State<StepThreeEventCreate> createState() => _StepThreeEventCreateState();
}

class _StepThreeEventCreateState extends State<StepThreeEventCreate> {
  String? selectedApi;
  EventModel? selectedResponse;
  String errorMessage = "";
  @override
  void initState() {
    selectedResponse = widget.eventCreationModel.responseEvent;
    print("selectedResponse : $selectedResponse");
    if (widget.eventCreationModel.responseEvent != null) {
      selectedApi = widget.eventCreationModel.responseEvent!.provider;
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraint) {
      return SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: constraint.maxHeight,
          ),
          child: IntrinsicHeight(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                FutureBuilder(
                  future: getResponsesApi(),
                  builder: (context, AsyncSnapshot<List<EventModel>> snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasData) {
                      List<String> providerList = [];
                      selectedResponse =
                          widget.eventCreationModel.responseEvent;
                      if (selectedResponse != null) {
                        selectedApi = selectedResponse!.provider;
                        print("already selected");
                      }
                      for (var element in snapshot.data!) {
                        if (!providerList.contains(element.provider)) {
                          providerList.add(element.provider);
                        }
                      }
                      return StatefulBuilder(builder: (context, updateApi) {
                        List<EventModel> availableTriggers = [];
                        for (var element in snapshot.data!) {
                          if (element.provider == selectedApi) {
                            availableTriggers.add(element);
                          }
                          if (selectedResponse != null &&
                              element.id == selectedResponse!.id) {
                            element.fields = selectedResponse!.fields;
                            print("1: ${selectedResponse!.fields}");
                            selectedResponse = element;
                          }
                        }
                        return Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("API",
                                style: GoogleFonts.inter(
                                  fontSize: 20,
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                )),
                            SizedBox(height: 10),
                            Text(
                                "The API that will be used as a reaction to the trigger",
                                style: GoogleFonts.inter(
                                  fontSize: 14,
                                  color: Color(0xFFA1A1AA),
                                )),
                            SizedBox(height: 10),
                            SizedBox(
                              height: 40,
                              width: double.infinity,
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Color(0xFF21212B),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: DropdownMenu<String>(
                                  expandedInsets: EdgeInsets.all(0),
                                  inputDecorationTheme: InputDecorationTheme(
                                    hintStyle: GoogleFonts.inter(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white,
                                    ),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(10),
                                      borderSide: BorderSide.none,
                                    ),
                                    contentPadding: EdgeInsets.symmetric(
                                      horizontal: 20,
                                      vertical: 10,
                                    ),
                                  ),
                                  width: 300,
                                  initialSelection: selectedApi,
                                  hintText: "Select an API",
                                  textStyle: GoogleFonts.inter(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white),
                                  menuStyle: MenuStyle(
                                    backgroundColor:
                                        MaterialStateColor.resolveWith(
                                            (states) => Color(0xFF09090B)),
                                  ),
                                  onSelected: (String? api) {
                                    updateApi(() {
                                      selectedApi = api;
                                      selectedResponse = null;
                                      print(selectedApi);
                                      print(selectedResponse);
                                    });
                                  },
                                  dropdownMenuEntries: providerList
                                      .map<DropdownMenuEntry<String>>(
                                          (String value) {
                                    return DropdownMenuEntry<String>(
                                        value: value,
                                        label: value,
                                        style: MenuItemButton.styleFrom(
                                          foregroundColor: Colors.white,
                                        ));
                                  }).toList(),
                                ),
                              ),
                            ),
                            SizedBox(height: 20),
                            Text("Interaction",
                                style: GoogleFonts.inter(
                                  fontSize: 20,
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                )),
                            SizedBox(height: 10),
                            Text(
                                "The interaction that will be used as a response",
                                style: GoogleFonts.inter(
                                  fontSize: 14,
                                  color: Color(0xFFA1A1AA),
                                )),
                            SizedBox(height: 10),
                            SizedBox(
                              height: 40,
                              width: double.infinity,
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Color(0xFF21212B),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: DropdownMenu<EventModel>(
                                  key: selectedApi != null
                                      ? ValueKey<String>(selectedApi!)
                                      : null,
                                  expandedInsets: EdgeInsets.all(0),
                                  inputDecorationTheme: InputDecorationTheme(
                                    hintStyle: GoogleFonts.inter(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white,
                                    ),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(10),
                                      borderSide: BorderSide.none,
                                    ),
                                    contentPadding: EdgeInsets.symmetric(
                                      horizontal: 20,
                                      vertical: 10,
                                    ),
                                  ),
                                  width: 300,
                                  initialSelection: selectedResponse,
                                  hintText: "Select a response",
                                  textStyle: GoogleFonts.inter(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.white),
                                  menuStyle: MenuStyle(
                                    backgroundColor:
                                        MaterialStateColor.resolveWith(
                                      (states) => Color(0xFF09090B),
                                    ),
                                  ),
                                  onSelected: (EventModel? trigger) {
                                    updateApi(() {
                                      selectedResponse = trigger;
                                      widget.eventCreationModel.responseEvent =
                                          selectedResponse;
                                      print(selectedResponse);
                                      print(selectedResponse!.fields.length);
                                    });
                                  },
                                  dropdownMenuEntries: availableTriggers
                                      .map<DropdownMenuEntry<EventModel>>(
                                          (EventModel value) {
                                    return DropdownMenuEntry<EventModel>(
                                        value: value,
                                        label: value.name,
                                        style: MenuItemButton.styleFrom(
                                          foregroundColor: Colors.white,
                                        ));
                                  }).toList(),
                                ),
                              ),
                            ),
                            if (selectedResponse != null &&
                                selectedResponse!.fields.isNotEmpty)
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  SizedBox(height: 20),
                                  Text("Settings",
                                      style: GoogleFonts.inter(
                                        fontSize: 20,
                                        color: Colors.white,
                                        fontWeight: FontWeight.w600,
                                      )),
                                  SizedBox(height: 10),
                                  Text("Settings for the selected interaction",
                                      style: GoogleFonts.inter(
                                        fontSize: 14,
                                        color: Color(0xFFA1A1AA),
                                      )),
                                  SizedBox(height: 10),
                                  if (widget.eventCreationModel.triggerEvent !=
                                          null &&
                                      widget.eventCreationModel.triggerEvent!
                                          .variables!.isNotEmpty)
                                    Text(
                                        "You can use theses variables in the fields : ",
                                        style: GoogleFonts.inter(
                                          fontSize: 14,
                                          color: Color(0xFFA1A1AA),
                                        )),
                                  if (widget.eventCreationModel.triggerEvent !=
                                          null &&
                                      widget.eventCreationModel.triggerEvent!
                                          .variables!.isNotEmpty)
                                    SizedBox(height: 10),
                                  for (var variable in widget.eventCreationModel
                                      .triggerEvent!.variables!.keys)
                                    Text(
                                        "- ${widget.eventCreationModel.triggerEvent!.variables![variable]} : \$$variable",
                                        style: GoogleFonts.inter(
                                          fontSize: 14,
                                          color: Color(0xFFA1A1AA),
                                        )),
                                  if (widget.eventCreationModel.triggerEvent !=
                                          null &&
                                      widget.eventCreationModel.triggerEvent!
                                          .variables!.isNotEmpty)
                                    SizedBox(height: 10),
                                  for (var field in selectedResponse!.fields)
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(field.name,
                                            style: GoogleFonts.inter(
                                              fontSize: 14,
                                              color: Colors.white,
                                            )),
                                        SizedBox(height: 10),
                                        if (field.type == WidgetType.text ||
                                            field.type == WidgetType.textarea)
                                          SizedBox(
                                            height: field.type ==
                                                    WidgetType.textarea
                                                ? 40 * 3
                                                : 40,
                                            width: double.infinity,
                                            child: TextFormField(
                                              key: ValueKey<String>(field.name),
                                              style: TextStyle(
                                                  color: Colors.white),
                                              onChanged: (value) {
                                                field.value = value;
                                                field.edited = true;
                                              },
                                              initialValue: field.edited
                                                  ? field.value
                                                  : null,
                                              validator: (value) {
                                                if (value!.isEmpty) {
                                                  return "Please enter a description";
                                                }
                                                return null;
                                              },
                                              maxLines: field.type ==
                                                      WidgetType.textarea
                                                  ? 3
                                                  : 1,
                                              decoration: InputDecoration(
                                                filled: true,
                                                fillColor: Color(0xFF21212B),
                                                hintText: field.name,
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
                                        SizedBox(height: 10),
                                        if (field.type == WidgetType.select)
                                          Container(
                                            height: 40,
                                            decoration: BoxDecoration(
                                              color: Color(0xFF21212B),
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                            ),
                                            child: DropdownMenu<SelectField>(
                                              expandedInsets: EdgeInsets.all(0),
                                              inputDecorationTheme:
                                                  InputDecorationTheme(
                                                hintStyle: GoogleFonts.inter(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.white,
                                                ),
                                                border: OutlineInputBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(10),
                                                  borderSide: BorderSide.none,
                                                ),
                                                contentPadding:
                                                    EdgeInsets.symmetric(
                                                  horizontal: 20,
                                                  vertical: 10,
                                                ),
                                              ),
                                              hintText: field.value,
                                              textStyle: GoogleFonts.inter(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.white),
                                              menuStyle: MenuStyle(
                                                backgroundColor:
                                                    MaterialStateColor
                                                        .resolveWith(
                                                  (states) => Color(0xFF09090B),
                                                ),
                                              ),
                                              onSelected: (value) {
                                                field.value = value!.value;
                                              },
                                              dropdownMenuEntries:
                                                  field.selectFields!.map<
                                                          DropdownMenuEntry<
                                                              SelectField>>(
                                                      (SelectField e) {
                                                return DropdownMenuEntry<
                                                        SelectField>(
                                                    value: e,
                                                    label: e.label,
                                                    style: MenuItemButton
                                                        .styleFrom(
                                                      foregroundColor:
                                                          Colors.white,
                                                    ));
                                              }).toList(),
                                            ),
                                          )
                                      ],
                                    ),
                                ],
                              ),
                          ],
                        );
                      });
                    } else {
                      return Center(
                          child: Text("Error while getting response apis"));
                    }
                  },
                ),
                SizedBox(height: 20),
                if (errorMessage != "") ...[
                  Center(
                    child: Text(
                      errorMessage,
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: Colors.red,
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                ],
                Spacer(),
                SizedBox(
                  width: double.infinity,
                  height: 36,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (checkEventFields(
                              widget.eventCreationModel.responseEvent!) ==
                          false) {
                        setState(() {
                          errorMessage = "Please fill all the event fields";
                        });
                        return;
                      }
                      if (checkEventValidity(widget.eventCreationModel) ==
                          false) {
                        setState(() {
                          errorMessage = "Please fill all the fields";
                        });
                        return;
                      }
                      widget.eventCreationModel.responseEvent =
                          selectedResponse;
                      print(
                          "Fields : ${widget.eventCreationModel.responseEvent!.fields}");
                      try {
                        await createEvent(widget.eventCreationModel);
                        if (context.mounted) {
                          ScaffoldMessenger.of(context)
                              .showSnackBar(const SnackBar(
                            content: Text(
                                "The event has been successfully created !"),
                          ));
                          Navigator.of(context).pop();
                        }
                      } catch (e) {
                        setState(() {
                          errorMessage =
                              "An error occured. Please check that your are logged into the right OAuths.";
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
                      widget.onChanged(1);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF21212B),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      minimumSize: Size(double.infinity, 50),
                    ),
                    child: Text(
                      "Back",
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
                    SizedBox(width: 5),
                    Container(
                      width: 15,
                      height: 10,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      );
    });
  }
}
