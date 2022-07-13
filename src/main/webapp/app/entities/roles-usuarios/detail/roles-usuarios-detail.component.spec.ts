import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RolesUsuariosDetailComponent } from './roles-usuarios-detail.component';

describe('RolesUsuarios Management Detail Component', () => {
  let comp: RolesUsuariosDetailComponent;
  let fixture: ComponentFixture<RolesUsuariosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesUsuariosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rolesUsuarios: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RolesUsuariosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RolesUsuariosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rolesUsuarios on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rolesUsuarios).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
