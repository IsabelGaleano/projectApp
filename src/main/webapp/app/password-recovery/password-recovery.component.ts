import { Component, OnInit } from '@angular/core';
import { CodigosService } from '../entities/codigos/service/codigos.service';
import {Router} from "@angular/router";
import {AlertError} from "../shared/alert/alert-error.model";

@Component({
  selector: 'jhi-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent  { //implements OnInit {

  public email : string;
  public error : boolean;
  public errorMessage : string;
  public loading: boolean;

  constructor(private codeService:CodigosService, private router: Router) {
    this.email = "";
    this.error = false;
    this.errorMessage = '';
    this.loading = false;
  }

  //ngOnInit(): void {
  //}

  sendCode(): void {
    try {
      this.loading = true;
      this.codeService.sendCode(this.email).subscribe(
        (response: any) => {
        if (response.status) {
          this.router.navigate(['/validateotp']);
        }
        this.loading = false;
      },
        (err: any) => {
          this.error = true;
          this.errorMessage = err.error.title;
          this.loading = false;
          console.error('ERROR AL ENVIAR OTP', err);
        },
      );
    } catch (e) {
      this.error = true;
    }
  }

}
