import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraPreview,CameraPreviewOptions,CameraPreviewPictureOptions } from '@ionic-native/camera-preview';

import { ResultPage } from "../result/result"
/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const pictureOpts: CameraPreviewPictureOptions = {
   width: 1280,
   height: 1280,
   quality: 85
 }

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})

export class CameraPage {


  picture : any

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {

  }

  ionViewDidEnter() {
    var app = this
    console.log('ionViewDidLoad CameraPage');

    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height - 180,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: false,
      toBack: false,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

      setTimeout(function(){
        app.cameraPreview.takePicture({
          quality: 85
        }).then((imageData) => {
          app.cameraPreview.stopCamera();
          app.picture = 'data:image/jpeg;base64,' + imageData;
          app.navCtrl.push(ResultPage,{
            image:app.picture
          })
        }, (err) => {
          console.log(err);
          app.picture = 'assets/img/test.jpg';
        });
      },10000)
    //
    // this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
    //   console.log(result);
    //   this.navCtrl.push(ResultPage)
    // });
  }

}
