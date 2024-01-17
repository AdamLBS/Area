# Mobile App

## Setup

In order to start using our project, the `.env` file must be set up!
Use the `.env.example` file and complete it with the necessary **Client Id**, **Secret** for the services and the **Backend URL**.

You also need to have flutter installed on your computer.

Go to mobile folder and install the mobile dependencies:

```bash
flutter pub get
```

## Run the project

To run the project, you just need to run the following command:

```bash
flutter run
```

## OAuth

The mobile app use the oauth2 package to handle the OAuth2 authentication. The package is available here: [https://pub.dev/packages/oauth2](https://pub.dev/packages/oauth2)

To add a new OAuth2 service, you need to add it to the `lib/services/oauth.dart` file. You can get inspired by the other services already implemented.

