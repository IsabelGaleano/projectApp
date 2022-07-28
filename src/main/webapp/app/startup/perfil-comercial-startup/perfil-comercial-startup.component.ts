import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

import { Account } from 'app/core/auth/account.model';
import { PerfilComercialStartupService } from './perfil-comercial-startup.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-perfil-comercial-startup',
  templateUrl: './perfil-comercial-startup.component.html',
  styleUrls: ['./perfil-comercial-startup.component.scss'],
})
export class PerfilComercialStartupComponent implements OnInit {
  user = false;
  account!: Account;
  usuarioSesion!: any;
  inversionistaOAdmin = false;
  usuario = false;
  tipoStartup = true;
  correoStartup: string | any;
  startup: any;
  planesDeInversion!: Array<any>;
  paquetes!: Array<any>;
  map: google.maps.Map | undefined;
  votos!: any;
  startupVotada = false;
  votoUsuario!: any;

  constructor(
    private perfilComercialStartupService: PerfilComercialStartupService,
    private profileService: ProfileService,
    private accountService: AccountService,
    private datePipe: DatePipe
  ) {
    console.warn();

    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        // eslint-disable-next-line no-console
        console.log(account);
        this.user = true;
        this.account = account;
        if (account.authorities[0] === 'ROLE_USER') {
          this.startupVotada = false;
        } else {
          this.startupVotada = true;
        }

        this.perfilComercialStartupService.getUsuarioByCorreo(account.email).subscribe((usuarioLogeado: any) => {
          console.warn(usuarioLogeado.tipoUsuarioFinal);
          this.usuarioSesion = usuarioLogeado;

          if (usuarioLogeado.tipoUsuarioFinal === 'Admin' || usuarioLogeado.tipoUsuarioFinal === 'Inversionista') {
            this.inversionistaOAdmin = true;
            this.usuario = false;
          } else if (usuarioLogeado.tipoUsuarioFinal === 'Usuario') {
            this.inversionistaOAdmin = false;
            this.usuario = true;
          }

          // if (usuarioLogeado.tipoUsuarioFinal === 'Usuario') {
          //   this.inversionistaOAdmin = false;
          //   this.usuario = true;
          // }
          // else {
          //   this.inversionistaOAdmin = true;
          //   this.usuario = false;
          // }
        });
      }
    });

    this.correoStartup = localStorage.getItem('correoStartup');

    console.warn(this.correoStartup);

    if (this.account.authorities[0] === 'ROLE_USER') {
      this.startupVotada = false;
    } else {
      this.startupVotada = true;
    }

    this.perfilComercialStartupService.getStartupByCorreo(this.correoStartup).subscribe((startup: any) => {
      this.startup = startup;
      // eslint-disable-next-line no-console
      console.log(startup);

      //Cantidad votos
      console.warn(startup);
      this.perfilComercialStartupService.getVotosByStartup(startup.id).subscribe((cantVotos: any) => {
        // eslint-disable-next-line no-console
        console.log(cantVotos);
        this.votos = cantVotos;
      });

      //Verificar
      console.warn(this.usuarioSesion);
      this.perfilComercialStartupService.getVotosByStartupAndUsuario(startup.id, this.usuarioSesion.id).subscribe((voto: any) => {
        console.warn(voto);
        if (voto) {
          this.votoUsuario = voto;
          this.startupVotada = true;
        }
      });

      if (!this.startup.idCategoria) {
        this.startup.idCategoria = { id: 0, categoria: 'Sin categoría registrada' };
      }

      if (!this.startup.nombreLargo) {
        this.startup.nombreLargo = this.startup.nombreCorto;
      }

      if (!this.startup.descripcion) {
        this.startup.descripcion = 'Sin descripción registrada';
      }

      if (!this.startup.descripcionCorta) {
        this.startup.descripcionCorta = 'Sin descripción registrada';
      }

      if (!this.startup.beneficios) {
        this.startup.beneficios = 'Sin beneficios registrados';
      }

      if (!this.startup.riesgos) {
        this.startup.riesgos = 'Sin riesgos registrados';
      }

      if (!this.startup.panoramaMercado) {
        this.startup.panoramaMercado = 'Sin panorama de mercado registrado';
      }

      if (!this.startup.linkSitioWeb) {
        this.startup.linkSitioWeb = 'Sin sitio web registrado';
      }

      if (!this.startup.fechaCreacion) {
        this.startup.fechaCreacion = new Date();

        this.startup.fechaCreacion = this.datePipe.transform(this.startup.fechaCreacion, 'yyyy-MM-dd');
      }

      if (!this.startup.latitudDireccion) {
        this.startup.latitudDireccion = 0;
      }

      if (!this.startup.longitudDireccion) {
        this.startup.longitudDireccion = 0;
      }

      const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
      const loader = new Loader({
        apiKey: key,
      });

      loader.load().then(() => {
        const latitudValue: number = +parseFloat(this.startup.latitudDireccion);
        const longitudValue: number = +parseFloat(this.startup.longitudDireccion);

        const location = {
          lat: latitudValue,
          lng: longitudValue,
        };

        this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
          center: location,
          zoom: 15,
        });

        const marker: google.maps.Marker | undefined = new google.maps.Marker({
          position: location,
          map: this.map,
          draggable: true,
        });
      });
    });

    this.perfilComercialStartupService.getPlanesDeInversionByCorreoStartup(this.correoStartup).subscribe((planesDeInversion: any) => {
      this.planesDeInversion = planesDeInversion;

      console.warn(this.planesDeInversion);

      if (planesDeInversion.length === 0) {
        const plan = {
          nombre: 'Aún no se registra nombre para el plan de inversión',
          monto: 0,
          descripcion: 'Aún no se registra descripción para el plan de inversión',
          beneficios: 'Aún no se registran beneficios para el plan de inversión',
          porcentajeEmpresarial: 0,
        };

        this.planesDeInversion.push(plan);
      }
    });

    this.perfilComercialStartupService.getPaquetesByCorreoStartup(this.correoStartup).subscribe((paquetes: any) => {
      this.paquetes = paquetes;

      if (paquetes.length === 0) {
        const paquete = {
          nombre: 'Aún no se registra nombre para el paquete',
          monto: 0,
          descripcion: 'Aún no se registra descripción para el paquete',
        };

        this.paquetes.push(paquete);
      }
    });
  }

  ngOnInit(): void {
    console.warn('HOLAAAA');

    // this.entitiesNavbarItems = EntityNavbarItems;
    // this.profileService.getProfileInfo().subscribe(profileInfo => {
    //   this.inProduction = profileInfo.inProduction;
    //   this.openAPIEnabled = profileInfo.openAPIEnabled;
    // });
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
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

  previousState(): void {
    window.history.back();
  }

  votarStartup(): void {
    const d = new Date();
    const votoNuevo = {
      votos: 1,
      estado: 'Activo',
      fecha: new Date(),
      idStartup: this.startup,
      idUsuario: this.usuarioSesion,
    };
    console.warn(votoNuevo);
    this.perfilComercialStartupService.guardarVoto(votoNuevo).subscribe((voto: any) => {
      this.startupVotada = true;
      this.votos += 1;
    });
  }
}
