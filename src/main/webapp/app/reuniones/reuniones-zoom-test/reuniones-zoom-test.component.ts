/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { Component, OnInit, Inject } from '@angular/core';
// import { ZoomMtg } from '@zoomus/websdk';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

import { ReunionesZoomTestService } from './reuniones-zoom-test.service';

@Component({
  selector: 'jhi-reuniones-zoom-test',
  templateUrl: './reuniones-zoom-test.component.html',
  styleUrls: [
    './reuniones-zoom-test.component.scss',
    '../../../../../../node_modules/@zoomus/websdk/dist/css/bootstrap.css',
    '../../../../../../node_modules/@zoomus/websdk/dist/css/react-select.css',
  ],
})
export class ReunionesZoomTestComponent implements OnInit {
  apiKey = 'rUqP76coRO24FoR3ouN4Qg';
  apiSecret = 'c43Xy0K9XKev5UHZbat05DuYVgb95NlkhVW9';
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'StartupSafe';
  userEmail = 'alexander.g.brenes@gmail.com';

  // //Alex
  // meetingNumber = '3279831751';
  // passWord = '7M0MYT';

  // //Isabel
  meetingNumber = '8098337635';
  passWord = '0JL6EW';

  client = ZoomMtgEmbedded.createClient();

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, private reunionesZoomTestService: ReunionesZoomTestService) {}

  //TODO:console log de el error y del texto a ver si viene bien el signature

  ngOnInit() {
    let meetingSDKElement = document.getElementById('meetingSDKElement')!;

    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              },
            },
          ],
        },
      },
    });
  }

  getSignature() {
    // this.reunionesZoomTestService.generateSignature(this.apiKey, this.apiSecret, this.meetingNumber, this.role).subscribe((data:any) => {
    //   console.log("AAAAAAAAAAAAAAAAAAAAAAA", data);
    // }, (err) => {
    //   console.error(err);
    //   console.error(err.error.text);
    //   // this.startMeeting(err.error.signature)
    // });
    this.reunionesZoomTestService.generateSignatureNode(this.meetingNumber, this.role).subscribe(
      (data: any) => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAA', data);
        this.startMeeting(data.signature);
      },
      err => {
        console.error(err);
        console.error(err.error.text);
        // this.startMeeting(err.error.signature)
      }
    );

    // this.httpClient.post(this.signatureEndpoint, {
    //   meetingNumber: this.meetingNumber,
    //   role: this.role
    // }).toPromise().then((data: any) => {
    //   if(data.signature) {
    //     console.log(data.signature)
    //     this.startMeeting(data.signature)
    //   } else {
    //     console.log(data)
    //   }
    // }).catch((error) => {
    //   console.error(error)
    // })
  }

  startMeeting(signature) {
    this.client.join({
      apiKey: this.apiKey,
      signature: signature,
      meetingNumber: this.meetingNumber,
      password: this.passWord,
      userName: this.userName,
      userEmail: this.userEmail,
      // tk: this.registrantToken
    });
  }
}
