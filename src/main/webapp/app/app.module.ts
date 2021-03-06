import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/es';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { TranslationModule } from 'app/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { NavbarUsuarioComponent } from './layouts/navbar/navbar-usuario/navbar-usuario.component';
import { MenuUsuarioComponent } from './layouts/menu/usuario-final/menu-usuario-final.component';
import { MenuAdminComponent } from './layouts/menu/admin/menu-admin.component';
import { LoggedFooterComponent } from './layouts/footer/logged-footer/logged-footer.component';
import { MenuStartupComponent } from './layouts/menu/startup/menu-startup.component';
import { RegistroUsuarioFinalComponent } from './registro/registro-usuario-final/registro-usuario-final.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { PerfilVisualizableUsuarioFinalComponent } from './admin/perfil-visualizable-usuario-final/perfil-visualizable-usuario-final.component';
import { ListaAdministradoresComponent } from './admin/lista-administradores/lista-administradores.component';
import { PerfilVisualizableAdminComponent } from './admin/perfil-visualizable-admin/perfil-visualizable-admin.component';
import { PlanInscripcionStartupComponent } from './startup/plan-inscripcion-startup/plan-inscripcion-startup.component';
import { PagoInscripcionStartupComponent } from './startup/pago-inscripcion-startup/pago-inscripcion-startup.component';
import { PerfilAdminComponent } from './admin/perfil/perfil-admin.component';
import { RegistroAdminComponent } from './admin/registro-admin/registro-admin.component';
import { RegistroPlanInversionComponent } from './startup/registro-plan-inversion/registro-plan-inversion.component';
import { ListaPlanesInversionComponent } from './startup/lista-planes-inversion/lista-planes-inversion.component';
import { ListarPaquetesStartupComponent } from './startup/listar-paquetes-startup/listar-paquetes-startup.component';
import { ListarStartupsAdminComponent } from './admin/listar-startups-admin/listar-startups-admin.component';
import { ListarInscripcionesAdminComponent } from './admin/listar-inscripciones-admin/listar-inscripciones-admin.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { RegistrarPaquetesStartupComponent } from './startup/registrar-paquetes-startup/registrar-paquetes-startup.component';
import { PerfilStartupComponent } from './startup/perfil-startup/perfil-startup.component';
import { PerfilUsuarioFinalComponent } from './usuarioFinal/perfil/perfil-usuario-final.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ValidateotpComponent } from './validateotp/validateotp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistroAdicionalStartupComponent } from './registro-adicional-startup/registro-adicional-startup.component';
import { AccountModule } from './account/account.module';
import { ComunidadStartupComponent } from './startup/comunidad-startup/comunidad-startup.component';
import { StartupsPorCategoriaComponent } from './startup/startups-por-categoria/startups-por-categoria.component';
import { PerfilComercialStartupComponent } from './startup/perfil-comercial-startup/perfil-comercial-startup.component';
import { UpdatePaqueteStartupComponent } from './startup/actualizar-paquete-startup/actualizar-paquete-startup.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    FontAwesomeModule,
    NgxPayPalModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AccountModule,
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
    DatePipe,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    NavbarUsuarioComponent,
    MenuUsuarioComponent,
    MenuAdminComponent,
    MenuStartupComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    LoggedFooterComponent,
    RegistroUsuarioFinalComponent,
    ListaUsuariosComponent,
    PerfilVisualizableUsuarioFinalComponent,
    PlanInscripcionStartupComponent,
    PagoInscripcionStartupComponent,
    ListaAdministradoresComponent,
    PerfilVisualizableAdminComponent,
    PerfilAdminComponent,
    RegistroAdminComponent,
    RegistroPlanInversionComponent,
    ListaPlanesInversionComponent,
    ListarPaquetesStartupComponent,
    ListarStartupsAdminComponent,
    ListarInscripcionesAdminComponent,
    RegistrarPaquetesStartupComponent,
    PerfilStartupComponent,
    PerfilUsuarioFinalComponent,
    PasswordRecoveryComponent,
    ValidateotpComponent,
    ResetPasswordComponent,
    RegistroAdicionalStartupComponent,
    ComunidadStartupComponent,
    StartupsPorCategoriaComponent,
    PerfilComercialStartupComponent,
    UpdatePaqueteStartupComponent,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
