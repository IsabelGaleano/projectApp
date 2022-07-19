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
import { data } from 'autoprefixer';
import { Loader } from '@googlemaps/js-api-loader';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-usuario-final',
  templateUrl: './perfil-usuario-final.component.html',
  //styleUrls: ['./navbar.component.scss'],
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
  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
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
      const nombreHeader = document.getElementById('nombreHeader') as HTMLInputElement;
      const apellidosHeader = document.getElementById('apellidosHeader') as HTMLInputElement;
      const correoSidebar = document.getElementById('correoSidebar') as HTMLInputElement;
      const telefonoSidebar = document.getElementById('telefonoSidebar') as HTMLInputElement;
      const cedulaSidebar = document.getElementById('cedulaSidebar') as HTMLInputElement;
      const estadoSidebar = document.getElementById('estadoSidebar') as HTMLInputElement;
      const monederoEstadoSidebar = document.getElementById('monederoEstadoSidebar') as HTMLInputElement;

      if (account) {
        console.warn(account);
        this.user = true;

        this.perfilUsuarioFinalService.getUsersByMail(account.email).subscribe((dataUsuario: any) => {
          this.usuario = dataUsuario;
          const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
          const loader = new Loader({
            apiKey: key,
          });
          this.perfilUsuarioFinalService.getMovimientosByIdMonedero(dataUsuario.idMonedero.id).subscribe((dataMovimientos: any) => {
            dataMovimientos.forEach((movimiento: any) => {
              this.movimientos.push(movimiento);
            });
          });
          loader.load().then(() => {
            const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitudDireccionForm');
            latitudDireccionForm.value = dataUsuario.latitudDireccion;

            const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitudDireccionForm');
            longitudDireccionForm.value = dataUsuario.longitudDireccion;

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
          nombreHeader.insertAdjacentText('beforeend', dataUsuario.nombre);
          apellidosHeader.insertAdjacentText('beforeend', dataUsuario.primerApellido.concat(dataUsuario.segundoApellido));
          correoSidebar.insertAdjacentText('beforeend', dataUsuario.correoElectronico);
          telefonoSidebar.insertAdjacentText('beforeend', dataUsuario.telefono);
          cedulaSidebar.insertAdjacentText('beforeend', dataUsuario.cedula);
          estadoSidebar.insertAdjacentText('beforeend', dataUsuario.estado);
          monederoEstadoSidebar.insertAdjacentText('beforeend', dataUsuario.idMonedero.estado);
          // Form values
          const nombreForm = <HTMLInputElement>document.getElementById('nombreForm');
          nombreForm.value = dataUsuario.nombre;

          const apellido1Form = <HTMLInputElement>document.getElementById('apellido1Form');
          apellido1Form.value = dataUsuario.primerApellido;

          const apellido2Form = <HTMLInputElement>document.getElementById('apellido2Form');
          apellido2Form.value = dataUsuario.segundoApellido;

          const cedulaForm = <HTMLInputElement>document.getElementById('cedulaForm');
          cedulaForm.value = dataUsuario.cedula;

          const correoForm = <HTMLInputElement>document.getElementById('correoForm');
          correoForm.value = dataUsuario.correoElectronico;

          const telefonoForm = <HTMLInputElement>document.getElementById('telefonoForm');
          telefonoForm.value = dataUsuario.telefono;

          const fechaNacimientoForm = <HTMLInputElement>document.getElementById('fechaNacimientoForm');
          const fechaFormato = dataUsuario.fechaNacimiento.split('T', 2);
          fechaNacimientoForm.value = fechaFormato[0];

          const generoForm = <HTMLInputElement>document.getElementById('generoForm');
          generoForm.value = dataUsuario.genero;
        });
      }
      this.account = account;
    });
  }
  actualizarUsuario(): void {
    this.perfilUsuarioFinalService.getUsersByMail(this.usuarioFinal).subscribe((dataUsuario: any) => {
      const fechaNacimientoForm = <HTMLInputElement>document.getElementById('fechaNacimientoForm');
      dataUsuario.fechaNacimiento = fechaNacimientoForm.value.concat('T19:55:15.', '714688-06:00');

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
}
