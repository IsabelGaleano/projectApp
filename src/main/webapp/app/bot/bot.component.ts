import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ComunidadStartupService } from '../startup/comunidad-startup/comunidad-startup.service';
import { ListarInscripcionesAdminService } from '../admin/listar-inscripciones-admin/listar-inscripciones-admin.service';
import { ListaReunionesService } from '../usuarioFinal/lista-reuniones/lista-reuniones.service';
import { ListaReunionesStartupService } from '../startup/lista-reuniones-startup/lista-reuniones-startup.service';
import { Loader } from '@googlemaps/js-api-loader';
import { ChartData, ChartOptions } from 'chart.js';
import {
  faCircleQuestion,
  faCircleXmark,
  faMagnifyingGlass,
  faMedal,
  faChartColumn,
  faLocationDot,
  faArrowLeft,
  faChartPie,
  faChartSimple,
  faChartLine,
  faMap,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-bot',
  templateUrl: './bot.component.html',
})
export class BotComponent implements OnInit {
  account!: Account;
  opened = false;
  faCircleQuestion = faCircleQuestion;
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faMedal = faMedal;
  faChartColumn = faChartColumn;
  faLocationDot = faLocationDot;
  faArrowLeft = faArrowLeft;
  faChartPie = faChartPie;
  faChartSimple = faChartSimple;
  faChartLine = faChartLine;
  faMap = faMap;
  faCalendarDays = faCalendarDays;

  //Variable that shows the first cards for the bots if true
  showFirstContentInfo = true;
  showBestStartups = false;
  showCardsCharts = false;
  showStartupsMapa = false;
  showInscripcionesChart = false;
  data = {};
  dataInscripciones = {};
  showCategoriasChart = false;
  backgrounds = [
    '#42A5F5', //Bluish
    '#66BB6A', //Greenish
    '#FFA726', //Orange
    '#26C6DA', //Tealish
    '#7E57C2', //purple
    '#CF5C36', //orange like brick
    '#002559', //navy
    '#EFC88B', //cremish yellow
    '#F7B2AD', //redish pink
    '#9ABCA7', //mintish green
    '#F7F06D', //yellow
    '#2F2235', //dark purple
    '#8f8f8f', //grey
  ];
  chartBackgrounds: Array<any> = [];
  startups: Array<any> = [];
  categoriasCount: Array<any> = [];
  categoriasLabels: Array<any> = [];

  //Filtro
  infoSearch = '';
  startupsFiltered: Array<any> = [];
  startupsWithoutFilter: Array<any> = [];
  busquedaActiva = false;

  //Mapa
  provinciaOnHover = '';
  tooltipMapText = '';
  tooltipCounter = '';
  provincia;
  showTooltipState = false;
  xPos: any;
  yPos: any;
  googleKey = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
  ubicacionesStartups: Array<any> = [];
  alajuelaCounter = 0;
  cartagoCounter = 0;
  sanjoseCounter = 0;
  puntarenasCounter = 0;
  limonCounter = 0;
  herediaCounter = 0;
  guanacasteCounter = 0;
  geoCoder: google.maps.Geocoder = new google.maps.Geocoder();

  //Inscripciones
  inscripciones: Array<any> = [];
  startupsWithLocation: Array<any> = [];

  //Reuniones
  hayReuniones = true;
  showReuniones = false;
  reuniones: Array<any> = [];
  sinReuniones = true;

  constructor(
    private accountService: AccountService,
    private datePipe: DatePipe,
    private router: Router,
    private comunidadStartupService: ComunidadStartupService,
    private inscripcionesService: ListarInscripcionesAdminService,
    private listaReunionesServiceUser: ListaReunionesService,
    private listaReunionesServiceStartup: ListaReunionesStartupService
  ) {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.account = account;
        if (account.authorities[0] === 'ROLE_USER') {
          this.listaReunionesServiceUser.obtenerIdUsuarioPorEmail(this.account.email).subscribe((data: any) => {
            this.listaReunionesServiceUser.obtenerReuniones(data.id).subscribe((reuniones: any) => {
              if (!reuniones) {
                this.sinReuniones = true;
              } else {
                this.sinReuniones = false;
                for (let i = 0; i < reuniones.length; i++) {
                  if (reuniones[i].estado !== 'SolicitadoI') {
                    if (reuniones[i].estado === 'SolicitadoS') {
                      reuniones[i].estado = 'Solicitado';
                    }

                    // if (!reuniones[i].fechaReunion) {
                    //   reuniones[i].fechaReunion = 'No acordada';
                    // }

                    if (reuniones[i].fechaReunion) {
                      reuniones[i].fechaReunion = new Date(reuniones[i].fechaReunion).toLocaleString();
                    } else {
                      reuniones[i].fechaReunion = 'No acordada';
                    }

                    if (reuniones[i].fechaSolicitada) {
                      reuniones[i].fechaSolicitada = new Date(reuniones[i].fechaSolicitada).toLocaleString();
                    }

                    this.reuniones.push(reuniones[i]);
                  }
                }
                console.warn(reuniones);
              }
            });
          });
        } else if (account.authorities[0] === 'ROLE_STARTUP') {
          this.listaReunionesServiceStartup.obtenerIdStartupPorEmail(this.account.email).subscribe((data: any) => {
            this.listaReunionesServiceStartup.obtenerReuniones(data.id).subscribe((reuniones: any) => {
              if (!reuniones) {
                this.sinReuniones = true;
              } else {
                this.sinReuniones = false;
                for (let i = 0; i < reuniones.length; i++) {
                  if (reuniones[i].estado !== 'SolicitadoS') {
                    if (reuniones[i].estado === 'SolicitadoI') {
                      reuniones[i].estado = 'Solicitado';
                    }

                    // if (!reuniones[i].fechaReunion) {
                    //   reuniones[i].fechaReunion = 'No acordada';
                    // }

                    if (reuniones[i].fechaReunion) {
                      reuniones[i].fechaReunion = new Date(reuniones[i].fechaReunion).toLocaleString();
                    } else {
                      reuniones[i].fechaReunion = 'No acordada';
                    }

                    if (reuniones[i].fechaSolicitada) {
                      reuniones[i].fechaSolicitada = new Date(reuniones[i].fechaSolicitada).toLocaleString();
                    }

                    this.reuniones.push(reuniones[i]);
                  }
                }
                console.warn(reuniones);
              }
            });
          });
        }
      }
    });

    //Cargar información de categorías para el gráfico de categorías
    this.comunidadStartupService.getCategorias().subscribe((categoriasService: any) => {
      categoriasService.forEach((categoria, index) => {
        this.comunidadStartupService.getCantidadCategoria(categoria.categoria).subscribe((cantidad: number) => {
          if (cantidad > 0) {
            this.categoriasLabels.push(categoria.categoria);
            this.categoriasCount.push(cantidad);
            this.chartBackgrounds.push(this.backgrounds[index]);
          }
        });
      });
      this.data = {
        datasets: [
          {
            data: this.categoriasCount,
            backgroundColor: this.chartBackgrounds,
            label: 'Startups por categorias',
          },
        ],
        labels: this.categoriasLabels,
      };
    });

    //Startups y votos
    this.comunidadStartupService.getAllStartups().subscribe((data: any) => {
      this.startupsFiltered = data;
      this.startupsWithoutFilter = data;
      data.forEach(e => {
        this.comunidadStartupService.getVotosPorStartup(e).subscribe(votos => {
          this.startups.push({ votos, e });
        });
        this.obtenerDireccionStartup(e.latitudDireccion, e.longitudDireccion);
      });
    });

    //Inscripciones anuales y mensuales
    this.inscripcionesService.getInscripcionesMensuales().subscribe((mensuales: any) => {
      this.inscripciones.push(mensuales);
      this.inscripcionesService.getInscripcionesAnuales().subscribe((anuales: any) => {
        this.inscripciones.push(anuales);
        //Setea los valores del gráfico de inscripciones
        this.dataInscripciones = {
          labels: ['Startups'],
          datasets: [
            {
              label: 'Inscripciones mensuales',
              backgroundColor: '#7542f5',
              data: [mensuales],
            },
            {
              label: 'Inscripciones anuales',
              backgroundColor: '#4902fa',
              data: [anuales],
            },
          ],
        };
      });
    });
  }

  ngOnInit(): void {
    console.warn('');
  }

  toggleBot(): void {
    this.opened = !this.opened;
  }

  closeBot(): void {
    this.opened = false;
  }

  goBack(): void {
    this.showFirstContentInfo = true;
    //Todas las variables de información adicional del bot se ponen false para devolver las cards iniciales
    this.showCardsCharts = false;
    this.showBestStartups = false;
    this.showCategoriasChart = false;
    this.showInscripcionesChart = false;
    this.busquedaActiva = false;
    this.showStartupsMapa = false;
    this.showReuniones = false;
  }

  //Listado con cards de mejores startups
  mejoresStartups(): void {
    this.showFirstContentInfo = false;
    this.showBestStartups = true;
    this.startups = this.startups.sort((a, b) => b.votos - a.votos);
  }

  //Graficos de startups
  estadisticasStartups(): void {
    this.showFirstContentInfo = false;
    this.showCardsCharts = true;
  }

  startupsCategorias(): void {
    this.showCardsCharts = false;
    this.showCategoriasChart = true;
  }
  startupsInscripciones(): void {
    this.showCardsCharts = false;
    this.showInscripcionesChart = true;
  }
  startupsMapa(): void {
    this.showCardsCharts = false;
    this.showStartupsMapa = true;
  }
  activarReuniones(): void {
    this.showFirstContentInfo = false;
    this.showReuniones = true;
  }

  showTooltip(event: any, text: any): void {
    this.showTooltipState = true;
    this.provinciaOnHover = text;
    //console.warn(event.pageY, event.pageX);
    if (this.provinciaOnHover === 'Alajuela') {
      this.tooltipMapText = 'Startups en Alajuela: ';
      this.tooltipCounter = String(this.alajuelaCounter);
    } else if (this.provinciaOnHover === 'Cartago') {
      this.tooltipMapText = 'Startups en Cartago: ';
      this.tooltipCounter = String(this.cartagoCounter);
    } else if (this.provinciaOnHover === 'Heredia') {
      this.tooltipMapText = 'Startups en Heredia: ';
      this.tooltipCounter = String(this.herediaCounter);
    } else if (this.provinciaOnHover === 'San José') {
      this.tooltipMapText = 'Startups en San José: ';
      this.tooltipCounter = String(this.sanjoseCounter);
    } else if (this.provinciaOnHover === 'Guanacaste') {
      this.tooltipMapText = 'Startups en Guanacaste: ';
      this.tooltipCounter = String(this.guanacasteCounter);
    } else if (this.provinciaOnHover === 'Puntarenas') {
      this.tooltipMapText = 'Startups en Puntarenas: ';
      this.tooltipCounter = String(this.puntarenasCounter);
    } else if (this.provinciaOnHover === 'Limón') {
      this.tooltipMapText = 'Startups en Limón: ';
      this.tooltipCounter = String(this.limonCounter);
    }
  }

  moveTooltip(event: any): void {
    //console.warn(event.pageY, event.pageX);
    this.xPos = Number(event.pageX) - 1508;
    this.yPos = Number(event.pageY) - 355;
  }

  //Obtener direcciones con reverse geocoding
  obtenerDireccionStartup(latitud, longitud): void {
    const latlng = {
      lat: parseFloat(latitud),
      lng: parseFloat(longitud),
    };

    this.geoCoder
      .geocode({ location: latlng })
      .then(response => {
        if (response.results[0]) {
          this.ubicacionesStartups.push(response.results[0]);
          if (
            response.results[0].address_components[2].short_name.includes('Alajuela') ||
            response.results[0].address_components[3].short_name.includes('Alajuela') ||
            response.results[0].address_components[4]?.short_name?.includes('Alajuela')
          ) {
            this.alajuelaCounter = this.alajuelaCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('Cartago') ||
            response.results[0].address_components[3].short_name.includes('Cartago') ||
            response.results[0].address_components[4]?.short_name?.includes('Cartago')
          ) {
            this.cartagoCounter = this.cartagoCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('San José') ||
            response.results[0].address_components[3].short_name.includes('San José') ||
            response.results[0].address_components[4]?.short_name?.includes('San José')
          ) {
            this.sanjoseCounter = this.sanjoseCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('Heredia') ||
            response.results[0].address_components[3].short_name.includes('Heredia') ||
            response.results[0].address_components[4]?.short_name?.includes('Heredia')
          ) {
            this.herediaCounter = this.herediaCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('Guanacaste') ||
            response.results[0].address_components[3].short_name.includes('Guanacaste') ||
            response.results[0].address_components[4]?.short_name?.includes('Guanacaste')
          ) {
            this.guanacasteCounter = this.guanacasteCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('Limón') ||
            response.results[0].address_components[3].short_name.includes('Limón') ||
            response.results[0].address_components[4]?.short_name?.includes('Limón')
          ) {
            this.limonCounter = this.limonCounter + 1;
          } else if (
            response.results[0].address_components[2].short_name.includes('Puntarenas') ||
            response.results[0].address_components[3].short_name.includes('Puntarenas') ||
            response.results[0].address_components[4]?.short_name?.includes('Puntarenas')
          ) {
            this.puntarenasCounter = this.puntarenasCounter + 1;
          }
        } else {
          window.alert('No results found from geocoding');
        }
      })
      .catch(e => console.warn('Geocoder failed due to: ', e));
  }

  //Para listado de startups en cards
  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  //Filtro de búsqueda para startups
  busquedaBot(event: any): void {
    this.infoSearch = event.target.value;

    //Si la busqueda tiene un valor
    if (event.target.value.length > 0) {
      this.busquedaActiva = true;

      this.showFirstContentInfo = false;
      this.showCardsCharts = false;
      this.showBestStartups = false;
      this.showCategoriasChart = false;
      this.showInscripcionesChart = false;
      const numberRegex = /^\d+$/;
      if (numberRegex.test(this.infoSearch)) {
        this.startupsFiltered = this.startups.filter(startup => {
          if (!startup.e.montoMeta) {
            return;
          }
          return startup.e.montoMeta >= this.infoSearch;
        });
      } else {
        this.startupsFiltered = this.startups.filter(
          startup =>
            startup.e.nombreCorto?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
            startup.e.nombreLargo?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
            startup.e.linkSitioWeb?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
            startup.e.panoramaMercado?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
            startup.e.fechaCreacion?.toLowerCase().includes(this.infoSearch.toLowerCase()) ||
            startup.e.idCategoria.categoria?.toLowerCase().includes(this.infoSearch.toLowerCase())
        );
      }
    } //Si la busqueda está vacía
    else {
      this.busquedaActiva = false;
      this.showFirstContentInfo = true;
    }
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
}
