import { Component, OnInit } from '@angular/core';
import {CodigosService} from "../entities/codigos/service/codigos.service";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-validateotp',
  templateUrl: './validateotp.component.html',
  styleUrls: ['./validateotp.component.scss']
})
export class ValidateotpComponent {//implements OnInit {
  public code : string;
  public error : boolean;
  public info : boolean;
  public errorMessage : string;
  public infoMessage : string;
  constructor(private codeService:CodigosService, private router: Router) {
    this.code = "";
    this.error = false;
    this.info = false;
    this.errorMessage = '';
    this.infoMessage = '';
  }

 // ngOnInit(): void {
 // }

  validate(): void {
    try {
      this.codeService.validate(this.code).subscribe(
        (response: any) => {
          if (response.status) {
            this.router.navigate(['/validateotp']);
          }
        },
        (err: any) => {
          this.error = true;
          this.errorMessage = err.error.title;
          this.infoMessage = '';
          console.error('ERROR AL VALIDAR OTP', err);
        },
      );
    } catch (e) {
      this.error = true;
    }
  }

  reSendCode () : void {
    try {
      this.codeService.reSendCode().subscribe(
        (response: any) => {
          if (response.status) {
            this.info = true;
            this.error = false;
            this.errorMessage = '';
            this.infoMessage = 'El código fue reenviado correctamente';
          }
        },
        (err: any) => {
          this.error = true;
          this.errorMessage = err.error.title;
          console.error('ERROR AL ENVIAR OTP', err);
        },
      );
    } catch (e) {
      this.error = true;
    }
  }

}
