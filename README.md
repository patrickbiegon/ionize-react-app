# Ionize your reactJs app to run across platforms i.e web, ios, android, pwa,electron 

The steps to convert your reactJs app into Ionic app and deploy across many platforms.

## Prepare your app - add Ionic and Capacitor!
The assumption here is that you have reactjs app that you need to ionize!

The app used here as an example, is a simple React Ionic app that implement social login - facebook and google - using firebase and the objective is to
deploy it on web, android, ios, pwa and electron.

Run these commands from outside your reactJs app directory (in this example myApp).These command will convert your reactJs into a working Ionic app from . It installs dependencies for you and sets up your project ready to be deployed.
 ```
npm install -g @ionic/cli

ionic start myApp blank --type=react

 ``` 
 Now enter into you reactJs app directory - enable Capacitor. Capacitor generates cross-platform apps for us and there in lies the magic.
 ```
cd myApp

ionic integrations enable capacitor
ionic cap add android
ionic cap open android

#capactior -
npx cap add android
npx cap add ios

npx cap add electron
 ```

## How to build and deploy for various platform

### Web

Spin up Nginx server and serve the files to WWW! That simple. 

This you can do easily using _Docker_ - see build/www folder for the Dockerfile

Make sure that both _docker_ and _docker-compose_ are available in the machine.

To build a Docker Image, you have to run the following command in our terminal:
 ```
docker build -f build/droid/Dockerfile -t myApp:v1 
 ```
To run the built docker image, use the following command:
 ```
docker run -d -p 127.0.0.1:3000:3000/tcp --name myAppContainer --network host myApp:v1 
 ```
You can also build and run your containers using the docker-compose at root 
 ```
docker-compose build && docker-compose up
 ```
 
### Android

## features
- java - openJSDK.
- android sdk
- node npm yarn ionic
- gradle

There are 2 options to build the app in Android: one automatic and another manual.
 
* **Option 1) Automatic APK generation for Android**
   * Navigate to the folder called [tools](tools)
   * Make sure that both __docker__ and __docker-compose__ are available in the machine.
     * If needed, [install-docker.sh](tools/install-docker.sh) will install both.
     ```
     ./install-docker.sh
     ```
     *  Generate the APK
       * __Option 1:__ using make command of [Makefile](tools/Makefile):
        ```
        make generate-apk
        ```
       * __Option 2:__ Execute [generate-apk.sh](tools/generate-apk.sh) script.
        ```
        ./generate-apk.sh
        ```

  * The APK is generated and signed with the key __release-key.jks__
  * The new apk will be available in the folder __apk__ inside __tools__
        
*  **Option 2) Manual Application generation**
   * Requirements
     * Java
     * Node.js
     * ionic
     * capacitor
   * Navigate to __src__ folder
     * Install Dependencies and build (nodeJS dependencies)
     ```
     npm i
     npm run build
     ```
     * Android
       * Android specific requirements
         * [Android-SDK](https://developer.android.com/studio#downloads) with build-tools. $ANDROID_HOME might be required
       * Create android folder and config gradle
      ```
      npx cap add android
      ```
      * Synchronize the android folder
      ```
      npx cap sync android
      ```
      * Access the new generated __android__ folder
      ```
      cd android
      ```
      * Create APK
      ```
      ./gradlew assembleDebug
      ```
      * Access the folder in which the APK is available
      ```
      cd app/build/outputs/apk/debug/
      ```
      * Align APK
      ```
      zipalign -v -p 4 app-debug.apk app-debug-aligned.apk
      ```
      * Sign APK
      ```
      apksigner sign --ks /release-key.jks --ks-pass pass:KEY_PASSWORD --key-pass pass:KEY_PASSWORD --out geteduroam.apk app-debug-aligned.apk
      ```
 ## iOS
 
To create the iOS binary, there is only a way (manual) because it couldn't be dockerized.
 * **Binary creation**
    * Requirements
      * XCode (App Store, or beta if on beta MacOS)
      * Commandline tools from XCode (`sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer`)
      * Node.js (LTS from https://nodejs.org/en/)
      * CocoaPods (`sudo gem install cocoapods`)
    * Navigate to __src__ folder
      * Install Dependencies and build (nodeJS dependencies)
      ```
      npm i
      npm run build
      ```
    * iOS specific requirements:
      * Xcode
      * CocoaPods
    * Building the capacitor app:
         ```
         npx cap add ios -> Only if ios folder doesn't exist yet, creates it
         npx cap sync ios -> Synchronyzes ios folder
         npx cap open ios -> Opens xCode
         ```
    * Installing dependencies with CocoaPods: Go to the folder src/ios/App, throw the command:
         ```
         pod install -> Installs dependencies with CocoaPods.
         ```
    * To fix Bounce on iOS (this step shoulnd't be needed but sometimes the Bounce.m is removed so it's needed). **Important**: If Bounce.m exists, skip this step:
      * In the folder Pods/, create a "New File", select "Objective-C File", select Next.
      * Include the name to the file and select Next.
      * Select Target Support Files: Capacitor, Capacitor Cordova, CordovaPlugins and Pods-App
      * Select Create and include:
      ```
      #import <Foundation/Foundation.h>

      #import <UIKit/UIKit.h>

      @implementation UIScrollView (NoBounce)

      - (void)didMoveToWindow {

          [super didMoveToWindow];

          self.bounces = NO;
      }

      @end
      ```
