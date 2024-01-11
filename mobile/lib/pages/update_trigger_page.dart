import 'package:flutter/material.dart';
import 'package:area/model/event_create_model.dart';
import 'package:area/model/event_model.dart';
import 'package:area/utils/check_event_fields.dart';
import 'package:area/utils/get_loggedin_services.dart';
import 'package:area/utils/get_trigger_apis.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class UpdateTriggerPage extends StatefulWidget {
  final EventCreationModel eventCreationModel;
  const UpdateTriggerPage({super.key, required this.eventCreationModel});

  @override
  State<UpdateTriggerPage> createState() => _UpdateTriggerPageState();
}

class _UpdateTriggerPageState extends State<UpdateTriggerPage> {
  String? selectedApi;
  EventModel? selectedTrigger;
  String errorMessage = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: LayoutBuilder(builder: (context, constraint) {
        return FutureBuilder(
            future: getLoggedInServices(),
            builder: (context, AsyncSnapshot<List<String>> services) {
              if (services.hasData) {
                return SingleChildScrollView(
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      minHeight: constraint.maxHeight,
                    ),
                    child: IntrinsicHeight(
                      child: Container(
                        padding: EdgeInsets.only(
                            right: 20, left: 20, bottom: 20, top: 20),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
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
                              "Update an event",
                              style: GoogleFonts.inter(
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 10),
                            FutureBuilder(
                              future: getTriggerApis(),
                              builder: (context,
                                  AsyncSnapshot<List<EventModel>> snapshot) {
                                if (snapshot.connectionState ==
                                    ConnectionState.waiting) {
                                  return Center(
                                      child: CircularProgressIndicator());
                                } else if (snapshot.hasData) {
                                  List<String> providerList = [];
                                  selectedTrigger =
                                      widget.eventCreationModel.triggerEvent;
                                  if (selectedTrigger != null) {
                                    selectedApi = selectedTrigger!.provider;
                                  }
                                  for (var element in snapshot.data!) {
                                    if (!providerList
                                        .contains(element.provider)) {
                                      providerList.add(element.provider);
                                    }
                                  }
                                  return StatefulBuilder(
                                      builder: (context, updateApi) {
                                    List<EventModel> availableTriggers = [];
                                    for (var element in snapshot.data!) {
                                      if (element.provider == selectedApi) {
                                        availableTriggers.add(element);
                                      }
                                      if (selectedTrigger != null &&
                                          element.id == selectedTrigger!.id) {
                                        element.fields =
                                            selectedTrigger!.fields;
                                        selectedTrigger = element;
                                      }
                                    }
                                    return Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text("API",
                                            style: GoogleFonts.inter(
                                              fontSize: 20,
                                              color: Colors.white,
                                              fontWeight: FontWeight.w600,
                                            )),
                                        SizedBox(height: 10),
                                        Text(
                                            "The API that will trigger the event",
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
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                            ),
                                            child: DropdownMenu<String>(
                                              key: UniqueKey(),
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
                                              width: 300,
                                              hintText: "Select an API",
                                              initialSelection: selectedApi,
                                              textStyle: GoogleFonts.inter(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.white),
                                              menuStyle: MenuStyle(
                                                backgroundColor:
                                                    MaterialStateColor
                                                        .resolveWith((states) =>
                                                            Color(0xFF09090B)),
                                              ),
                                              onSelected: (String? api) {
                                                updateApi(() {
                                                  selectedApi = api;
                                                  selectedTrigger = null;
                                                  print(selectedApi);
                                                  print(selectedTrigger);
                                                });
                                              },
                                              dropdownMenuEntries: providerList
                                                  .map<
                                                          DropdownMenuEntry<
                                                              String>>(
                                                      (String value) {
                                                return DropdownMenuEntry<
                                                        String>(
                                                    value: value,
                                                    label: value,
                                                    enabled: services.data!
                                                        .contains(value
                                                            .toLowerCase()),
                                                    style: MenuItemButton.styleFrom(
                                                        foregroundColor:
                                                            Colors.white,
                                                        disabledForegroundColor:
                                                            Colors.grey
                                                                .withOpacity(
                                                                    0.5)));
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
                                            "The interaction that will trigger the event",
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
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                            ),
                                            child: DropdownMenu<EventModel>(
                                              key: selectedApi != null
                                                  ? ValueKey<String>(
                                                      selectedApi!)
                                                  : null,
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
                                              width: 300,
                                              initialSelection: selectedTrigger,
                                              hintText: "Select a trigger",
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
                                              onSelected:
                                                  (EventModel? trigger) {
                                                updateApi(() {
                                                  selectedTrigger = trigger;
                                                  widget.eventCreationModel
                                                      .triggerEvent = trigger;
                                                  print(selectedTrigger);
                                                  print(selectedTrigger!
                                                      .fields.length);
                                                });
                                              },
                                              dropdownMenuEntries:
                                                  availableTriggers.map<
                                                          DropdownMenuEntry<
                                                              EventModel>>(
                                                      (EventModel value) {
                                                return DropdownMenuEntry<
                                                        EventModel>(
                                                    value: value,
                                                    label: value.name,
                                                    style: MenuItemButton
                                                        .styleFrom(
                                                      foregroundColor:
                                                          Colors.white,
                                                    ));
                                              }).toList(),
                                            ),
                                          ),
                                        ),
                                        if (selectedTrigger != null &&
                                            selectedTrigger!.fields.isNotEmpty)
                                          Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              SizedBox(height: 20),
                                              Text("Settings",
                                                  style: GoogleFonts.inter(
                                                    fontSize: 20,
                                                    color: Colors.white,
                                                    fontWeight: FontWeight.w600,
                                                  )),
                                              SizedBox(height: 10),
                                              Text(
                                                  "Settings for the selected interaction",
                                                  style: GoogleFonts.inter(
                                                    fontSize: 14,
                                                    color: Color(0xFFA1A1AA),
                                                  )),
                                              SizedBox(height: 10),
                                              for (var field
                                                  in selectedTrigger!.fields)
                                                Column(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment.start,
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(field.name,
                                                        style:
                                                            GoogleFonts.inter(
                                                          fontSize: 14,
                                                          color: Colors.white,
                                                        )),
                                                    SizedBox(height: 10),
                                                    if (field.type ==
                                                            WidgetType.text ||
                                                        field.type ==
                                                            WidgetType.textarea)
                                                      SizedBox(
                                                        height: field.type ==
                                                                WidgetType
                                                                    .textarea
                                                            ? 40 * 3
                                                            : 40,
                                                        width: double.infinity,
                                                        child: TextFormField(
                                                          key: ValueKey<String>(
                                                              field.name),
                                                          style: TextStyle(
                                                              color:
                                                                  Colors.white),
                                                          onChanged: (value) {
                                                            field.value = value;
                                                            field.edited = true;
                                                          },
                                                          initialValue:
                                                              field.edited
                                                                  ? field.value
                                                                  : null,
                                                          validator: (value) {
                                                            if (value!
                                                                .isEmpty) {
                                                              return "Please enter a description";
                                                            }
                                                            return null;
                                                          },
                                                          maxLines: field
                                                                      .type ==
                                                                  WidgetType
                                                                      .textarea
                                                              ? 3
                                                              : 1,
                                                          decoration:
                                                              InputDecoration(
                                                            filled: true,
                                                            fillColor: Color(
                                                                0xFF21212B),
                                                            hintText:
                                                                field.name,
                                                            hintStyle:
                                                                TextStyle(
                                                              fontSize: 14,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w400,
                                                              color: Color(
                                                                  0xFFA1A1AA),
                                                            ),
                                                            border:
                                                                OutlineInputBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          10),
                                                              borderSide:
                                                                  BorderSide
                                                                      .none,
                                                            ),
                                                          ),
                                                        ),
                                                      ),
                                                    SizedBox(height: 10),
                                                    if (field.type ==
                                                        WidgetType.select)
                                                      Container(
                                                        height: 40,
                                                        decoration:
                                                            BoxDecoration(
                                                          color:
                                                              Color(0xFF21212B),
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(10),
                                                        ),
                                                        child: DropdownMenu<
                                                            SelectField>(
                                                          expandedInsets:
                                                              EdgeInsets.all(0),
                                                          inputDecorationTheme:
                                                              InputDecorationTheme(
                                                            hintStyle:
                                                                GoogleFonts
                                                                    .inter(
                                                              fontSize: 15,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .w600,
                                                              color:
                                                                  Colors.white,
                                                            ),
                                                            border:
                                                                OutlineInputBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          10),
                                                              borderSide:
                                                                  BorderSide
                                                                      .none,
                                                            ),
                                                            contentPadding:
                                                                EdgeInsets
                                                                    .symmetric(
                                                              horizontal: 20,
                                                              vertical: 10,
                                                            ),
                                                          ),
                                                          hintText: field.value,
                                                          textStyle:
                                                              GoogleFonts.inter(
                                                                  fontSize: 15,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w600,
                                                                  color: Colors
                                                                      .white),
                                                          menuStyle: MenuStyle(
                                                            backgroundColor:
                                                                MaterialStateColor
                                                                    .resolveWith(
                                                              (states) => Color(
                                                                  0xFF09090B),
                                                            ),
                                                          ),
                                                          onSelected: (value) {
                                                            field.value =
                                                                value!.value;
                                                          },
                                                          dropdownMenuEntries: field
                                                              .selectFields!
                                                              .map<
                                                                      DropdownMenuEntry<
                                                                          SelectField>>(
                                                                  (SelectField
                                                                      e) {
                                                            return DropdownMenuEntry<
                                                                    SelectField>(
                                                                value: e,
                                                                label: e.label,
                                                                style: MenuItemButton
                                                                    .styleFrom(
                                                                  foregroundColor:
                                                                      Colors
                                                                          .white,
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
                                  print(snapshot.error);
                                  return Center(
                                      child: Text(
                                          "Error while getting trigger apis"));
                                }
                              },
                            ),
                            SizedBox(height: 10),
                            if (errorMessage != "")
                              Center(
                                  child: Text(
                                errorMessage,
                                style: TextStyle(color: Colors.red),
                              )),
                            Spacer(),
                            SizedBox(
                              width: double.infinity,
                              height: 36,
                              child: ElevatedButton(
                                onPressed: () {
                                  if (checkEventFields(widget
                                          .eventCreationModel.triggerEvent!) ==
                                      false) {
                                    setState(() {
                                      errorMessage =
                                          "Please fill all the event fields";
                                    });
                                    return;
                                  }
                                  Navigator.of(context).pop(selectedTrigger!);
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Color(0xFF6D28D9),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  minimumSize: Size(double.infinity, 50),
                                ),
                                child: Text(
                                  "Save",
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
                                  Navigator.of(context).pop();
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
                      ),
                    ),
                  ),
                );
              } else {
                return Center(child: CircularProgressIndicator());
              }
            });
      }),
    );
  }
}
