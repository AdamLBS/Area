FROM mobiledevops/android-sdk-image:latest as base
USER root
ARG FLUTTER_SDK=/usr/local/flutter
ARG FLUTTER_VERSION=3.16.2
ARG APP=/app/
RUN git clone https://github.com/flutter/flutter.git $FLUTTER_SDK
RUN cd $FLUTTER_SDK && git fetch && git checkout $FLUTTER_VERSION
ENV PATH="$FLUTTER_SDK/bin:$FLUTTER_SDK/bin/cache/dart-sdk/bin:${PATH}"
RUN flutter doctor -v
RUN mkdir $APP
COPY . $APP
WORKDIR $APP
RUN flutter clean
RUN flutter pub get
RUN flutter build apk
CMD ["cp", "build/app/outputs/flutter-apk/app-release.apk", "/usr/mobile/public/client.apk"]
