import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StartupsService } from '../service/startups.service';

import { StartupsComponent } from './startups.component';

describe('Startups Management Component', () => {
  let comp: StartupsComponent;
  let fixture: ComponentFixture<StartupsComponent>;
  let service: StartupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StartupsComponent],
    })
      .overrideTemplate(StartupsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StartupsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StartupsService);

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
    expect(comp.startups?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
