import 'package:area/model/event_model.dart';
import 'package:area/utils/get_response_apis.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StepThreeEventCreate extends StatefulWidget {
  final ValueChanged<int> onChanged;
  const StepThreeEventCreate({super.key, required this.onChanged});

  @override
  State<StepThreeEventCreate> createState() => _StepThreeEventCreateState();
}

class _StepThreeEventCreateState extends State<StepThreeEventCreate> {
  String? selectedApi;
  EventModel? selectedTrigger;
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
                                  initialSelection: null,
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
                                      selectedTrigger = null;
                                      print(selectedApi);
                                      print(selectedTrigger);
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
                                  initialSelection: null,
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
                                      selectedTrigger = trigger;
                                      print(selectedTrigger);
                                      print(selectedTrigger!.fields.length);
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
                            if (selectedTrigger != null &&
                                selectedTrigger!.fields.isNotEmpty)
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
                                  for (var field in selectedTrigger!.fields)
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
                                        SizedBox(
                                          height: 40,
                                          width: double.infinity,
                                          child: TextFormField(
                                            key: ValueKey<String>(field.name),
                                            style:
                                                TextStyle(color: Colors.white),
                                            onChanged: (value) {
                                              field.value = value;
                                            },
                                            validator: (value) {
                                              if (value!.isEmpty) {
                                                return "Please enter a description";
                                              }
                                              return null;
                                            },
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
                                        SizedBox(height: 20),
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
                Spacer(),
                SizedBox(
                  width: double.infinity,
                  height: 36,
                  child: ElevatedButton(
                    onPressed: () {
                      widget.onChanged(2);
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
