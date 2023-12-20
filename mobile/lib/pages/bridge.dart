// ignore_for_file: unused_local_variable

import 'package:area/model/event_model.dart';
import 'package:area/utils/create_event.dart';
import 'package:area/utils/get_response_apis.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/get_trigger_apis.dart';

class BridgePage extends StatefulWidget {
  const BridgePage({super.key});

  @override
  State<BridgePage> createState() => _BridgePageState();
}

class _BridgePageState extends State<BridgePage> {
  EventModel? _selectedTriggerApi = EventModel(
      provider: "", id: "", name: "Select a trigger API", fields: {});
  EventModel? _selectedResponseApi;
  List<TextEditingController> _triggerControllers = [];
  List<TextEditingController> _responseControllers = [];
  Future<List<EventModel>> _triggerApis = getTriggerApis();
  Future<List<EventModel>> _responseApis = getResponsesApi();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Color(0xFF09090B),
        body: Center(
          child: Container(
              padding:
                  EdgeInsets.only(right: 20, left: 20, bottom: 20, top: 50),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SvgPicture.asset(
                        "assets/logos/icon.svg",
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
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                    "On this page you can link different API to use them together.",
                    style: GoogleFonts.inter(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFFA1A1AA),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 20),
                  Text(
                    "Trigger API",
                    style: GoogleFonts.inter(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: Colors.white),
                  ),
                  SizedBox(height: 20),
                  FutureBuilder(
                    future: _triggerApis,
                    builder:
                        (context, AsyncSnapshot<List<EventModel>> snapshot) {
                      if (snapshot.hasData) {
                        _triggerControllers = [];
                        if (_selectedTriggerApi != null &&
                            _selectedTriggerApi!.fields.isNotEmpty) {
                          for (var field in _selectedTriggerApi!.fields.keys) {
                            _triggerControllers.add(TextEditingController());
                          }
                        }
                        return Column(
                          children: [
                            DropdownMenu<EventModel>(
                              width: 300,
                              initialSelection: _selectedTriggerApi,
                              textStyle: GoogleFonts.inter(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.white),
                              menuStyle: MenuStyle(
                                backgroundColor: MaterialStateColor.resolveWith(
                                    (states) => Color(0xFF09090B)),
                              ),
                              onSelected: (EventModel? triggerApi) {
                                setState(() {
                                  _selectedTriggerApi = triggerApi;
                                });
                              },
                              dropdownMenuEntries: snapshot.data!
                                  .map<DropdownMenuEntry<EventModel>>(
                                      (EventModel triggerApi) {
                                return DropdownMenuEntry<EventModel>(
                                  value: triggerApi,
                                  label: triggerApi.name,
                                  style: MenuItemButton.styleFrom(
                                    foregroundColor: Colors.white,
                                  ),
                                );
                              }).toList(),
                            ),
                            if (_selectedTriggerApi != null &&
                                _selectedTriggerApi!.fields.isNotEmpty)
                              Form(
                                  child: Column(children: [
                                for (var field
                                    in _selectedTriggerApi!.fields.keys)
                                  TextFormField(
                                    controller: _triggerControllers[
                                        _selectedTriggerApi!.fields.keys
                                            .toList()
                                            .indexOf(field)],
                                    decoration: InputDecoration(
                                      labelText: field,
                                      labelStyle: GoogleFonts.inter(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w600,
                                          color: Colors.white),
                                      fillColor: Colors.white,
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                            color: Colors.white, width: 2.0),
                                      ),
                                    ),
                                  ),
                                SizedBox(height: 20),
                              ])),
                            SizedBox(height: 20),
                            Text(
                              "Response API",
                              style: GoogleFonts.inter(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.white),
                            ),
                            SizedBox(height: 20),
                            FutureBuilder(
                              future: _responseApis,
                              builder: (context,
                                  AsyncSnapshot<List<EventModel>> snapshot) {
                                if (snapshot.hasData) {
                                  _responseControllers = [];
                                  if (_selectedResponseApi != null &&
                                      _selectedResponseApi!.fields.isNotEmpty) {
                                    for (var field
                                        in _selectedResponseApi!.fields.keys) {
                                      _responseControllers
                                          .add(TextEditingController());
                                    }
                                  }
                                  return Column(
                                    children: [
                                      DropdownMenu<EventModel>(
                                        width: 300,
                                        initialSelection: _selectedResponseApi,
                                        textStyle: GoogleFonts.inter(
                                            fontSize: 15,
                                            fontWeight: FontWeight.w600,
                                            color: Colors.white),
                                        menuStyle: MenuStyle(
                                          backgroundColor:
                                              MaterialStateColor.resolveWith(
                                                  (states) =>
                                                      Color(0xFF09090B)),
                                        ),
                                        onSelected: (EventModel? responseApi) {
                                          setState(() {
                                            _selectedResponseApi = responseApi;
                                          });
                                        },
                                        dropdownMenuEntries: snapshot.data!
                                            .map<DropdownMenuEntry<EventModel>>(
                                                (EventModel responseApi) {
                                          return DropdownMenuEntry<EventModel>(
                                            value: responseApi,
                                            label: responseApi.name,
                                            style: MenuItemButton.styleFrom(
                                              foregroundColor: Colors.white,
                                            ),
                                          );
                                        }).toList(),
                                      ),
                                      if (_selectedResponseApi != null &&
                                          _selectedResponseApi!
                                              .fields.isNotEmpty)
                                        SizedBox(height: 20),
                                      if (_selectedResponseApi != null &&
                                          _selectedResponseApi!
                                              .fields.isNotEmpty)
                                        Form(
                                            child: Column(children: [
                                          for (var field
                                              in _selectedResponseApi!
                                                  .fields.keys)
                                            TextFormField(
                                                controller:
                                                    _responseControllers[
                                                        _selectedResponseApi!
                                                            .fields.keys
                                                            .toList()
                                                            .indexOf(field)],
                                                decoration: InputDecoration(
                                                  labelText: field,
                                                  labelStyle: GoogleFonts.inter(
                                                      fontSize: 15,
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      color: Colors.white),
                                                  fillColor: Colors.white,
                                                  focusedBorder:
                                                      OutlineInputBorder(
                                                    borderSide: BorderSide(
                                                        color: Colors.white,
                                                        width: 2.0),
                                                  ),
                                                ),
                                                style: TextStyle(
                                                  color: Colors.white,
                                                )),
                                          SizedBox(height: 20),
                                        ])),
                                      SizedBox(height: 20),
                                      ElevatedButton(
                                        onPressed: () async {
                                          if (_selectedTriggerApi != null &&
                                              _selectedResponseApi != null) {
                                            Map<String, String> triggerFields =
                                                {};
                                            Map<String, String> responseFields =
                                                {};
                                            for (var field
                                                in _selectedTriggerApi!
                                                    .fields.keys) {
                                              triggerFields[field] =
                                                  _triggerControllers[
                                                          _selectedTriggerApi!
                                                              .fields.keys
                                                              .toList()
                                                              .indexOf(field)]
                                                      .text;
                                            }
                                            for (var field
                                                in _selectedResponseApi!
                                                    .fields.keys) {
                                              responseFields[field] =
                                                  _responseControllers[
                                                          _selectedResponseApi!
                                                              .fields.keys
                                                              .toList()
                                                              .indexOf(field)]
                                                      .text;
                                            }
                                            EventModel triggerEvent =
                                                EventModel(
                                                    provider:
                                                        _selectedTriggerApi!
                                                            .provider
                                                            .toLowerCase(),
                                                    id: _selectedTriggerApi!.id,
                                                    name: _selectedTriggerApi!
                                                        .name,
                                                    fields: triggerFields);
                                            EventModel responseEvent =
                                                EventModel(
                                                    provider:
                                                        _selectedResponseApi!
                                                            .provider
                                                            .toLowerCase(),
                                                    id: _selectedResponseApi!
                                                        .id,
                                                    name: _selectedResponseApi!
                                                        .name,
                                                    fields: responseFields);
                                            await createEvent(
                                                triggerEvent, responseEvent);
                                            if (context.mounted) {
                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(SnackBar(
                                                content: Text("Event created"),
                                              ));
                                              Navigator.pop(context);
                                            }
                                          }
                                        },
                                        child: Text("Create event"),
                                      )
                                    ],
                                  );
                                } else {
                                  return CircularProgressIndicator();
                                }
                              },
                            )
                          ],
                        );
                      } else {
                        return CircularProgressIndicator();
                      }
                    },
                  )
                ],
              )),
        ));
  }
}
