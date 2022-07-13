import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VotosService } from '../service/votos.service';

import { VotosComponent } from './votos.component';

describe('Votos Management Component', () => {
  let comp: VotosComponent;
  let fixture: ComponentFixture<VotosComponent>;
  let service: VotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VotosComponent],
    })
      .overrideTemplate(VotosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VotosService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.votos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
