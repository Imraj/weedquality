import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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

  concepts : any
  imageData : any

  mariPresent: any
  mariValue: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private http: Http) {

    var app = this
    this.imageData = this.navParams.get("image")

  }

  ionViewDidLoad() {
    var app = this
    console.log('ionViewDidLoad ResultPage');
    this.imageData = this.navParams.get("image")

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var data = 'imageData=' + this.imageData;
    this.http.post("https://ratemyweed.herokuapp.com/process",data,{headers:headers})
        .subscribe((res)=>{

           console.log("res-json")

           var result = JSON.parse((<any>res)._body)
           var concepts = result.outputs[0].data.concepts
           app.concepts = concepts
           console.log(concepts)
           for(var i=0;i<concepts.length;i++){
             let cname = concepts[i].name
             let cvalue = concepts[i].value
             console.log(cname,cvalue)
             if(cname == "marijuana"){
               app.mariPresent = true
               app.mariValue = cvalue
             }
           }


        })
  }

}
