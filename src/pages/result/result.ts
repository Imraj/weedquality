import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireStorage} from 'angularfire2/storage';
import { CameraPage } from "../camera/camera"

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
  rawData : string

  mariPresent: any
  mariValue: any

  imageDownloadURL: any

  rate = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              public alertCtrl: AlertController, private http: Http,public afStorage : AngularFireStorage) {

    this.imageData = this.navParams.get("image")

  }

  ionViewDidLoad() {
    var app = this
    console.log('ionViewDidLoad ResultPage');
    this.imageData = this.navParams.get("image")
    this.rawData = this.navParams.get("rawData")

    let loader = this.loadingCtrl.create({
      content:"Please wait..."
    })
    loader.present()

    const filePath = "ratemyweed_"+new Date().getTime()+".jpg";
    const storageRef = this.afStorage.ref(filePath);
    storageRef.putString(this.imageData,'data_url',{contentType:'image/jpeg'})
    .then((savepic)=>{
      console.log("savepic url")
      return savepic.ref.getDownloadURL()
    })
    .then(downloadURL => {
      console.log("Main downloadURL-1")
      this.imageDownloadURL = downloadURL
      console.log(downloadURL)
    })
    .then(()=>{


        console.log("MDL-2",this.imageDownloadURL)
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var data = 'imageURL=' + this.imageDownloadURL;
        this.http.post("https://ratemyweed.herokuapp.com/process",data,{headers:headers})
            .subscribe((res)=>{
               console.log("res-json")
               var result = JSON.parse((<any>res)._body)
               var concepts = result.outputs[0].data.concepts
               app.concepts = concepts
               console.log(concepts)
               loader.dismiss()
               for(var i=0;i<concepts.length;i++){
                 let cname = concepts[i].name
                 let cvalue = concepts[i].value
                 console.log(cname,cvalue)
                 if(cname == "marijuana"){
                   app.mariPresent = true
                   app.mariValue = cvalue
                   if(cvalue >= 0.9){app.rate = 5}
                   else if(cvalue >= 0.8 && cvalue < 0.9){app.rate = 4}
                   else if(cvalue >= 0.7 && cvalue < 0.8){app.rate = 3}
                   else if(cvalue >= 0.6 && cvalue < 0.7){app.rate = 2}
                   else if(cvalue >= 0.5 && cvalue < 0.6){app.rate = 1}
                   break;
                 }
                 else{
                   app.mariPresent = false
                   app.mariValue = 0
                 }
               }
            })
    })
    .catch((error)=>{
       let alert = this.alertCtrl.create({
         title:"Error",
         subTitle:error
       })
       alert.present()
    })

  }

  takeAPhoto(){
    this.navCtrl.push(CameraPage)
  }

}
