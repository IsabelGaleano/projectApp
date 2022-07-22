/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { PerfilStartupService } from './perfil-startup.service';
import { Loader } from '@googlemaps/js-api-loader';
import { ICategorias } from 'app/entities/categorias/categorias.model';
import { CategoriasService } from 'app/entities/categorias/service/categorias.service';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-startup',
  templateUrl: './perfil-startup.component.html',
  //styleUrls: ['./navbar.component.scss'],
})
export class PerfilStartupComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  user = false;
  startup: any;
  inscripcion: any;
  simpleValue: String = 'value';
  map: google.maps.Map | undefined;
  latitudMarker = 0;
  longitudMarker = 0;
  categorias: any = [];
  categoriaSeleccionada: ICategorias = {};

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private perfilService: PerfilStartupService,
    private router: Router,
    private categoriasService: CategoriasService
  ) {
    this.categorias = [];
    this.perfilService.getCategorias().subscribe(data => {
      this.categorias = data;
      /* eslint-disable no-console */
      console.log(data);
    });

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
      this.account = account;
    });

    //Get Categorias

    //Get Inscripcion

    this.perfilService.getInscripcionStartup(this.account?.email).subscribe((result: any) => {
      if (result != null) {
        console.warn(result);
        const nombreInscripcion = document.getElementById('nombreInscripcion') as HTMLInputElement;
        const descripcionInscripcion = document.getElementById('descripcionInscripcion') as HTMLInputElement;
        const montoInscripcion = document.getElementById('montoInscripcion') as HTMLInputElement;
        const tipoInscripcion = document.getElementById('tipoInscripcion') as HTMLInputElement;
        const fechaInicialInscripcion = document.getElementById('fechaInicialInscripcion') as HTMLInputElement;
        const fechaFinalInscripcion = document.getElementById('fechaFinalInscripcion') as HTMLInputElement;
        const beneficiosInscripcion = document.getElementById('beneficiosInscripcion') as HTMLInputElement;
        const estadoInscripcion = document.getElementById('estadoInscripcion') as HTMLInputElement;

        nombreInscripcion.insertAdjacentText('beforeend', result.nombre);
        descripcionInscripcion.insertAdjacentText('beforeend', result.descripcion);
        montoInscripcion.insertAdjacentText('beforeend', result.monto);
        tipoInscripcion.insertAdjacentText('beforeend', result.tipo);
        fechaInicialInscripcion.insertAdjacentText('beforeend', result.fechaInicial);
        fechaFinalInscripcion.insertAdjacentText('beforeend', result.fechaFinal);
        beneficiosInscripcion.insertAdjacentText('beforeend', result.beneficios);
        estadoInscripcion.insertAdjacentText('beforeend', result.estado);
      }
    });

    this.perfilService.getStartupByCorreo(this.account?.email).subscribe(startup => {
      if (startup) {
        this.startup = startup;
        console.warn(startup);
        //Set form variables informacion personal

        const nombreCortoF = document.getElementById('nombreCorto') as HTMLInputElement;
        const nombreCompletoF = document.getElementById('nombreLargo') as HTMLInputElement;
        const correoElectronicoF = document.getElementById('correoElectronico') as HTMLInputElement;
        const telefonoF = document.getElementById('telefono') as HTMLInputElement;
        const fechaCreacionF = document.getElementById('fechaCreacion') as HTMLInputElement;
        const categoriaF = document.getElementById('categoriaStartup') as HTMLInputElement;
        const enlaceF = document.getElementById('enlace') as HTMLInputElement;
        const descripcionCortaF = document.getElementById('descripcionCorta') as HTMLInputElement;
        const beneficiosF = document.getElementById('beneficios') as HTMLInputElement;
        const riesgosF = document.getElementById('riesgos') as HTMLInputElement;
        const panoramaMercadoF = document.getElementById('panoramaMercado') as HTMLInputElement;

        //Monedero
        const saldoMonederoF = document.getElementById('saldoMonedero') as HTMLInputElement;
        const tipoMonederoF = document.getElementById('tipoMonedero') as HTMLInputElement;
        const estadoMonederoF = document.getElementById('estadoMonedero') as HTMLInputElement;

        nombreCortoF.value = startup.nombreCorto;
        nombreCompletoF.value = startup.nombreLargo;
        correoElectronicoF.value = startup.correoElectronico;
        telefonoF.value = startup.telefono;
        fechaCreacionF.value = startup.fechaCreacion;
        enlaceF.value = startup.linkSitioWeb;
        descripcionCortaF.value = startup.descripcionCorta;
        beneficiosF.value = startup.beneficios;
        riesgosF.value = startup.riesgos;
        panoramaMercadoF.value = startup.panoramaMercado;

        saldoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.saldo);
        tipoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.tipo);
        estadoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.estado);

        //Set mapa

        const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
        const loader = new Loader({
          apiKey: key,
        });

        loader.load().then(() => {
          const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitud');
          latitudDireccionForm.value = startup.latitudDireccion;

          const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitud');
          longitudDireccionForm.value = startup.longitudDireccion;

          const latitudValue: number = +startup.latitudDireccion;
          const longitudValue: number = +startup.longitudDireccion;
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
            function (evt: { latLng: { lat: () => { (): any; new (): any; toString: { (): string; new (): any } }; lng: () => string } }) {
              latitudDireccionForm.value = evt.latLng.lat().toString();

              longitudDireccionForm.value = evt.latLng.lng();
            }
          );
        });
      }
    });
  }

  actualizarStartup(): void {
    this.perfilService.getStartupByCorreo(sessionStorage.getItem('startupLogin')).subscribe(data => {
      if (data) {
        console.warn(data);
        const nombreCortoU = <HTMLInputElement>document.getElementById('nombreCorto');
        const nombreLargoU = <HTMLInputElement>document.getElementById('nombreLargo');
        const correoElectronicoU = <HTMLInputElement>document.getElementById('correoElectronico');
        const telefonoU = <HTMLInputElement>document.getElementById('telefono');
        const latitudU = <HTMLInputElement>document.getElementById('latitud');
        const longitudU = <HTMLInputElement>document.getElementById('longitud');
        const fechaCreacionU = <HTMLInputElement>document.getElementById('fechaCreacion');
        const categoriaU = <HTMLInputElement>document.getElementById('categoriaStartup');
        const enlaceU = <HTMLInputElement>document.getElementById('enlace');
        const descripcionCortaU = <HTMLInputElement>document.getElementById('descripcionCorta');

        data.nombreCorto = nombreCortoU.value;
        data.nombreLargo = nombreLargoU.value;
        data.correoElectronico = correoElectronicoU.value;
        data.telefono = telefonoU.value;
        data.latitudDireccion = latitudU.value;
        data.longitudDireccion = longitudU.value;
        data.fechaCreacion = fechaCreacionU.value.concat('T19:55:15.', '714688-06:00');
        data.idCategoria = categoriaU.value;
        data.enlace = enlaceU.value;
        data.descripcionCorta = descripcionCortaU.value;
      }
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
