# SheTrades Single Codebase Proof of Concept

This proof of concept app with social login - one first feature phase 2 requires.

## Steps to run the react app
1. clone repo.
2. use npm or yarn to install packages.
3. add env details for firebase.
4. run app `yarn start`

##prepare your app
npm install -g @ionic/cli

ionic start platformPoc blank --type=react
cd platformPoc

ionic integrations enable capacitor
ionic cap add android
ionic cap open android


## HOW TO BUILD  ##

### Web

Spin up Nginx server and server the files

To build a Docker Image, we have to run the following command in our terminal:

docker build -f devDockerfile.web -t myApp:v1 

To run the built docker image, use the following command:

docker run -d -p 127.0.0.1:3000:3000/tcp --name myAppContainer --network host myApp:v1 

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