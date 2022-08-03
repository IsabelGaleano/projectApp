import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Loader } from '@googlemaps/js-api-loader';
import { faEdit, faEnvelope, faPhone, faLink, faCalendarDays, faWallet, faUserCheck, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { PerfilVisualizableStartupService } from './perfil-visualizable-startup.service';

@Component({
  selector: 'jhi-perfil-visualizable-startup',
  templateUrl: './perfil-visualizable-startup.component.html',
  styleUrls: ['./perfil-visualizable-startup.component.scss'],
})
export class PerfilVisualizableStartupComponent implements OnInit {
  startup!: any;
  correoSession?: any;
  inscripcion?: any;
  // map: google.maps.Map | undefined;
  mapDos: google.maps.Map | undefined;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLink = faLink;
  faCalendarDays = faCalendarDays;
  faWallet = faWallet;
  faUserCheck = faUserCheck;
  faIdCard = faIdCard;

  constructor(private perfilVisualizableStartupService: PerfilVisualizableStartupService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.correoSession = localStorage.getItem('correoStartupVisualizable') as string;

    this.perfilVisualizableStartupService.getStartupByCorreo(this.correoSession).subscribe((startup: any) => {
      this.startup = startup;

      // if (startup) {
      //   this.startup = startup;

      //   this.startup.fechaCreacion = this.datePipe.transform(this.startup.fechaCreacion, 'yyyy-MM-dd');
      // }

      if (!this.startup.nombreCorto) {
        this.startup.nombreCorto = 'No existe un nombre corto registrado';
      }

      if (!this.startup.nombreLargo) {
        this.startup.nombreLargo = 'No existe un nombre largo registrado';
      }

      if (!this.startup.telefono) {
        this.startup.telefono = 'No existe un teléfono registrado';
      }

      if (!this.startup.contrasennia) {
        this.startup.contrasennia = 'No existe una contraseña registrada';
      }

      if (!this.startup.latitudDireccion) {
        this.startup.latitudDireccion = 0.0;
      }

      if (!this.startup.longitudDireccion) {
        this.startup.longitudDireccion = 0.0;
      }

      if (!this.startup.descripcion) {
        this.startup.descripcion = 'No existe una descripción registrada';
      }

      if (!this.startup.descripcionCorta) {
        this.startup.descripcionCorta = 'No existe una descripción corta registrada';
      }

      if (!this.startup.beneficios) {
        this.startup.beneficios = 'No existen beneficios registrados';
      }

      if (!this.startup.riesgos) {
        this.startup.riesgos = 'No existen riesgos registrados';
      }

      if (!this.startup.panoramaMercado) {
        this.startup.panoramaMercado = 'No existe un panorama del mercado registrado';
      }

      if (!this.startup.montoMeta) {
        this.startup.montoMeta = 'No existe un monto meta registrado';
      }

      if (!this.startup.tipoMeta) {
        this.startup.tipoMeta = 'No existe un tipo de meta registrado';
      }

      if (!this.startup.linkSitioWeb) {
        this.startup.linkSitioWeb = 'No existe un link de sitio web registrado';
      }

      if (!this.startup.imagenURL) {
        this.startup.imagenURL = 'No existe un URL de imágen registrado';
      }

      if (!this.startup.fechaCreacion) {
        this.startup.fechaCreacion = 'No existe una fecha de creación registrada';
      } else {
        this.startup.fechaCreacion = this.datePipe.transform(this.startup.fechaCreacion, 'yyyy-MM-dd');
      }

      if (!this.startup.estado) {
        this.startup.estado = 'No existe un estado registrado';
      }

      if (!this.startup.idMonedero) {
        const monedero = {
          id: 0,
          tipo: 'STARTUP',
          saldo: 0.0,
          estado: 'Sin estado de monedero registrado',
        };

        this.startup.idMonedero = monedero;
      }

      if (!this.startup.idCategoria) {
        const categoria = {
          id: 0,
          categoria: 'Sin categoría registrada',
          estado: 'Sin estado de categoría registrado',
        };

        this.startup.idCategoria = categoria;
      }

      if (!this.startup.correoElectronico) {
        this.startup.correoElectronico = 'No existe un correo electrónico registrado';
      } else {
        this.perfilVisualizableStartupService
          .getInscripcionesByCorreoStartup(this.startup.correoElectronico)
          .subscribe((inscripciones: any) => {
            this.inscripcion = inscripciones;

            if (!this.inscripcion.nombre) {
              this.inscripcion.nombre = 'No existe un nombre de inscripción registrado';
            }

            if (!this.inscripcion.descripcion) {
              this.inscripcion.descripcion = 'No existe una descripción de inscripción registrada';
            }

            if (!this.inscripcion.monto) {
              this.inscripcion.monto = 'No existe un monto de inscripción registrado';
            }

            if (!this.inscripcion.tipo) {
              this.inscripcion.tipo = 'No existe un tipo de inscripción registrado';
            }

            if (!this.inscripcion.fechaInicial) {
              this.inscripcion.fechaInicial = 'No existe una fecha inicial de inscripción registrada';
            } else {
              this.inscripcion.fechaInicial = this.datePipe.transform(this.inscripcion.fechaInicial, 'yyyy-MM-dd');
            }

            if (!this.inscripcion.fechaFinal) {
              this.inscripcion.fechaFinal = 'No existe una fecha de vencimiento de inscripción registrada';
            } else {
              this.inscripcion.fechaInicial = this.datePipe.transform(this.inscripcion.fechaInicial, 'yyyy-MM-dd');
            }

            if (!this.inscripcion.beneficios) {
              this.inscripcion.beneficios = 'No existen beneficios de inscripción registrados';
            }

            if (!this.inscripcion.estado) {
              this.inscripcion.estado = 'No existe un estado de inscripción registrado';
            }
          });
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

        // this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
        //   center: location,
        //   zoom: 15,
        // });

        this.mapDos = new google.maps.Map(<HTMLInputElement>document.getElementById('mapDos'), {
          center: location,
          zoom: 15,
        });

        // const marker: google.maps.Marker | undefined = new google.maps.Marker({
        //   position: location,
        //   map: this.map,
        //   draggable: true,
        // });

        const markerMapaDos: google.maps.Marker | undefined = new google.maps.Marker({
          position: location,
          map: this.mapDos,
          draggable: true,
        });
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
}
