import { TestBed } from '@angular/core/testing';
import { CelulaService } from './celula.service';

describe('CelulaService', () => {
  let service: CelulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
