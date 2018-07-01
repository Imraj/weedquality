import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  imageData : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
              public alertCtrl: AlertController) {
    this.imageData = this.navParams.get("image")

    this.http.get("https://ratemyweed.herokuapp.com/process",{},{})
        .then(data=>{
           let alert = this.alertCtrl.push({
             title:"Res",
             message:data,
             buttons: ['OK']
           })
           alert.present()
        })
        .catch(error=>{

        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.imageData = this.navParams.get("image")
  }

}
