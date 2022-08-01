/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { faEdit, faEnvelope, faPhone, faLink, faCalendarDays, faWallet, faUserCheck, faIdCard } from '@fortawesome/free-solid-svg-icons';
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
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { Documentos } from 'app/entities/documentos/documentos.model';

/* tslint:disable:component-selector */
@Component({
  selector: 'jhi-perfil-startup',
  templateUrl: './perfil-startup.component.html',
  //styleUrls: ['./navbar.component.scss'],
  styleUrls: ['./perfil-startup.component.scss'],
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
  categorias: any[] = [];
  categoriaSeleccionada: ICategorias = {};
  categoriaSelected: any;
  categoriaIdSelected: any;
  existCategoria: any = true;
  imgPerfil: any;
  tipoMetaSelected: any;
  tipoMetaSelectedN: any;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLink = faLink;
  faCalendarDays = faCalendarDays;
  faWallet = faWallet;
  faUserCheck = faUserCheck;
  faIdCard = faIdCard;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private perfilService: PerfilStartupService,
    private router: Router,
    private categoriasService: CategoriasService,
    private startupService: StartupsService
  ) {
    this.perfilService.getStartupByCorreo(sessionStorage.getItem('startupLogin')).subscribe((result: any) => {
      if (result) {
        this.categoriasService.get().subscribe((data: any) => {
          /* eslint-disable no-console */

          console.log(data.body);
          if (data != null) {
            data.body.forEach((categoria: any) => {
              if (result.idCategoria != null) {
                if (categoria.id != result.idCategoria.id) {
                  this.categorias.push(categoria);
                }
              } else {
                this.categorias.push(categoria);
              }
            });
          }
        });
      }
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
        const imgPerfilF = document.getElementById('imgPerfil') as HTMLInputElement;
        const estadoMetaF = document.getElementById('estadoMeta') as HTMLInputElement;
        const montoMetaF = document.getElementById('montoMeta') as HTMLInputElement;
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
        fechaCreacionF.value = this.formatDate(new Date(startup.fechaCreacion));
        imgPerfilF.src = startup.imagenURL;
        montoMetaF.value = startup.montoMeta;
        console.warn(this.formatDate(new Date(startup.fechaCreacion)));

        saldoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.saldo);
        tipoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.tipo);
        estadoMonederoF.insertAdjacentText('beforeend', startup.idMonedero.estado);

        //Set tipo Meta

        if (startup.tipoMeta != null) {
          if (startup.tipoMeta === 'Activo') {
            this.tipoMetaSelected = 'Activo';
          } else {
            this.tipoMetaSelected = 'Inactivo';
          }
        } else {
          this.tipoMetaSelected = 'Activo';
          this.tipoMetaSelectedN = 'Inactivo';
        }

        //Set categoria
        if (startup.idCategoria != null) {
          this.existCategoria = false;
          this.perfilService.getCategoriasByID(startup.idCategoria.id).subscribe((categoriaResult: any) => {
            this.categoriaSelected = categoriaResult.categoria;
            this.categoriaIdSelected = categoriaResult.id;
            console.warn(categoriaResult);
          });
        }

        //Set values header

        const nombreHeader = document.getElementById('nombreHeader') as HTMLInputElement;
        const nombreLargoH = document.getElementById('nombreLargoH') as HTMLInputElement;
        const correoHeader = document.getElementById('correoHeader') as HTMLInputElement;
        const telefonoHeader = document.getElementById('telefonoHeader') as HTMLInputElement;
        const enlaceHeader = document.getElementById('enlaceHeader') as HTMLInputElement;
        const fechaCreacionHeader = document.getElementById('fechaCreacionHeader') as HTMLInputElement;
        const estadoHeader = document.getElementById('estadoHeader') as HTMLInputElement;
        const estadoMonederoHeader = document.getElementById('estadoMonederoHeader') as HTMLInputElement;
        nombreHeader.insertAdjacentText('beforeend', startup.nombreCorto);
        nombreLargoH.insertAdjacentText('beforeend', startup.nombreLargo);
        correoHeader.insertAdjacentText('beforeend', startup.correoElectronico);
        telefonoHeader.insertAdjacentText('beforeend', startup.telefono);
        enlaceHeader.insertAdjacentText('beforeend', startup.linkSitioWeb);
        fechaCreacionHeader.insertAdjacentText('beforeend', startup.fechaCreacion.substring(0, 10));
        estadoHeader.insertAdjacentText('beforeend', startup.estado);
        estadoMonederoHeader.insertAdjacentText('beforeend', startup.idMonedero.estado);

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
    this.perfilService.getStartupByCorreo(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
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
        data.linkSitioWeb = enlaceU.value;
        data.fechaCreacion = new Date(fechaCreacionU.value);
        data.descripcionCorta = descripcionCortaU.value;
        console.warn(categoriaU.value);
        if (categoriaU.value != 'default') {
          this.perfilService.getCategoriasByID(categoriaU.value).subscribe((categoriaResult: any) => {
            data.idCategoria = categoriaResult;
            console.warn(categoriaResult);
            this.perfilService.actualizarStartup(data.id, data).subscribe((dataActualizada: any) => {
              console.warn(dataActualizada);
            });
          });
        } else {
          this.perfilService.actualizarStartup(data.id, data).subscribe((dataActualizada: any) => {
            console.warn(dataActualizada);
          });
        }
      }
    });
  }

  actualizarInfoInversionista(): void {
    this.perfilService.getStartupByCorreo(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
      if (data) {
        console.warn(data);
        const riesgosU = <HTMLInputElement>document.getElementById('riesgos');
        const beneficiosU = <HTMLInputElement>document.getElementById('beneficios');
        const panoramaMercadoU = <HTMLInputElement>document.getElementById('panoramaMercado');
        const estadoMetaU = <HTMLInputElement>document.getElementById('estadoMeta');
        const montoMetaU = <HTMLInputElement>document.getElementById('montoMeta');

        data.riesgos = riesgosU.value;
        data.beneficios = beneficiosU.value;
        data.panoramaMercado = panoramaMercadoU.value;
        data.tipoMeta = estadoMetaU.value;
        data.montoMeta = montoMetaU.value;
        console.warn(data);

        this.perfilService.actualizarStartup(data.id, data).subscribe((dataActualizada: any) => {
          console.warn(dataActualizada);
        });
      }
    });
  }

  actualizarPassword(): void {
    const contrasenniaNuevaForm = <HTMLInputElement>document.getElementById('contrasenniaNuevaForm');

    const confirmarContrasenniaNuevaForm = <HTMLInputElement>document.getElementById('confirmarContrasenniaNuevaForm');

    const contrasenniaAntiguaForm = <HTMLInputElement>document.getElementById('contrasenniaAntiguaForm');

    this.perfilService.savePassword(contrasenniaAntiguaForm.value, contrasenniaNuevaForm.value).subscribe(() => {
      window.location.reload();
    });
  }

  actualizarImagen(event: any): void {
    let nombre: string = 'Imagen de perfil';
    let descripcion: string = 'Imagen del perfil startup';
    let estado: string = 'Activo';
    let url = 'C:\\imgStartupSafe\\'.concat(event.target.files[0].name);

    this.perfilService.getImagenCloudinary({ nombre, descripcion, estado, url }).subscribe((dataActualizada: any) => {
      console.warn(dataActualizada);
      const imgPerfilStartup = <HTMLInputElement>document.getElementById('imgPerfil');
      imgPerfilStartup.src = dataActualizada.url;

      this.perfilService.getStartupByCorreo(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
        if (data) {
          data.imagenURL = dataActualizada.url;
          this.perfilService.actualizarStartup(data.id, data).subscribe((result: any) => {
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

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
