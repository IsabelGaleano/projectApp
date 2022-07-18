import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../entities/usuarios/service/usuarios.service";
import {Router} from "@angular/router";
import {ResetPasswordService} from "./service/reset-password.service";

@Component({
  selector: 'jhi-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public newPassword : string;
  public error : boolean;
  public errorMessage : string;
  public loading: boolean;
  constructor(private resetPasswordService: ResetPasswordService, private router: Router) {
    this.newPassword = "";
    this.error = false;
    this.errorMessage = '';
    this.loading = false;
  }

  resetPassword(): void {
    try {
      this.loading = true;
      const userToUpdate = localStorage.getItem('UserUpdatePassword');
      if (!userToUpdate) {
        return;
      }
      this.resetPasswordService.updatePassword(this.newPassword, JSON.parse(userToUpdate)).subscribe(
        (response: any) => {
          if (response.status) {
            this.router.navigate(['/login']);
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
