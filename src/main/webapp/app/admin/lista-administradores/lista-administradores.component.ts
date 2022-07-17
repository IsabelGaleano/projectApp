import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaAdministradoresService } from './lista-administradores.service';

@Component({
  selector: 'jhi-lista-administradores',
  templateUrl: './lista-administradores.component.html',
  styleUrls: ['./lista-administradores.component.scss'],
})
export class ListaAdministradoresComponent implements OnInit {
  usuarios: any[] = [];
  // show:boolean;

  constructor(private appService: ListaAdministradoresService, private router: Router) {}

  ngOnInit(): void {
    this.appService.getUsers().subscribe((data: any) => {
      // this.usuarios = data;

      data.forEach((usuario: any) => {
        this.appService.getUsersByEmail(usuario.correoElectronico).subscribe((roles: any) => {
          roles.forEach((rol: any) => {
            // console.warn(ro)
            if (rol.name === 'ROLE_ADMIN' && roles.length === 2) {
              // if (rol.name === 'ROLE_USER') {
              this.usuarios.push(usuario);
            }
          });
        });
      });
    });
  }

  activarUsuario(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Inactivo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Activo';

        this.appService
          .updateUser(data, idXestado[0])
          .subscribe(this.appService.updateUserActivatedJHI(data.correoElectronico, data.estado).subscribe())
          .then(window.location.reload());
      });
    }
  }

  desactivarUsuario(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Activo') {
      this.appService.getUsersById(idXestado[0]).subscribe((data: any) => {
        data.estado = 'Inactivo';

        // this.appService.updateUser(data, idXestado[0]).subscribe().then(window.location.reload());
        this.appService
          .updateUser(data, idXestado[0])
          .subscribe(this.appService.updateUserActivatedJHI(data.correoElectronico, data.estado).subscribe())
          .then(window.location.reload());
      });
    }
  }

  verPerfil(correo: string): void {
    this.appService.setCorreo(correo);
    // this.router.navigate(['/admin/perfil-visualizable-usuario-final']);

    this.appService.getUsersByEmail(correo).subscribe((roles: any) => {
      console.warn(roles);

      roles.forEach((element: any) => {
        console.warn(element);

        if (element.name === 'ROLE_ADMIN') {
          localStorage.removeItem('correoSession');
          localStorage.setItem('correoSession', correo);
          this.router.navigate(['/admin/perfil-visualizable-admin']);
        }

        // else if (element.name === 'ROLE_USER') {
        //   localStorage.removeItem('correoSession');
        //   localStorage.setItem('correoSession', correo);
        //   this.router.navigate(['/admin/perfil-visualizable-usuario-final']);
        // }
      });
    });
  }
}
