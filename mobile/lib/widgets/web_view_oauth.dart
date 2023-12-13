import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:area/globals.dart' as globals;
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class OAuthWebViewWidget extends StatefulWidget {
  const OAuthWebViewWidget({super.key, required this.url});
  final String url;

  @override
  State<OAuthWebViewWidget> createState() => _OAuthWebViewWidgetState();
}

class _OAuthWebViewWidgetState extends State<OAuthWebViewWidget> {
  InAppWebViewController? _webViewController;
  InAppWebViewSettings settings = InAppWebViewSettings(
      userAgent:
          "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36");
  final expiresDate =
      DateTime.now().add(Duration(days: 1)).millisecondsSinceEpoch;
  final url = Uri.parse(backendUrl);
  bool cookieSet = false;
  @override
  void initState() {
    CookieManager cookieManager = CookieManager.instance();
    cookieManager
        .setCookie(
            url: WebUri.uri(url),
            name: "adonis-session",
            value: globals.sessionCookie,
            expiresDate: expiresDate)
        .then((value) => setState(() {
              cookieSet = true;
            }));
    super.initState();
  }

  final GlobalKey webViewKey = GlobalKey();
  @override
  Widget build(BuildContext context) {
    return cookieSet == true
        ? Scaffold(
            body: SafeArea(
              child: InAppWebView(
                key: webViewKey,
                initialSettings: settings,
                initialUrlRequest:
                    URLRequest(url: WebUri.uri(Uri.parse(widget.url))),
                onWebViewCreated: (controller) {
                  _webViewController = controller;
                },
                onLoadStop: (controller, url) {
                  print("onLoadStop $url");
                },
              ),
            ),
          )
        : Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
  }
}
