import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './lista-usuarios.service';

@Component({
  selector: 'jhi-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  // show:boolean;

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.appService.getUsers().subscribe((data: any) => {
      // this.usuarios = data;

      data.forEach((usuario: any) => {
        this.appService.getUsersByEmail(usuario.correoElectronico).subscribe((roles: any) => {
          roles.forEach((rol: any) => {
            // console.warn(ro)
            if (rol.name === 'ROLE_USER' && roles.length === 1) {
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
          // this.router.navigate(['/admin/perfil-visualizable-usuario-final']);
        } else if (element.name === 'ROLE_USER') {
          localStorage.removeItem('correoSession');
          localStorage.setItem('correoSession', correo);
          this.router.navigate(['/admin/perfil-visualizable-usuario-final']);
        }
      });
    });
  }

  // getAllUsers():void{

  // }
}
