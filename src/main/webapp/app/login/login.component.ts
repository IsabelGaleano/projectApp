/* eslint-disable */
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;
  loading = false;
  authenticationError = false;
  adminExists = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
    const email = 'admin@localhost';
    this.loginService.registerAdmin(email).subscribe((result: any) => {
      console.warn('Admin verificado');
    });
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void {
    this.loading = true;
    setTimeout(() => {
      this.loginService
        .login({
          username: this.loginForm.get('username')!.value,
          password: this.loginForm.get('password')!.value,
          rememberMe: this.loginForm.get('rememberMe')!.value,
        })
        .subscribe({
          next: () => {
            this.authenticationError = false;
            if (!this.router.getCurrentNavigation()) {
              this.accountService.getAuthenticationState().subscribe(account => {
                if (account) {
                  // eslint-disable-next-line no-console
                  console.warn(account);

                  if (account.authorities[1]) {
                    this.router.navigate(['admin/profile-admin']);
                  } else if (account.authorities[0]) {
                    if (account.authorities[0] === 'ROLE_USER') {
                      sessionStorage.setItem('usuarioLogin', account.email);
                      this.router.navigate(['usuario-final/perfil-usuario-final']);
                    } else if (account.authorities[0] === 'ROLE_STARTUP') {
                      this.loginService.getStartupByCorreo(account.email).subscribe((startup: any) => {
                        console.warn(startup);
                        if (startup.estado === 'PendienteInscripcion') {
                          this.router.navigate(['startup/plan-inscripcion-startup']);
                        } else {
                          this.router.navigate(['startup/perfil-startup']);
                        }

                        sessionStorage.setItem('startupLogin', startup.correoElectronico);
                      });
                    }
                  }
                }
              });
            }
          },
          error: () => (this.authenticationError = true),
        });
    }, 3000);
  }
}
