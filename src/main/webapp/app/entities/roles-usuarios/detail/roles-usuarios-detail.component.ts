import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolesUsuarios } from '../roles-usuarios.model';

@Component({
  selector: 'jhi-roles-usuarios-detail',
  templateUrl: './roles-usuarios-detail.component.html',
})
export class RolesUsuariosDetailComponent implements OnInit {
  rolesUsuarios: IRolesUsuarios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolesUsuarios }) => {
      this.rolesUsuarios = rolesUsuarios;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
