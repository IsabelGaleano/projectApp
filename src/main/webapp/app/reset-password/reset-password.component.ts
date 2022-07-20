import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../entities/usuarios/service/usuarios.service";
import {Router} from "@angular/router";
import {ResetPasswordService} from "./service/reset-password.service";
import {Usuarios} from "../entities/usuarios/usuarios.model";

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
  public confirmPassword: string;
  constructor(private resetPasswordService: ResetPasswordService, private router: Router) {
    this.newPassword = "";
    this.error = false;
    this.errorMessage = '';
    this.loading = false;
    this.confirmPassword = '';
  }

  resetPassword(): void {
    try {
      const userToUpdate = localStorage.getItem('UserUpdatePassword');
      const startupToUpdate = localStorage.getItem('StartupUpdatePassword');
      this.loading = true;
      if (userToUpdate) {
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
          },
        );
      } else if (startupToUpdate) {
        this.resetPasswordService.updatePasswordStartups(this.newPassword, JSON.parse(startupToUpdate)).subscribe(
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
          },
        );
      }
      localStorage.removeItem('UserUpdatePassword');
      localStorage.removeItem('StartupUpdatePassword');
    } catch (e) {
      this.error = true;
    }
  }
}
