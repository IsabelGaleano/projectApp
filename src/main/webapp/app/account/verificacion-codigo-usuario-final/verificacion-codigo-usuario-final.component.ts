import { Component, OnInit } from '@angular/core';
import { VerificacionCodigoUsuarioFinalService } from './verificacion-codigo-usuario-final.service';
@Component({
  selector: 'jhi-verificacion-codigo-usuario-final',
  templateUrl: './verificacion-codigo-usuario-final.component.html',
})
export class VerificacionCodigoUsuarioFinalComponent implements OnInit {
  usuarioPendiente = null;
  constructor(private verificacionCodigoUsuarioService: VerificacionCodigoUsuarioFinalService) {}

  ngOnInit(): void {
    this.verificacionCodigoUsuarioService.getUsersByMail(sessionStorage.getItem('usuarioFinalPendiente')).subscribe((data: any) => {
      this.usuarioPendiente = data;
    });
  }
}
