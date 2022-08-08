import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ListaDonacionesStartupService } from './lista-donaciones-startup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  selector: 'jhi-lista-donaciones-startup',
  templateUrl: './lista-donaciones-startup.component.html',
  styleUrls: ['./lista-donaciones-startup.component.scss'],
})
export class ListaDonacionesStartupComponent implements OnInit {
  account: Account | null = null;
  donacionesPaquetes: any[] = [];
  id = 0;
  usuario: any;
  emailUsuario = ' ';
  constructor(
    private listaDonacionesStartupService: ListaDonacionesStartupService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.emailUsuario = account.email;
        this.account = account;
        this.listaDonacionesStartupService.getDonacionesPaquetesByCorreo(account.email).subscribe(donacionesPaquetes => {
          donacionesPaquetes.forEach((plan: any) => {
            console.warn(plan);
            this.donacionesPaquetes.push(plan);
          });
        });
      }
    });
  }
  buscarPorNombreCorreo(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput.value !== '' && searchInput.value.length > 1) {
      this.donacionesPaquetes = [];
      this.listaDonacionesStartupService
        .getDonacionesPaquetesByNombreUsuario(this.emailUsuario, searchInput.value)
        .subscribe(donacionesPaquetes => {
          if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach((donacion: any) => {
              console.warn(donacion);
              this.donacionesPaquetes.push(donacion);
            });
          }
        });
      this.donacionesPaquetes = [];
      this.listaDonacionesStartupService
        .getDonacionesPaquetesByCorreoUsuario(this.emailUsuario, searchInput.value)
        .subscribe(donacionesPaquetes => {
          if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach((donacion: any) => {
              console.warn(donacion);
              this.donacionesPaquetes.push(donacion);
            });
          }
        });
      this.changeDetection.detectChanges();
    } else {
      this.reset();
    }
  }
  reset(): void {
    this.listaDonacionesStartupService.getDonacionesPaquetesByCorreo(this.emailUsuario).subscribe(donacionesPaquetes => {
      this.donacionesPaquetes = [];
      donacionesPaquetes.forEach((donacion: any) => {
        console.warn(donacion);
        this.donacionesPaquetes.push(donacion);
      });
    });
    this.changeDetection.detectChanges();
  }
  onChange(newValue): void {
    console.warn(newValue.target.value);
    this.listaDonacionesStartupService
      .getDonacionesPaquetesByTipoUsuario(this.emailUsuario, newValue.target.value)
      .subscribe(donacionesPaquetes => {
        this.donacionesPaquetes = [];
        donacionesPaquetes.forEach((donacion: any) => {
          console.warn(donacion);
          this.donacionesPaquetes.push(donacion);
        });
      });
    this.changeDetection.detectChanges();
  }

  verPerfilDonacion(event: any): void {
    const router = this.router;
    console.warn(event.target.value);
    this.listaDonacionesStartupService.getDonacionPaquete(event.target.value).subscribe((resultD: any) => {
      if (resultD) {
        sessionStorage.setItem('donacionPaqueteStartup', JSON.stringify(resultD));
        this.router.navigate(['startup/perfil-donacion-startup']);
      }
    });
  }
}
