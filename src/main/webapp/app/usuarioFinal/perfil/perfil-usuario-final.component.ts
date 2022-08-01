import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { PerfilUsuarioFinalService } from './perfil-usuario-final.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import {
  faEdit,
  faEnvelope,
  faPhone,
  faLink,
  faCalendarDays,
  faWallet,
  faUserCheck,
  faIdCard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { data } from 'autoprefixer';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder, Validators } from '@angular/forms';
/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-usuario-final',
  templateUrl: './perfil-usuario-final.component.html',
  styleUrls: ['./perfil-usuario-final.component.scss'],
})
export class PerfilUsuarioFinalComponent implements OnInit {
  movimientos: any[] = [];
  usuario: any;
  usuarioFinal = null;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  user = false;
  map: google.maps.Map | undefined;
  latitudMarker = 0;
  longitudMarker = 0;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLink = faLink;
  faCalendarDays = faCalendarDays;
  faWallet = faWallet;
  faUserCheck = faUserCheck;
  faIdCard = faIdCard;
  faUser = faUser;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private perfilUsuarioFinalService: PerfilUsuarioFinalService
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
      const imgHeader = document.getElementById('imgPerfil') as HTMLInputElement;
      const nombreHeader = document.getElementById('nombreHeader') as HTMLInputElement;
      const apellidosHeader = document.getElementById('apellidosHeader') as HTMLInputElement;
      const correoSidebar = document.getElementById('correoSidebar') as HTMLInputElement;
      const telefonoSidebar = document.getElementById('telefonoSidebar') as HTMLInputElement;
      const cedulaSidebar = document.getElementById('cedulaSidebar') as HTMLInputElement;
      const estadoSidebar = document.getElementById('estadoSidebar') as HTMLInputElement;
      const monederoEstadoSidebar = document.getElementById('monederoEstadoSidebar') as HTMLInputElement;
      const tipoUsuarioSidebar = document.getElementById('tipoUsuarioSidebar') as HTMLInputElement;
      if (account) {
        console.warn(account);
        this.user = true;
        this.perfilUsuarioFinalService.getUsersByMail(account.email).subscribe((dataUsuario: any) => {
          this.usuario = dataUsuario;
          const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
          const loader = new Loader({
            apiKey: key,
          });
          console.warn(dataUsuario.idMonedero.id);
          const monederoTipo = document.getElementById('monederoTipo') as HTMLInputElement;
          monederoTipo.insertAdjacentText(
            'beforeend',
            dataUsuario.idMonedero.tipo.charAt(0).toUpperCase().concat(dataUsuario.idMonedero.tipo.slice(1).toLowerCase())
          );
          this.perfilUsuarioFinalService.getMovimientosByIdMonedero(dataUsuario.idMonedero.id).subscribe((dataMovimientos: any) => {
            dataMovimientos.forEach((movimiento: any) => {
              this.movimientos.push(movimiento);
            });
          });
          loader.load().then(() => {
            const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitudDireccionForm');
            latitudDireccionForm.value = dataUsuario.latitudDireccion.trim();

            const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitudDireccionForm');
            longitudDireccionForm.value = dataUsuario.longitudDireccion.trim();

            const latitudValue: number = +dataUsuario.latitudDireccion;
            const longitudValue: number = +dataUsuario.longitudDireccion;
            let location = {
              lat: 0,
              lng: 0,
            };
            if (latitudValue !== 0 && longitudValue !== 0) {
              location = {
                lat: latitudValue,
                lng: longitudValue,
              };
            } else {
              location = {
                lat: 9.93333,
                lng: -84.08333,
              };
            }
            this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
              center: location,
              zoom: 15,
            });

            const marker: google.maps.Marker | undefined = new google.maps.Marker({
              position: location,
              map: this.map,
              draggable: true,
            });
            google.maps.event.addListener(
              marker,
              'dragend',
              function (evt: {
                latLng: { lat: () => { (): any; new (): any; toString: { (): string; new (): any } }; lng: () => string };
              }) {
                latitudDireccionForm.value = evt.latLng.lat().toString();

                longitudDireccionForm.value = evt.latLng.lng();
              }
            );
          });

          this.usuarioFinal = dataUsuario.correoElectronico;
          imgHeader.src = dataUsuario.imagenURL;
          nombreHeader.insertAdjacentText('beforeend', dataUsuario.nombre.trim());
          apellidosHeader.insertAdjacentText('beforeend', dataUsuario.primerApellido.concat(' ', dataUsuario.segundoApellido.trim()));
          correoSidebar.insertAdjacentText('beforeend', dataUsuario.correoElectronico.trim());
          telefonoSidebar.insertAdjacentText('beforeend', dataUsuario.telefono.trim());
          cedulaSidebar.insertAdjacentText('beforeend', dataUsuario.cedula.trim());
          estadoSidebar.insertAdjacentText('beforeend', dataUsuario.estado.trim());
          monederoEstadoSidebar.insertAdjacentText('beforeend', dataUsuario.idMonedero.estado.trim());
          if (dataUsuario.tipoUsuarioFinal === 'Usuario') {
            tipoUsuarioSidebar.insertAdjacentText('beforeend', 'Cliente');
          } else {
            tipoUsuarioSidebar.insertAdjacentText('beforeend', 'Inversionista');
          }
          // Form values
          const nombreForm = <HTMLInputElement>document.getElementById('nombreForm');
          nombreForm.value = dataUsuario.nombre.trim();

          const apellido1Form = <HTMLInputElement>document.getElementById('apellido1Form');
          apellido1Form.value = dataUsuario.primerApellido.trim();

          const apellido2Form = <HTMLInputElement>document.getElementById('apellido2Form');
          apellido2Form.value = dataUsuario.segundoApellido.trim();

          const cedulaForm = <HTMLInputElement>document.getElementById('cedulaForm');
          cedulaForm.value = dataUsuario.cedula.trim();

          const correoForm = <HTMLInputElement>document.getElementById('correoForm');
          correoForm.value = dataUsuario.correoElectronico.trim();

          const telefonoForm = <HTMLInputElement>document.getElementById('telefonoForm');
          telefonoForm.value = dataUsuario.telefono.trim();

          const fechaNacimientoForm = <HTMLInputElement>document.getElementById('fechaNacimientoForm');
          fechaNacimientoForm.value = this.formatDate(new Date(dataUsuario.fechaNacimiento));

          const generoForm = <HTMLInputElement>document.getElementById('generoForm');
          generoForm.value = dataUsuario.genero.trim();
        });
      }
      this.account = account;
    });
  }
  actualizarUsuario(): void {
    this.perfilUsuarioFinalService.getUsersByMail(this.usuarioFinal).subscribe((dataUsuario: any) => {
      const fechaNacimientoForm = <HTMLInputElement>document.getElementById('fechaNacimientoForm');
      dataUsuario.fechaNacimiento = new Date(fechaNacimientoForm.value);

      const generoForm = <HTMLInputElement>document.getElementById('generoForm');
      dataUsuario.genero = generoForm.value;

      const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitudDireccionForm');
      dataUsuario.latitudDireccion = latitudDireccionForm.value;

      const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitudDireccionForm');
      dataUsuario.longitudDireccion = longitudDireccionForm.value;

      const nombreForm = <HTMLInputElement>document.getElementById('nombreForm');
      dataUsuario.nombre = nombreForm.value;

      const apellido1Form = <HTMLInputElement>document.getElementById('apellido1Form');
      dataUsuario.primerApellido = apellido1Form.value;

      const apellido2Form = <HTMLInputElement>document.getElementById('apellido2Form');
      dataUsuario.segundoApellido = apellido2Form.value;

      const telefonoForm = <HTMLInputElement>document.getElementById('telefonoForm');
      dataUsuario.telefono = telefonoForm.value;
      this.perfilUsuarioFinalService.updateUsers(dataUsuario.id, dataUsuario).subscribe((dataUsuarioActualizado: any) => {
        console.warn(dataUsuarioActualizado);
        location.reload();
      });
    });
  }

  actualizarPassword(): void {
    const contrasenniaNuevaForm = <HTMLInputElement>document.getElementById('contrasenniaNuevaForm');

    const confirmarContrasenniaNuevaForm = <HTMLInputElement>document.getElementById('confirmarContrasenniaNuevaForm');

    const contrasenniaAntiguaForm = <HTMLInputElement>document.getElementById('contrasenniaAntiguaForm');

    this.perfilUsuarioFinalService.save(contrasenniaAntiguaForm.value, contrasenniaNuevaForm.value).subscribe(() => {
      window.location.reload();
    });
  }
  actualizarImagen(event: any): void {
    const nombre = 'Imagen de perfil';
    const descripcion = 'Imagen del perfil startup';
    const estado = 'Activo';
    const url = 'C:\\imgStartupSafe\\'.concat(event.target.files[0].name);

    this.perfilUsuarioFinalService.postImagenCloudinary({ nombre, descripcion, estado, url }).subscribe((dataActualizada: any) => {
      console.warn(dataActualizada);
      const imgPerfilStartup = <HTMLInputElement>document.getElementById('imgPerfil');
      imgPerfilStartup.src = dataActualizada.url;

      this.perfilUsuarioFinalService.getUsersByMail(this.usuarioFinal).subscribe((dataUsuarioF: any) => {
        if (dataUsuarioF) {
          dataUsuarioF.imagenURL = dataActualizada.url;
          this.perfilUsuarioFinalService.updateUsers(dataUsuarioF.id, dataUsuarioF).subscribe((result: any) => {
            console.warn(result);
          });
        }
      });
    });
  }
  desencriptar(s: string): string {
    const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let strDescodificado = '';
    let caracter;
    for (let i = 0; i < s.length; i++) {
      caracter = s.charAt(i);
      const pos = abecedario.indexOf(caracter);
      if (pos === -1) {
        strDescodificado += caracter;
      } else {
        if (pos - 3 < 0) {
          strDescodificado += abecedario.charAt(abecedario.length + (pos - 3));
        } else {
          strDescodificado += abecedario.charAt((pos - 3) % abecedario.length);
        }
      }
    }

    return strDescodificado;
  }
  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
