import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { faUser, faUserCircle, faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { MenuAdminService } from '../../menu/admin/menu-admin.service';
import { MenuStartupService } from '../../menu/startup/menu-startup.service';
/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  //styleUrls: ['./navbar.component.scss'],
})
export class NavbarUsuarioComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account!: Account | null;
  entitiesNavbarItems: any[] = [];
  user = false;
  emailCollapsed = true;
  notificationsCollapsed = true;
  faUser = faUser;
  faUserCircle = faUserCircle;
  faBell = faBell;
  faMessage = faMessage;
  usuario!: any;
  notificaciones: any[] = [];

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private menuAdminService: MenuAdminService,
    private menuStartupService: MenuStartupService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        // eslint-disable-next-line no-console
        console.log(account);
        this.user = true;
      }
      if (account !== null) {
        this.account = account;
        if (account.authorities[0] === 'ROLE_USER') {
          this.menuAdminService.getUsuariosByCorreoElectronico(account.email).subscribe((data: any) => {
            this.usuario = data;
            //Get notificaciones
            this.menuAdminService.getNotificacionesUsuario(account.email).subscribe((result: any) => {
              const reversed = result.reverse();
              for (let i = 0; i < 4; i++) {
                const fechatemp = new Date(reversed[i].fecha);
                reversed[i].fecha = fechatemp.toLocaleString();
                this.notificaciones.push(reversed[i]);
              }
              //this.notificaciones = result;
            });
          });
        } else if (account.authorities[0] === 'ROLE_STARTUP') {
          this.menuStartupService.getStartupLogin(account.email).subscribe((data: any) => {
            this.usuario = data;
          });
        }
      }
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }
  collapseEmail(): void {
    if (this.emailCollapsed === true) {
      this.emailCollapsed = false;
    } else {
      this.emailCollapsed = true;
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  busqueda(event: any): void {
    this.router.navigate(['']);
  }
}
