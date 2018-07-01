import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from "@ionic-native/camera";


import { CameraPage } from "../camera/camera"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private camera: Camera) {

  }

  // takeAPhoto(){
  //   this.camera.getPicture({
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }).then((imageData)=>{
  //     let base64Image = "data:image/jpeg;base64," + imageData
  //     this.navCtrl.push(ResultPage,{
  //       image:base64Image
  //     })
  //   }, (err)=>{
  //
  //   })
  // }

  takeAPhoto(){
    this.navCtrl.push(CameraPage)
  }

}
