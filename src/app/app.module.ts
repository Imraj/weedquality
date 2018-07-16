import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from "../pages/result/result";
import { CameraPage } from "../pages/camera/camera";

import { Camera } from "@ionic-native/camera";
import { CameraPreview } from "@ionic-native/camera-preview";
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Ionic2RatingModule } from 'ionic2-rating';

const firebase = {
   apiKey: "AIzaSyAQKaQTM90b2EdTWA8espFqOxzBH3OFCYA",
   authDomain: "medexp-af084.firebaseapp.com",
   databaseURL: "https://medexp-af084.firebaseio.com",
   projectId: "medexp-af084",
   storageBucket: "medexp-af084.appspot.com",
   messagingSenderId: "1022610148422"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireStorageModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    HTTP,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
