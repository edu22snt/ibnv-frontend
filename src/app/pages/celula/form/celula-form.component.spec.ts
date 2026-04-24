import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelulaFormComponent } from './celula-form.component';

describe('CelulaFormComponent', () => {
  let component: CelulaFormComponent;
  let fixture: ComponentFixture<CelulaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelulaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelulaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
